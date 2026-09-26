import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class AttendanceDaysService {
  constructor(private readonly prisma: PrismaService) {}

  private get db(): any {
    return (this.prisma as any).attendanceDays;
  }

  async create(data: any) {
    let studentEnrollmentId: number | null = null;
    let studentId: number | null = null;
    let studentName: string | null = null;
    let enrollmentNumber: string | null = null;
    let fathersName: string | null = null;

    const enrollmentInputId = data.studentEnrollmentId ?? data.enrollmentId;

    if (enrollmentInputId !== undefined && enrollmentInputId !== null && enrollmentInputId !== '') {
      studentEnrollmentId = Number(enrollmentInputId);
      const enrollment = await this.prisma.studentEnrollment.findFirst({
        where: { enrollmentId: studentEnrollmentId, IsDeleted: false },
        include: { student: true },
      });
      if (enrollment) {
        studentId = data.studentId ? Number(data.studentId) : (enrollment.studentId || null);
        studentName = data.studentName ? String(data.studentName).trim() : (enrollment.studentName || enrollment.student?.candidateName || null);
        fathersName = data.fathersName ? String(data.fathersName).trim() : (enrollment.fatherName || enrollment.student?.fatherName || null);
        enrollmentNumber = data.enrollmentNumber ? String(data.enrollmentNumber).trim() : (enrollment.enrollmentNo || enrollment.registrationNo || null);
      } else {
        studentName = data.studentName ? String(data.studentName).trim() : null;
        enrollmentNumber = data.enrollmentNumber ? String(data.enrollmentNumber).trim() : null;
        fathersName = data.fathersName ? String(data.fathersName).trim() : null;
      }
    } else if (data.studentId !== undefined && data.studentId !== null && data.studentId !== '') {
      studentId = Number(data.studentId);
      const student = await this.prisma.student.findFirst({
        where: { StudentRegistrationId: studentId, IsDeleted: false },
        include: { studentEnrollments: true },
      });
      if (student) {
        studentName = data.studentName ? String(data.studentName).trim() : student.candidateName;
        fathersName = data.fathersName ? String(data.fathersName).trim() : student.fatherName;
        const enrollment = student.studentEnrollments && student.studentEnrollments.length > 0
          ? student.studentEnrollments[0]
          : null;
        studentEnrollmentId = enrollment ? enrollment.enrollmentId : null;
        enrollmentNumber = data.enrollmentNumber
          ? String(data.enrollmentNumber).trim()
          : (enrollment?.enrollmentNo || student.registrationNo || null);
      } else {
        studentName = data.studentName ? String(data.studentName).trim() : null;
        enrollmentNumber = data.enrollmentNumber ? String(data.enrollmentNumber).trim() : null;
        fathersName = data.fathersName ? String(data.fathersName).trim() : null;
      }
    } else {
      studentName = data.studentName ? String(data.studentName).trim() : null;
      enrollmentNumber = data.enrollmentNumber ? String(data.enrollmentNumber).trim() : null;
      fathersName = data.fathersName ? String(data.fathersName).trim() : null;
    }

    let academicSessionId: number | null = null;
    let academicSessionName: string | null = null;
    const sessionInputId = data.academicSessionId ?? data.sessionId;
    const sessionInputName = data.academicSessionName ?? data.sessionName;

    if (sessionInputId !== undefined && sessionInputId !== null && sessionInputId !== '') {
      academicSessionId = Number(sessionInputId);
      const acadSession = await this.prisma.academicSession.findFirst({
        where: { academicSessionId, IsDeleted: false },
      });
      if (acadSession) {
        academicSessionName = sessionInputName ? String(sessionInputName).trim() : acadSession.academicSessionName;
      } else {
        academicSessionName = sessionInputName ? String(sessionInputName).trim() : null;
      }
    } else if (sessionInputName) {
      academicSessionName = String(sessionInputName).trim();
    }

    const sessionId = academicSessionId;
    const sessionName = academicSessionName;

    let programCategoryId: number | null = null;
    let programCategoryName: string | null = null;
    if (data.programCategoryId !== undefined && data.programCategoryId !== null && data.programCategoryId !== '') {
      programCategoryId = Number(data.programCategoryId);
      const category = await this.prisma.programCategory.findFirst({
        where: { programCategoryId, IsDeleted: false },
      });
      if (category) {
        programCategoryName = data.programCategoryName ? String(data.programCategoryName).trim() : category.programCategoryName;
      } else {
        programCategoryName = data.programCategoryName ? String(data.programCategoryName).trim() : null;
      }
    } else if (data.programCategoryName) {
      programCategoryName = String(data.programCategoryName).trim();
    }

    let programId: number | null = null;
    let programName: string | null = null;
    if (data.programId !== undefined && data.programId !== null && data.programId !== '') {
      programId = Number(data.programId);
      const program = await this.prisma.program.findFirst({
        where: { programId, IsDeleted: false },
      });
      if (program) {
        programName = data.programName ? String(data.programName).trim() : program.programName;
      } else {
        programName = data.programName ? String(data.programName).trim() : null;
      }
    } else if (data.programName) {
      programName = String(data.programName).trim();
    }

    let yearId: number | null = null;
    let yearName: string | null = null;
    if (data.yearId !== undefined && data.yearId !== null && data.yearId !== '') {
      yearId = Number(data.yearId);
      const yr = await this.prisma.yearMaster.findFirst({
        where: { yearId, IsDeleted: false },
      });
      if (yr) {
        yearName = data.yearName ? String(data.yearName).trim() : yr.yearName;
      } else {
        yearName = data.yearName ? String(data.yearName).trim() : null;
      }
    } else if (data.yearName) {
      yearName = String(data.yearName).trim();
    }

    let semId: number | null = null;
    let semName: string | null = null;
    if (data.semId !== undefined && data.semId !== null && data.semId !== '') {
      semId = Number(data.semId);
      const sem = await this.prisma.semesterMaster.findFirst({
        where: { semId, IsDeleted: false },
      });
      if (sem) {
        semName = data.semName ? String(data.semName).trim() : sem.semesterName;
      } else {
        semName = data.semName ? String(data.semName).trim() : null;
      }
    } else if (data.semName) {
      semName = String(data.semName).trim();
    }

    let monthId: number | null = null;
    let monthName: string | null = null;
    if (data.monthId !== undefined && data.monthId !== null && data.monthId !== '') {
      monthId = Number(data.monthId);
      const mn = await this.prisma.monthMaster.findFirst({
        where: { monthId, IsDeleted: false },
      });
      if (mn) {
        monthName = data.monthName ? String(data.monthName).trim() : mn.monthName;
      } else {
        monthName = data.monthName ? String(data.monthName).trim() : null;
      }
    } else if (data.monthName) {
      monthName = String(data.monthName).trim();
    }

    let academicYearId: number | null = null;
    let academicYearname: string | null = null;
    if (data.academicYearId !== undefined && data.academicYearId !== null && data.academicYearId !== '') {
      academicYearId = Number(data.academicYearId);
      const acadYear = await this.prisma.academicYearMaster.findFirst({
        where: { academicYearId, IsDeleted: false },
      });
      if (acadYear) {
        academicYearname = (data.academicYearname || data.academicYearName)
          ? String(data.academicYearname || data.academicYearName).trim()
          : acadYear.academicYearName;
      } else {
        academicYearname = (data.academicYearname || data.academicYearName)
          ? String(data.academicYearname || data.academicYearName).trim()
          : null;
      }
    } else if (data.academicYearname || data.academicYearName) {
      academicYearname = String(data.academicYearname || data.academicYearName).trim();
    }

    const teachingDays = data.teachingDays !== undefined && data.teachingDays !== null && data.teachingDays !== ''
      ? Number(data.teachingDays)
      : null;
    const presentDays = data.presentDays !== undefined && data.presentDays !== null && data.presentDays !== ''
      ? Number(data.presentDays)
      : null;

    let totalAttendancePercentage: number | null = null;
    if (data.totalAttendancePercentage !== undefined && data.totalAttendancePercentage !== null && data.totalAttendancePercentage !== '') {
      totalAttendancePercentage = Number(data.totalAttendancePercentage);
    } else if (teachingDays && teachingDays > 0 && presentDays !== null) {
      totalAttendancePercentage = Number(((presentDays / teachingDays) * 100).toFixed(2));
    }

    return this.db.create({
      data: {
        studentId,
        studentEnrollmentId,
        studentName,
        enrollmentNumber,
        fathersName,
        academicSessionId,
        academicSessionName,
        sessionId,
        sessionName,
        programCategoryId,
        programCategoryName,
        programId,
        programName,
        yearId,
        yearName,
        semId,
        semName,
        monthId,
        monthName,
        academicYearId,
        academicYearname,
        teachingDays,
        presentDays,
        totalAttendancePercentage,
        CreatedBy: data.CreatedBy || 'Admin',
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? Boolean(data.IsActive) : true,
        IsDeleted: false,
      },
      include: {
        student: true,
        studentEnrollment: true,
        academicSession: true,
        programCategory: true,
        program: true,
        year: true,
        semester: true,
        month: true,
        academicYear: true,
      },
    });
  }

  async findAll(params?: {
    activeOnly?: boolean;
    studentId?: number;
    studentEnrollmentId?: number;
    enrollmentId?: number;
    academicSessionId?: number;
    sessionId?: number;
    programCategoryId?: number;
    programId?: number;
    yearId?: number;
    semId?: number;
    monthId?: number;
    academicYearId?: number;
  }) {
    const targetSessionId = params?.academicSessionId ?? params?.sessionId;
    const targetEnrollmentId = params?.studentEnrollmentId ?? params?.enrollmentId;

    return this.db.findMany({
      where: {
        IsDeleted: false,
        ...(isActiveOnly(params?.activeOnly) ? { IsActive: true } : {}),
        ...(params?.studentId ? { studentId: params.studentId } : {}),
        ...(targetEnrollmentId ? { studentEnrollmentId: targetEnrollmentId } : {}),
        ...(targetSessionId ? { OR: [{ academicSessionId: targetSessionId }, { sessionId: targetSessionId }] } : {}),
        ...(params?.programCategoryId ? { programCategoryId: params.programCategoryId } : {}),
        ...(params?.programId ? { programId: params.programId } : {}),
        ...(params?.yearId ? { yearId: params.yearId } : {}),
        ...(params?.semId ? { semId: params.semId } : {}),
        ...(params?.monthId ? { monthId: params.monthId } : {}),
        ...(params?.academicYearId ? { academicYearId: params.academicYearId } : {}),
      },
      include: {
        student: true,
        studentEnrollment: true,
        academicSession: true,
        programCategory: true,
        program: true,
        year: true,
        semester: true,
        month: true,
        academicYear: true,
      },
      orderBy: { attendanceDaysId: 'asc' },
    });
  }

  async findOne(attendanceDaysId: number) {
    const row = await this.db.findFirst({
      where: { attendanceDaysId, IsDeleted: false },
      include: {
        student: true,
        studentEnrollment: true,
        academicSession: true,
        programCategory: true,
        program: true,
        year: true,
        semester: true,
        month: true,
        academicYear: true,
      },
    });
    if (!row) {
      throw new NotFoundException(`Attendance days record with ID ${attendanceDaysId} not found`);
    }
    return row;
  }

  async update(attendanceDaysId: number, data: any) {
    const existing = await this.findOne(attendanceDaysId);

    let studentEnrollmentId = existing.studentEnrollmentId;
    let studentId = existing.studentId;
    let studentName = existing.studentName;
    let enrollmentNumber = existing.enrollmentNumber;
    let fathersName = existing.fathersName;

    const enrollmentInputId = data.studentEnrollmentId !== undefined ? data.studentEnrollmentId : data.enrollmentId;

    if (enrollmentInputId !== undefined) {
      if (enrollmentInputId === null || enrollmentInputId === '') {
        studentEnrollmentId = null;
      } else {
        studentEnrollmentId = Number(enrollmentInputId);
        const enrollment = await this.prisma.studentEnrollment.findFirst({
          where: { enrollmentId: studentEnrollmentId, IsDeleted: false },
          include: { student: true },
        });
        if (enrollment) {
          studentId = enrollment.studentId || studentId;
          studentName = enrollment.studentName || enrollment.student?.candidateName || studentName;
          fathersName = enrollment.fatherName || enrollment.student?.fatherName || fathersName;
          enrollmentNumber = enrollment.enrollmentNo || enrollment.registrationNo || enrollmentNumber;
        }
      }
    }

    if (data.studentId !== undefined) {
      if (data.studentId === null || data.studentId === '') {
        studentId = null;
        studentName = null;
        enrollmentNumber = null;
        fathersName = null;
      } else {
        studentId = Number(data.studentId);
        const student = await this.prisma.student.findFirst({
          where: { StudentRegistrationId: studentId, IsDeleted: false },
          include: { studentEnrollments: true },
        });
        if (student) {
          studentName = student.candidateName;
          fathersName = student.fatherName;
          const enrollment = student.studentEnrollments && student.studentEnrollments.length > 0
            ? student.studentEnrollments[0]
            : null;
          enrollmentNumber = enrollment?.enrollmentNo || student.registrationNo || null;
        }
      }
    }
    if (data.studentName !== undefined && data.studentName !== null) {
      studentName = String(data.studentName).trim();
    }
    if (data.enrollmentNumber !== undefined && data.enrollmentNumber !== null) {
      enrollmentNumber = String(data.enrollmentNumber).trim();
    }
    if (data.fathersName !== undefined && data.fathersName !== null) {
      fathersName = String(data.fathersName).trim();
    }

    let academicSessionId = existing.academicSessionId;
    let academicSessionName = existing.academicSessionName;
    const sessionInputId = data.academicSessionId !== undefined ? data.academicSessionId : data.sessionId;
    const sessionInputName = data.academicSessionName !== undefined ? data.academicSessionName : data.sessionName;

    if (sessionInputId !== undefined) {
      if (sessionInputId === null || sessionInputId === '') {
        academicSessionId = null;
        academicSessionName = null;
      } else {
        academicSessionId = Number(sessionInputId);
        const acadSession = await this.prisma.academicSession.findFirst({
          where: { academicSessionId, IsDeleted: false },
        });
        if (acadSession) academicSessionName = acadSession.academicSessionName;
      }
    }
    if (sessionInputName !== undefined && sessionInputName !== null) {
      academicSessionName = String(sessionInputName).trim();
    }

    const sessionId = academicSessionId;
    const sessionName = academicSessionName;

    let programCategoryId = existing.programCategoryId;
    let programCategoryName = existing.programCategoryName;
    if (data.programCategoryId !== undefined) {
      if (data.programCategoryId === null || data.programCategoryId === '') {
        programCategoryId = null;
        programCategoryName = null;
      } else {
        programCategoryId = Number(data.programCategoryId);
        const cat = await this.prisma.programCategory.findFirst({
          where: { programCategoryId, IsDeleted: false },
        });
        if (cat) programCategoryName = cat.programCategoryName;
      }
    }
    if (data.programCategoryName !== undefined && data.programCategoryName !== null) {
      programCategoryName = String(data.programCategoryName).trim();
    }

    let programId = existing.programId;
    let programName = existing.programName;
    if (data.programId !== undefined) {
      if (data.programId === null || data.programId === '') {
        programId = null;
        programName = null;
      } else {
        programId = Number(data.programId);
        const prog = await this.prisma.program.findFirst({
          where: { programId, IsDeleted: false },
        });
        if (prog) programName = prog.programName;
      }
    }
    if (data.programName !== undefined && data.programName !== null) {
      programName = String(data.programName).trim();
    }

    let yearId = existing.yearId;
    let yearName = existing.yearName;
    if (data.yearId !== undefined) {
      if (data.yearId === null || data.yearId === '') {
        yearId = null;
        yearName = null;
      } else {
        yearId = Number(data.yearId);
        const yr = await this.prisma.yearMaster.findFirst({
          where: { yearId, IsDeleted: false },
        });
        if (yr) yearName = yr.yearName;
      }
    }
    if (data.yearName !== undefined && data.yearName !== null) {
      yearName = String(data.yearName).trim();
    }

    let semId = existing.semId;
    let semName = existing.semName;
    if (data.semId !== undefined) {
      if (data.semId === null || data.semId === '') {
        semId = null;
        semName = null;
      } else {
        semId = Number(data.semId);
        const sem = await this.prisma.semesterMaster.findFirst({
          where: { semId, IsDeleted: false },
        });
        if (sem) semName = sem.semesterName;
      }
    }
    if (data.semName !== undefined && data.semName !== null) {
      semName = String(data.semName).trim();
    }

    let monthId = existing.monthId;
    let monthName = existing.monthName;
    if (data.monthId !== undefined) {
      if (data.monthId === null || data.monthId === '') {
        monthId = null;
        monthName = null;
      } else {
        monthId = Number(data.monthId);
        const mn = await this.prisma.monthMaster.findFirst({
          where: { monthId, IsDeleted: false },
        });
        if (mn) monthName = mn.monthName;
      }
    }
    if (data.monthName !== undefined && data.monthName !== null) {
      monthName = String(data.monthName).trim();
    }

    let academicYearId = existing.academicYearId;
    let academicYearname = existing.academicYearname;
    if (data.academicYearId !== undefined) {
      if (data.academicYearId === null || data.academicYearId === '') {
        academicYearId = null;
        academicYearname = null;
      } else {
        academicYearId = Number(data.academicYearId);
        const acadYear = await this.prisma.academicYearMaster.findFirst({
          where: { academicYearId, IsDeleted: false },
        });
        if (acadYear) academicYearname = acadYear.academicYearName;
      }
    }
    if ((data.academicYearname !== undefined && data.academicYearname !== null) || (data.academicYearName !== undefined && data.academicYearName !== null)) {
      academicYearname = String(data.academicYearname || data.academicYearName).trim();
    }

    const teachingDays = data.teachingDays !== undefined
      ? (data.teachingDays !== null && data.teachingDays !== '' ? Number(data.teachingDays) : null)
      : existing.teachingDays;

    const presentDays = data.presentDays !== undefined
      ? (data.presentDays !== null && data.presentDays !== '' ? Number(data.presentDays) : null)
      : existing.presentDays;

    let totalAttendancePercentage = existing.totalAttendancePercentage;
    if (data.totalAttendancePercentage !== undefined) {
      totalAttendancePercentage = data.totalAttendancePercentage !== null && data.totalAttendancePercentage !== ''
        ? Number(data.totalAttendancePercentage)
        : null;
    } else if (teachingDays && teachingDays > 0 && presentDays !== null) {
      totalAttendancePercentage = Number(((presentDays / teachingDays) * 100).toFixed(2));
    }

    return this.db.update({
      where: { attendanceDaysId },
      data: {
        studentId,
        studentEnrollmentId,
        studentName,
        enrollmentNumber,
        fathersName,
        academicSessionId,
        academicSessionName,
        sessionId,
        sessionName,
        programCategoryId,
        programCategoryName,
        programId,
        programName,
        yearId,
        yearName,
        semId,
        semName,
        monthId,
        monthName,
        academicYearId,
        academicYearname,
        teachingDays,
        presentDays,
        totalAttendancePercentage,
        UpdatedBy: data.UpdatedBy || 'Admin',
        IsActive: data.IsActive !== undefined ? Boolean(data.IsActive) : undefined,
        Remarks: data.Remarks,
      },
      include: {
        student: true,
        studentEnrollment: true,
        academicSession: true,
        programCategory: true,
        program: true,
        year: true,
        semester: true,
        month: true,
        academicYear: true,
      },
    });
  }

  async updateStatus(attendanceDaysId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(attendanceDaysId);
    return this.db.update({
      where: { attendanceDaysId },
      data: { IsActive, UpdatedBy },
      include: {
        student: true,
        studentEnrollment: true,
        academicSession: true,
        programCategory: true,
        program: true,
        year: true,
        semester: true,
        month: true,
        academicYear: true,
      },
    });
  }

  async softDelete(attendanceDaysId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(attendanceDaysId);
    return this.db.update({
      where: { attendanceDaysId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const result = await this.db.updateMany({
      where: {
        attendanceDaysId: { in: ids },
        IsDeleted: false,
      },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });

    return {
      message: `Successfully soft-deleted ${result.count} attendance days record(s)`,
      count: result.count,
    };
  }
}
