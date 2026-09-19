import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class StudentAttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  private examAttendance() {
    return (this.prisma as any).examAttendance;
  }

  private examAttendanceDetail() {
    return (this.prisma as any).examAttendanceDetail;
  }

  private parseDate(value?: string | Date | null): Date | null {
    if (!value) return null;
    const raw = String(value).trim();
    if (!raw) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      return new Date(`${raw}T00:00:00`);
    }
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  private formatDateString(value?: Date | string | null): string {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  /**
   * Fetch distinct dates, times, and shifts from ExamSchemePaper filtered by session, exam, program
   */
  async getSchemeDates(query: {
    academicSessionId?: number;
    examinationDetailId?: number;
    programId?: number;
  }) {
    const academicSessionId = query.academicSessionId ? Number(query.academicSessionId) : undefined;
    const examinationDetailId = query.examinationDetailId ? Number(query.examinationDetailId) : undefined;
    const programId = query.programId ? Number(query.programId) : undefined;

    const schemeWhere: any = { IsDeleted: false };
    if (academicSessionId) schemeWhere.academicSessionId = academicSessionId;
    if (examinationDetailId) schemeWhere.examinationDetailId = examinationDetailId;
    if (programId) schemeWhere.programId = programId;

    const schemes = await (this.prisma as any).examScheme.findMany({
      where: schemeWhere,
      select: { examSchemeId: true, programId: true },
    });

    const schemeIds = schemes.map((s: any) => s.examSchemeId);
    if (!schemeIds.length) return [];

    const schemeMap = new Map<number, any>();
    schemes.forEach((s: any) => schemeMap.set(s.examSchemeId, s));

    const papers = await (this.prisma as any).examSchemePaper.findMany({
      where: {
        examSchemeId: { in: schemeIds },
        IsDeleted: false,
        examDate: { not: null },
      },
      select: {
        examSchemeId: true,
        examDate: true,
        examTime: true,
        shift: true,
        paperId: true,
        subjectName: true,
        paperName: true,
        paperCode: true,
        paperType: true,
        programId: true,
      },
    });

    const dateMap = new Map<string, any>();
    for (const paper of papers) {
      if (!paper.examDate) continue;
      const dateStr = this.formatDateString(paper.examDate);
      const scheme = schemeMap.get(paper.examSchemeId);
      const progId = paper.programId || scheme?.programId || null;
      const key = `${dateStr}_${progId || ''}_${paper.examTime || ''}_${paper.shift || ''}`;
      if (!dateMap.has(key)) {
        dateMap.set(key, {
          examDate: dateStr,
          programId: progId,
          examTime: paper.examTime || '',
          shift: paper.shift || '',
          paperId: paper.paperId,
          subjectName: paper.subjectName || '',
          paperName: paper.paperName || '',
          paperCode: paper.paperCode || '',
          paperType: paper.paperType || '',
        });
      }
    }

    return Array.from(dateMap.values());
  }

  /**
   * Fetch Paper details and student list for Attendance (either existing saved attendance or fresh enrolled students)
   */
  async getPaperDetailsAndStudents(query: {
    academicSessionId: number;
    examinationDetailId: number;
    programId: number;
    examDate: string;
    examTime?: string;
    shift?: string;
  }) {
    const academicSessionId = Number(query.academicSessionId);
    const examinationDetailId = Number(query.examinationDetailId);
    const programId = Number(query.programId);
    const examDateStr = String(query.examDate || '').trim();
    const examTimeStr = query.examTime ? String(query.examTime).trim() : undefined;
    const shiftStr = query.shift ? String(query.shift).trim() : undefined;

    if (!academicSessionId || !examinationDetailId || !programId || !examDateStr) {
      throw new BadRequestException('Academic session, examination, program, and exam date are required.');
    }

    const targetDate = this.parseDate(examDateStr);
    if (!targetDate) {
      throw new BadRequestException('Invalid exam date format.');
    }

    // 1. Find matching ExamSchemePaper to autofill Subject, Paper Type, Paper Code, Paper Name, Paper ID
    const schemes = await (this.prisma as any).examScheme.findMany({
      where: {
        academicSessionId,
        examinationDetailId,
        programId,
        IsDeleted: false,
      },
      select: { examSchemeId: true },
    });
    const schemeIds = schemes.map((s: any) => s.examSchemeId);

    let matchedPaper: any = null;
    if (schemeIds.length) {
      const paperWhere: any = {
        examSchemeId: { in: schemeIds },
        IsDeleted: false,
        examDate: targetDate,
      };
      if (examTimeStr) paperWhere.examTime = examTimeStr;
      if (shiftStr) paperWhere.shift = shiftStr;

      matchedPaper = await (this.prisma as any).examSchemePaper.findFirst({
        where: paperWhere,
      });

      if (!matchedPaper) {
        // Fallback search without exact time/shift if time/shift was loose
        matchedPaper = await (this.prisma as any).examSchemePaper.findFirst({
          where: {
            examSchemeId: { in: schemeIds },
            IsDeleted: false,
            examDate: targetDate,
          },
        });
      }
    }

    const paperId = matchedPaper?.paperId || 0;

    // 2. Check if ExamAttendance record already exists
    const existingAttendance = await this.examAttendance().findFirst({
      where: {
        academicSessionId,
        examinationDetailId,
        programId,
        paperId: paperId > 0 ? paperId : undefined,
        examDate: targetDate,
        ...(shiftStr ? { shift: shiftStr } : {}),
        IsDeleted: false,
      },
      include: {
        details: {
          orderBy: { rollNo: 'asc' },
        },
      },
    });

    if (existingAttendance) {
      const todayStr = this.formatDateString(new Date());
      const savedDate = existingAttendance.updatedAt || existingAttendance.CreatedAt || existingAttendance.lockedAt || existingAttendance.examDate;
      const savedDateStr = this.formatDateString(savedDate);

      // Same-day rule: Saved today is open for edits (isLocked = false).
      // Next-day rule: If today > savedDate and not manually unlocked, auto-lock!
      let effectiveIsLocked = existingAttendance.isLocked;
      if (todayStr > savedDateStr) {
        effectiveIsLocked = true;
      } else if (todayStr === savedDateStr) {
        effectiveIsLocked = false;
      }

      return {
        attendanceId: existingAttendance.attendanceId,
        academicSessionId: existingAttendance.academicSessionId,
        examinationDetailId: existingAttendance.examinationDetailId,
        programId: existingAttendance.programId,
        paperId: existingAttendance.paperId,
        subjectName: existingAttendance.subjectName || matchedPaper?.subjectName || '',
        paperType: existingAttendance.paperType || matchedPaper?.paperType || 'THEORY',
        paperCode: existingAttendance.paperCode || matchedPaper?.paperCode || '',
        paperName: existingAttendance.paperName || matchedPaper?.paperName || '',
        examDate: this.formatDateString(existingAttendance.examDate),
        examTime: existingAttendance.examTime || matchedPaper?.examTime || '',
        shift: existingAttendance.shift || matchedPaper?.shift || '',
        isLocked: effectiveIsLocked,
        lockedAt: existingAttendance.lockedAt,
        lockedBy: existingAttendance.lockedBy,
        totalStudents: existingAttendance.totalStudents,
        totalPresent: existingAttendance.totalPresent,
        totalAbsent: existingAttendance.totalAbsent,
        students: existingAttendance.details.map((d: any, index: number) => ({
          srNo: index + 1,
          attendanceDetailId: d.attendanceDetailId,
          studentId: d.studentId,
          rollNo: d.rollNo,
          studentName: d.studentName,
          fatherName: d.fatherName || '',
          examCategory: d.examCategory || 'Regular',
          mobileNo: d.mobileNo || '',
          fatherMobileNo: d.remarks || d.fatherMobileNo || '',
          attendanceStatus: d.attendanceStatus || 'P',
          answerBookletNo: d.answerBookletNo || '',
          remarks: d.remarks || '',
        })),
      };
    }

    // 3. If no attendance recorded yet, fetch eligible students with multi-level fallback logic
    let studentsList: any[] = [];

    // Level 1: Search Roll Numbers (by programId or via student/enrollment relation)
    const rollNumbers = await (this.prisma as any).studentRollNumber.findMany({
      where: {
        IsDeleted: false,
        OR: [
          { programId },
          { student: { programId } },
          { enrollment: { programId } },
        ],
      },
      include: {
        student: {
          include: {
            studentProfile: true,
          },
        },
        enrollment: true,
      },
      orderBy: { rollNo: 'asc' },
    });

    if (rollNumbers.length) {
      studentsList = rollNumbers.map((rn: any, index: number) => ({
        srNo: index + 1,
        attendanceDetailId: null,
        studentId: rn.studentId,
        rollNo: rn.rollNo,
        studentName: rn.student?.candidateName || rn.enrollment?.studentName || '',
        fatherName: rn.student?.fatherName || rn.enrollment?.fatherName || rn.student?.studentProfile?.fatherNameHindi || '',
        examCategory: 'Regular',
        mobileNo: rn.student?.mobileNo || rn.enrollment?.studentMobNo || '',
        fatherMobileNo: rn.enrollment?.fatherMobNo || rn.student?.studentProfile?.fatherMobileNumber || '',
        attendanceStatus: '',
        answerBookletNo: '',
        remarks: '',
      }));
    }

    // Level 2: If no roll numbers found, search StudentEnrollment
    if (!studentsList.length) {
      const enrollments = await (this.prisma as any).studentEnrollment.findMany({
        where: {
          IsDeleted: false,
          OR: [
            { programId },
            { student: { programId } },
          ],
        },
        include: {
          student: {
            include: {
              studentProfile: true,
            },
          },
        },
        orderBy: { enrollmentId: 'asc' },
      });

      if (enrollments.length) {
        studentsList = enrollments.map((en: any, index: number) => ({
          srNo: index + 1,
          attendanceDetailId: null,
          studentId: en.studentId,
          rollNo: en.enrollmentNo || en.registrationNo || `ENR-${en.enrollmentId}`,
          studentName: en.studentName || en.student?.candidateName || '',
          fatherName: en.fatherName || en.student?.fatherName || '',
          examCategory: 'Regular',
          mobileNo: en.student?.mobileNo || en.studentMobNo || '',
          fatherMobileNo: en.fatherMobNo || en.student?.studentProfile?.fatherMobileNumber || '',
          attendanceStatus: '',
          answerBookletNo: '',
          remarks: '',
        }));
      }
    }

    // Level 3: If no enrollments, search StudentExam
    if (!studentsList.length) {
      const examStudents = await this.prisma.studentExam.findMany({
        where: {
          IsDeleted: false,
          courseId: programId,
        },
        include: {
          student: {
            include: {
              studentProfile: true,
            },
          },
        },
        orderBy: { studentExamId: 'asc' },
      });

      if (examStudents.length) {
        studentsList = examStudents.map((se: any, index: number) => ({
          srNo: index + 1,
          attendanceDetailId: null,
          studentId: se.studentId,
          rollNo: se.rollNo || se.enrollmentNo || se.registrationNo || `EXAM-${se.studentExamId}`,
          studentName: se.studentNameEng || se.student?.candidateName || '',
          fatherName: se.fatherName || se.student?.fatherName || '',
          examCategory: se.examType || 'Regular',
          mobileNo: se.mobileNo || se.student?.mobileNo || '',
          fatherMobileNo: se.student?.studentProfile?.fatherMobileNumber || '',
          attendanceStatus: '',
          answerBookletNo: '',
          remarks: '',
        }));
      }
    }

    // Level 4: Fallback to all active Students (filtered by programId if present, else all active students)
    if (!studentsList.length) {
      let students = await this.prisma.student.findMany({
        where: {
          IsDeleted: false,
          programId,
        },
        include: {
          studentProfile: true,
        },
        orderBy: { StudentRegistrationId: 'asc' },
      });

      if (!students.length) {
        // Ultimate fallback: get any active students from database
        students = await this.prisma.student.findMany({
          where: { IsDeleted: false },
          include: { studentProfile: true },
          take: 50,
          orderBy: { StudentRegistrationId: 'asc' },
        });
      }

      studentsList = students.map((s: any, index: number) => ({
        srNo: index + 1,
        attendanceDetailId: null,
        studentId: s.StudentRegistrationId,
        rollNo: s.registrationNo || `REG-${s.StudentRegistrationId}`,
        studentName: s.candidateName,
        fatherName: s.fatherName || '',
        examCategory: 'Regular',
        mobileNo: s.mobileNo || '',
        fatherMobileNo: s.studentProfile?.fatherMobileNumber || '',
        attendanceStatus: '',
        answerBookletNo: '',
        remarks: '',
      }));
    }

    return {
      attendanceId: null,
      academicSessionId,
      examinationDetailId,
      programId,
      paperId,
      subjectName: matchedPaper?.subjectName || '',
      paperType: matchedPaper?.paperType || 'THEORY',
      paperCode: matchedPaper?.paperCode || '',
      paperName: matchedPaper?.paperName || '',
      examDate: examDateStr,
      examTime: matchedPaper?.examTime || '',
      shift: matchedPaper?.shift || '',
      isLocked: false,
      lockedAt: null,
      lockedBy: null,
      totalStudents: studentsList.length,
      totalPresent: studentsList.length,
      totalAbsent: 0,
      students: studentsList,
    };
  }

  /**
   * Save or Update Attendance Record
   */
  async saveAttendance(data: any) {
    const academicSessionId = Number(data.academicSessionId);
    const examinationDetailId = Number(data.examinationDetailId);
    const programId = Number(data.programId);
    const paperId = Number(data.paperId || 0);
    const examDate = this.parseDate(data.examDate);
    const actor = String(data.CreatedBy || data.UpdatedBy || 'Admin User');
    const students: any[] = Array.isArray(data.students) ? data.students : [];

    if (!academicSessionId || !examinationDetailId || !programId || !examDate) {
      throw new BadRequestException('Academic Session, Examination, Program, and Exam Date are required.');
    }

    const totalStudents = students.length;
    const totalPresent = students.filter((s) => s.attendanceStatus === 'P').length;
    const totalAbsent = students.filter((s) => s.attendanceStatus === 'A').length;

    const headerPayload = {
      academicSessionId,
      examinationDetailId,
      programId,
      paperId: paperId > 0 ? paperId : null,
      subjectName: data.subjectName || null,
      paperType: data.paperType || 'THEORY',
      paperCode: data.paperCode || null,
      paperName: data.paperName || null,
      examDate,
      examTime: data.examTime || null,
      shift: data.shift || null,
      isLocked: false,
      lockedAt: null,
      lockedBy: actor,
      totalStudents,
      totalPresent,
      totalAbsent,
      UpdatedBy: actor,
      IsActive: true,
      IsDeleted: false,
    };

    // Find existing header or create
    const existingHeader = await this.examAttendance().findFirst({
      where: {
        academicSessionId,
        examinationDetailId,
        programId,
        paperId: paperId > 0 ? paperId : undefined,
        examDate,
        ...(data.shift ? { shift: data.shift } : {}),
        IsDeleted: false,
      },
    });

    let attendanceRecord: any;
    if (existingHeader) {
      attendanceRecord = await this.examAttendance().update({
        where: { attendanceId: existingHeader.attendanceId },
        data: headerPayload,
      });

      // Clear previous details
      await this.examAttendanceDetail().deleteMany({
        where: { attendanceId: existingHeader.attendanceId },
      });
    } else {
      attendanceRecord = await this.examAttendance().create({
        data: {
          ...headerPayload,
          CreatedBy: actor,
        },
      });
    }

    // Insert detail rows
    if (students.length) {
      const detailRows = students.map((s) => ({
        attendanceId: attendanceRecord.attendanceId,
        studentId: Number(s.studentId),
        rollNo: String(s.rollNo || ''),
        studentName: String(s.studentName || ''),
        fatherName: String(s.fatherName || ''),
        examCategory: String(s.examCategory || 'Regular'),
        mobileNo: String(s.mobileNo || ''),
        attendanceStatus: String(s.attendanceStatus || 'P'),
        answerBookletNo: String(s.answerBookletNo || ''),
        remarks: String(s.remarks || ''),
        CreatedBy: actor,
      }));

      await this.examAttendanceDetail().createMany({
        data: detailRows,
      });
    }

    return this.getPaperDetailsAndStudents({
      academicSessionId,
      examinationDetailId,
      programId,
      examDate: this.formatDateString(examDate),
      examTime: data.examTime,
      shift: data.shift,
    });
  }

  /**
   * Unlock Attendance record (Super Admin override)
   */
  async unlockAttendance(attendanceId: number, actor: string = 'Super Admin') {
    const record = await this.examAttendance().findFirst({
      where: { attendanceId, IsDeleted: false },
    });
    if (!record) {
      throw new NotFoundException('Attendance record not found.');
    }

    return this.examAttendance().update({
      where: { attendanceId },
      data: {
        isLocked: false,
        UpdatedBy: actor,
      },
    });
  }
}
