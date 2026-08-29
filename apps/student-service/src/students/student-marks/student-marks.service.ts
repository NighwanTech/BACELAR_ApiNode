import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { numberToWords } from './number-to-words.util';

@Injectable()
export class StudentMarksService {
  constructor(private readonly prisma: PrismaService) {}

  private examMarks() {
    return (this.prisma as any).examMarks;
  }

  private examMarksDetail() {
    return (this.prisma as any).examMarksDetail;
  }

  /**
   * Helper to pick Max and Min marks for a specific marksType from PaperDetailMaster
   */
  private getPaperMaxMin(paper: any, marksType: string) {
    const typeUpper = String(marksType || 'THEORY').toUpperCase();
    switch (typeUpper) {
      case 'SESSIONAL':
      case 'SESSIONAL MARKS':
        return {
          max: paper.sessionalMarksMax ?? paper.totalMarksMax ?? 100,
          min: paper.sessionalMarksMin ?? 0,
        };
      case 'EXTERNAL_PRACTICAL':
      case 'EXTERNAL PRACTICAL MARKS':
        return {
          max: paper.externalPracticalMarksMax ?? 50,
          min: paper.externalPracticalMarksMin ?? 20,
        };
      case 'INTERNAL_PRACTICAL':
      case 'INTERNAL PRACTICAL MARKS':
        return {
          max: paper.internalPracticalMarksMax ?? 50,
          min: paper.internalPracticalMarksMin ?? 20,
        };
      case 'VIVA':
        return {
          max: paper.vivaMarksMax ?? 50,
          min: paper.vivaMarksMin ?? 20,
        };
      case 'PROJECT':
        return {
          max: paper.projectMax ?? 100,
          min: paper.projectMin ?? 40,
        };
      case 'CREDIT':
        return {
          max: paper.creditMax ?? 10,
          min: 0,
        };
      case 'THEORY':
      default:
        return {
          max: paper.theoryMarksMax ?? paper.totalMarksMax ?? 100,
          min: paper.theoryMarksMin ?? paper.totalMarksMin ?? 33,
        };
    }
  }

  /**
   * 1. Get papers summary list with Enter/Update status for selected criteria
   */
  async getPapersList(query: {
    academicSessionId?: number;
    examinationDetailId?: number;
    programId: number;
    yearId: number;
    semId?: number;
    marksType?: string;
  }) {
    const programId = Number(query.programId);
    const yearId = Number(query.yearId);
    const semId = query.semId ? Number(query.semId) : undefined;
    const academicSessionId = query.academicSessionId ? Number(query.academicSessionId) : undefined;
    const examinationDetailId = query.examinationDetailId ? Number(query.examinationDetailId) : undefined;
    const marksType = String(query.marksType || 'THEORY').toUpperCase();

    if (!programId || !yearId) {
      throw new BadRequestException('Program and Year are required to fetch papers list.');
    }

    // Fetch papers from PaperDetailMaster
    const papers = await this.prisma.paperDetailMaster.findMany({
      where: {
        programId,
        IsDeleted: false,
        OR: [{ yearId }, { yearId: null }],
        ...(semId ? { AND: [{ OR: [{ semId }, { semId: null }] }] } : {}),
      },
      include: { paperTypeRelation: true },
      orderBy: { paperId: 'asc' },
    });

    if (!papers.length) return [];

    const paperIds = papers.map((p) => p.paperId);

    // Fetch existing saved marks headers
    const existingMarks = await this.examMarks().findMany({
      where: {
        programId,
        yearId,
        ...(semId ? { semId } : {}),
        ...(academicSessionId ? { academicSessionId } : {}),
        ...(examinationDetailId ? { examinationDetailId } : {}),
        paperId: { in: paperIds },
        marksType,
        IsDeleted: false,
      },
    });

    const marksMap = new Map<number, any>(
      existingMarks.map((m: any) => [m.paperId, m])
    );

    return papers.map((paper, index) => {
      const saved = marksMap.get(paper.paperId);
      const limits = this.getPaperMaxMin(paper, marksType);

      return {
        srNo: index + 1,
        paperId: paper.paperId,
        subjectName: paper.subjectName || 'N/A',
        paperCode: paper.paperCode || 'N/A',
        paperName: paper.paperName || 'N/A',
        paperType: paper.paperTypeRelation?.name || paper.paperType || 'THEORY',
        marksType,
        maxMarks: saved?.maxMarks ?? limits.max,
        minMarks: saved?.minMarks ?? limits.min,
        status: saved ? 'UPDATE' : 'ENTER',
        marksId: saved?.marksId || null,
        isLocked: saved?.isLocked || false,
        totalStudents: saved?.totalStudents || 0,
        totalEntered: saved?.totalEntered || 0,
      };
    });
  }

  /**
   * 2. Get students and paper details for Marks Entry for a specific paper
   */
  async getPaperStudents(query: {
    academicSessionId: number;
    examinationDetailId: number;
    programId: number;
    yearId: number;
    semId?: number;
    paperId: number;
    marksType?: string;
  }) {
    const academicSessionId = Number(query.academicSessionId);
    const examinationDetailId = Number(query.examinationDetailId);
    const programId = Number(query.programId);
    const yearId = Number(query.yearId);
    const semId = query.semId ? Number(query.semId) : undefined;
    const paperId = Number(query.paperId);
    const marksType = String(query.marksType || 'THEORY').toUpperCase();

    if (!programId || !yearId || !paperId) {
      throw new BadRequestException('Program, Year, and Paper are required.');
    }

    // Get paper info
    const paper = await this.prisma.paperDetailMaster.findFirst({
      where: { paperId, IsDeleted: false },
      include: { paperTypeRelation: true, program: true },
    });
    if (!paper) throw new NotFoundException('Paper not found.');

    const limits = this.getPaperMaxMin(paper, marksType);

    // Check if marks already saved for this paper
    const existingMarks = await this.examMarks().findFirst({
      where: {
        academicSessionId,
        examinationDetailId,
        programId,
        yearId,
        ...(semId ? { semId } : {}),
        paperId,
        marksType,
        IsDeleted: false,
      },
      include: {
        details: {
          orderBy: { rollNo: 'asc' },
        },
      },
    });

    if (existingMarks) {
      return {
        marksId: existingMarks.marksId,
        academicSessionId: existingMarks.academicSessionId,
        examinationDetailId: existingMarks.examinationDetailId,
        programId: existingMarks.programId,
        yearId: existingMarks.yearId,
        semId: existingMarks.semId,
        paperId: existingMarks.paperId,
        subjectName: existingMarks.subjectName || paper.subjectName || 'N/A',
        paperType: existingMarks.paperType || paper.paperTypeRelation?.name || paper.paperType || 'THEORY',
        paperCode: existingMarks.paperCode || paper.paperCode || 'N/A',
        paperName: existingMarks.paperName || paper.paperName || 'N/A',
        marksType: existingMarks.marksType,
        maxMarks: existingMarks.maxMarks ?? limits.max,
        minMarks: existingMarks.minMarks ?? limits.min,
        isLocked: existingMarks.isLocked,
        totalStudents: existingMarks.totalStudents,
        totalEntered: existingMarks.totalEntered,
        students: existingMarks.details.map((d: any, index: number) => ({
          srNo: index + 1,
          marksDetailId: d.marksDetailId,
          studentId: d.studentId,
          rollNo: d.rollNo,
          studentName: d.studentName,
          fatherName: d.fatherName || '',
          examType: d.examType || 'Regular',
          marksObtained: d.marksObtained ?? null,
          marksInWords: d.marksInWords || (d.marksObtained != null ? numberToWords(d.marksObtained) : '-'),
          isAbsent: Boolean(d.isAbsent),
          remarks: d.remarks || '',
        })),
      };
    }

    // If no marks recorded yet, fetch eligible students using multi-level fallback
    let studentsList: any[] = [];

    // Level 1: StudentRollNumber
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
        student: { include: { studentProfile: true } },
        enrollment: true,
      },
      orderBy: { rollNo: 'asc' },
    });

    if (rollNumbers.length) {
      studentsList = rollNumbers.map((rn: any, index: number) => ({
        srNo: index + 1,
        marksDetailId: null,
        studentId: rn.studentId,
        rollNo: rn.rollNo,
        studentName: rn.student?.candidateName || rn.enrollment?.studentName || '',
        fatherName: rn.student?.fatherName || rn.enrollment?.fatherName || rn.student?.studentProfile?.fatherNameHindi || '',
        examType: 'Regular',
        marksObtained: null,
        marksInWords: '-',
        isAbsent: false,
        remarks: '',
      }));
    }

    // Level 2: StudentEnrollment
    if (!studentsList.length) {
      const enrollments = await (this.prisma as any).studentEnrollment.findMany({
        where: {
          IsDeleted: false,
          OR: [{ programId }, { student: { programId } }],
        },
        include: { student: { include: { studentProfile: true } } },
        orderBy: { enrollmentId: 'asc' },
      });

      if (enrollments.length) {
        studentsList = enrollments.map((en: any, index: number) => ({
          srNo: index + 1,
          marksDetailId: null,
          studentId: en.studentId,
          rollNo: en.enrollmentNo || en.registrationNo || `ENR-${en.enrollmentId}`,
          studentName: en.studentName || en.student?.candidateName || '',
          fatherName: en.fatherName || en.student?.fatherName || '',
          examType: 'Regular',
          marksObtained: null,
          marksInWords: '-',
          isAbsent: false,
          remarks: '',
        }));
      }
    }

    // Level 3: StudentExam
    if (!studentsList.length) {
      const examStudents = await this.prisma.studentExam.findMany({
        where: { IsDeleted: false, courseId: programId },
        include: { student: true },
        orderBy: { studentExamId: 'asc' },
      });

      if (examStudents.length) {
        studentsList = examStudents.map((se: any, index: number) => ({
          srNo: index + 1,
          marksDetailId: null,
          studentId: se.studentId,
          rollNo: se.rollNo || se.enrollmentNo || se.registrationNo || `EXAM-${se.studentExamId}`,
          studentName: se.studentNameEng || se.student?.candidateName || '',
          fatherName: se.fatherName || se.student?.fatherName || '',
          examType: se.examType || 'Regular',
          marksObtained: null,
          marksInWords: '-',
          isAbsent: false,
          remarks: '',
        }));
      }
    }

    // Level 4: Active Students Fallback
    if (!studentsList.length) {
      let students = await this.prisma.student.findMany({
        where: { IsDeleted: false, programId },
        include: { studentProfile: true },
        orderBy: { StudentRegistrationId: 'asc' },
      });

      if (!students.length) {
        students = await this.prisma.student.findMany({
          where: { IsDeleted: false },
          include: { studentProfile: true },
          take: 50,
          orderBy: { StudentRegistrationId: 'asc' },
        });
      }

      studentsList = students.map((s: any, index: number) => ({
        srNo: index + 1,
        marksDetailId: null,
        studentId: s.StudentRegistrationId,
        rollNo: s.registrationNo || `REG-${s.StudentRegistrationId}`,
        studentName: s.candidateName,
        fatherName: s.fatherName || '',
        examType: 'Regular',
        marksObtained: null,
        marksInWords: '-',
        isAbsent: false,
        remarks: '',
      }));
    }

    return {
      marksId: null,
      academicSessionId,
      examinationDetailId,
      programId,
      yearId,
      semId: semId || null,
      paperId,
      subjectName: paper.subjectName || 'N/A',
      paperType: paper.paperTypeRelation?.name || paper.paperType || 'THEORY',
      paperCode: paper.paperCode || 'N/A',
      paperName: paper.paperName || 'N/A',
      marksType,
      maxMarks: limits.max,
      minMarks: limits.min,
      isLocked: false,
      totalStudents: studentsList.length,
      totalEntered: 0,
      students: studentsList,
    };
  }

  /**
   * 3. Save Student Marks
   */
  async saveMarks(data: any) {
    const academicSessionId = Number(data.academicSessionId);
    const examinationDetailId = Number(data.examinationDetailId);
    const programId = Number(data.programId);
    const yearId = Number(data.yearId);
    const semId = data.semId ? Number(data.semId) : null;
    const paperId = Number(data.paperId);
    const marksType = String(data.marksType || 'THEORY').toUpperCase();
    const actor = String(data.CreatedBy || data.UpdatedBy || 'Admin User');
    const students: any[] = Array.isArray(data.students) ? data.students : [];

    if (!programId || !yearId || !paperId) {
      throw new BadRequestException('Program, Year, and Paper are required.');
    }

    const totalStudents = students.length;
    const totalEntered = students.filter((s) => s.marksObtained !== null && s.marksObtained !== undefined && s.marksObtained !== '').length;

    const headerPayload = {
      academicSessionId,
      examinationDetailId,
      programId,
      yearId,
      semId,
      paperId,
      subjectName: data.subjectName || null,
      paperType: data.paperType || 'THEORY',
      paperCode: data.paperCode || null,
      paperName: data.paperName || null,
      marksType,
      maxMarks: data.maxMarks ? Number(data.maxMarks) : null,
      minMarks: data.minMarks ? Number(data.minMarks) : null,
      isLocked: true,
      lockedAt: new Date(),
      lockedBy: actor,
      totalStudents,
      totalEntered,
      UpdatedBy: actor,
      IsActive: true,
      IsDeleted: false,
    };

    const existingHeader = await this.examMarks().findFirst({
      where: {
        academicSessionId,
        examinationDetailId,
        programId,
        yearId,
        semId,
        paperId,
        marksType,
        IsDeleted: false,
      },
    });

    let marksRecord: any;
    if (existingHeader) {
      marksRecord = await this.examMarks().update({
        where: { marksId: existingHeader.marksId },
        data: headerPayload,
      });

      await this.examMarksDetail().deleteMany({
        where: { marksId: existingHeader.marksId },
      });
    } else {
      marksRecord = await this.examMarks().create({
        data: {
          ...headerPayload,
          CreatedBy: actor,
        },
      });
    }

    if (students.length) {
      const detailRows = students.map((s) => {
        const val = s.marksObtained !== null && s.marksObtained !== undefined && s.marksObtained !== '' ? Number(s.marksObtained) : null;
        return {
          marksId: marksRecord.marksId,
          studentId: Number(s.studentId),
          rollNo: String(s.rollNo || ''),
          studentName: String(s.studentName || ''),
          fatherName: String(s.fatherName || ''),
          examType: String(s.examType || 'Regular'),
          marksObtained: val,
          marksInWords: val !== null ? numberToWords(val) : '-',
          isAbsent: Boolean(s.isAbsent),
          remarks: String(s.remarks || ''),
          CreatedBy: actor,
        };
      });

      await this.examMarksDetail().createMany({
        data: detailRows,
      });
    }

    return this.getPaperStudents({
      academicSessionId,
      examinationDetailId,
      programId,
      yearId,
      semId: semId || undefined,
      paperId,
      marksType,
    });
  }

  /**
   * 4. Unlock Marks Record (Super Admin Override)
   */
  async unlockMarks(marksId: number, actor: string = 'Super Admin') {
    const record = await this.examMarks().findFirst({
      where: { marksId, IsDeleted: false },
    });
    if (!record) throw new NotFoundException('Marks record not found.');

    return this.examMarks().update({
      where: { marksId },
      data: {
        isLocked: false,
        UpdatedBy: actor,
      },
    });
  }
}
