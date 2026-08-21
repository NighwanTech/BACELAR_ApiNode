import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

const COLLEGE_PREFIX = 'BACE';

const enrollmentInclude = {
  student: {
    include: {
      studentProfile: true,
      loginMaster: true,
      program: { include: { programCategory: true } },
      admissionSession: true,
      year: true,
      semester: true,
    },
  },
  program: { include: { programCategory: true } },
  year: true,
  semester: true,
  session: true,
};

@Injectable()
export class StudentEnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  private enrollment() {
    return (this.prisma as any).studentEnrollment;
  }

  private parseDate(value: any): Date | null | undefined {
    if (value === undefined) return undefined;
    if (value === null || value === '') return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  private toNullableNumber(value: any): number | null | undefined {
    if (value === undefined) return undefined;
    if (value === null || value === '') return null;
    const n = Number(value);
    return Number.isNaN(n) ? null : n;
  }

  private normalizeProgramName(value?: string | null): string {
    return String(value || '')
      .toUpperCase()
      .replace(/\./g, '')
      .replace(/\s+/g, '');
  }

  private resolveProgramCode(program: { programCode?: string | null; programShortName?: string | null; programName?: string | null } | null): string {
    const fromCode = String(program?.programCode || '').replace(/\D/g, '');
    if (fromCode) {
      return fromCode.slice(-2).padStart(2, '0');
    }

    const name = this.normalizeProgramName(program?.programShortName) || this.normalizeProgramName(program?.programName);
    if (name === 'BCOM' || name.includes('BACHELOROFCOMMERCE')) return '03';
    if (name === 'BSC' || name.includes('BACHELOROFSCIENCE')) return '02';
    if (name === 'BA' || name.includes('BACHELOROFARTS')) return '01';

    throw new BadRequestException(
      'Program code is missing on program master. Set a 2-digit programCode (e.g. 01, 02, 03).',
    );
  }

  private resolveEnrollmentYear(sessionName?: string | null): number {
    const match = String(sessionName || '').match(/(20\d{2})/);
    if (match) return Number(match[1]);
    return new Date().getFullYear();
  }

  private async nextEnrollmentNo(year: number, programCode: string): Promise<string> {
    const prefix = `${COLLEGE_PREFIX}${year}${programCode}`;
    // Avoid Prisma startsWith/LIKE: MariaDB adapter binds strings as utf8mb4_bin
    // while enrollmentNo is utf8mb4_unicode_ci (error 1267 collation mix).
    const rows = await this.enrollment().findMany({
      select: { enrollmentNo: true },
    });

    // Serial is year-wide (all programs), so it keeps increasing: 0001, 0002, ...
    let maxSerial = 0;
    const pattern = new RegExp(`^${COLLEGE_PREFIX}${year}\\d{2}(\\d{4})$`);
    for (const row of rows) {
      const m = String(row.enrollmentNo || '').match(pattern);
      if (!m) continue;
      const serial = Number(m[1]);
      if (serial > maxSerial) maxSerial = serial;
    }

    const next = maxSerial + 1;
    if (next > 9999) {
      throw new BadRequestException(`Enrollment serial exhausted for ${COLLEGE_PREFIX}${year}`);
    }
    return `${prefix}${String(next).padStart(4, '0')}`;
  }

  private snapshotFromStudent(student: any) {
    const profile = student.studentProfile || {};
    return {
      studentId: student.StudentRegistrationId,
      registrationNo: student.registrationNo || null,
      loginPassword: student.loginMaster?.PlainPassword || null,
      studentName: student.candidateName || null,
      fatherName: student.fatherName || null,
      motherName: profile.motherName || null,
      programId: student.programId || null,
      yearId: student.yearId || null,
      semId: student.semId || null,
      dateOfBirth: profile.dateOfBirth || null,
      fatherMobNo: profile.fatherMobileNumber || null,
      adharNo: profile.aadharIdNo || null,
      apaarNo: profile.apaarIdNo || null,
      gender: profile.gender || null,
      emailId: student.email || null,
      sessionId: student.admissionSessionId || null,
    };
  }

  async create(data: any) {
    return this.enrollment().create({
      data: {
        studentId: Number(data.studentId),
        enrollmentNo: data.enrollmentNo || null,
        registrationNo: data.registrationNo || null,
        loginPassword: data.loginPassword || null,
        studentName: data.studentName || null,
        fatherName: data.fatherName || null,
        motherName: data.motherName || null,
        programId: this.toNullableNumber(data.programId) ?? null,
        yearId: this.toNullableNumber(data.yearId) ?? null,
        semId: this.toNullableNumber(data.semId) ?? null,
        dateOfBirth: this.parseDate(data.dateOfBirth) ?? null,
        fatherMobNo: data.fatherMobNo || null,
        adharNo: data.adharNo || null,
        apaarNo: data.apaarNo || null,
        gender: data.gender || null,
        emailId: data.emailId || null,
        sessionId: this.toNullableNumber(data.sessionId ?? data.session) ?? null,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
      include: enrollmentInclude,
    });
  }

  async confirm(data: { studentId: number; CreatedBy: string; Remarks?: string }) {
    const studentId = Number(data.studentId);
    if (!studentId) {
      throw new BadRequestException('studentId is required');
    }

    const existing = await this.enrollment().findFirst({
      where: { studentId, IsDeleted: false },
      include: enrollmentInclude,
      orderBy: { CreatedOn: 'desc' },
    });
    if (existing?.enrollmentNo) {
      return { ...existing, alreadyConfirmed: true };
    }

    const student = await this.prisma.student.findFirst({
      where: { StudentRegistrationId: studentId, IsDeleted: false },
      include: {
        studentProfile: true,
        loginMaster: true,
        program: true,
        admissionSession: true,
      },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }
    if (!student.programId || !student.program) {
      throw new BadRequestException('Student program is missing. Assign a program before confirming enrollment.');
    }

    const snapshot = this.snapshotFromStudent(student);
    const year = this.resolveEnrollmentYear(student.admissionSession?.admissionSessionName);
    const programCode = this.resolveProgramCode(student.program);

    let lastError: any = null;
    for (let attempt = 0; attempt < 8; attempt++) {
      const enrollmentNo = await this.nextEnrollmentNo(year, programCode);
      try {
        const created = await this.enrollment().create({
          data: {
            ...snapshot,
            enrollmentNo,
            CreatedBy: data.CreatedBy,
            Remarks: data.Remarks || null,
            IsActive: true,
            IsDeleted: false,
          },
          include: enrollmentInclude,
        });
        return { ...created, alreadyConfirmed: false };
      } catch (error: any) {
        lastError = error;
        if (error?.code === 'P2002') continue;
        throw error;
      }
    }

    throw new BadRequestException(lastError?.message || 'Could not generate a unique enrollment number');
  }

  async findAll() {
    return this.enrollment().findMany({
      where: { IsDeleted: false },
      include: enrollmentInclude,
      orderBy: { CreatedOn: 'desc' },
    });
  }

  async findOne(enrollmentId: number) {
    const enrollment = await this.enrollment().findFirst({
      where: { enrollmentId, IsDeleted: false },
      include: enrollmentInclude,
    });
    if (!enrollment) {
      throw new NotFoundException(`Enrollment record with ID ${enrollmentId} not found`);
    }
    return enrollment;
  }

  async findByStudent(studentId: number) {
    return this.enrollment().findMany({
      where: { studentId, IsDeleted: false },
      include: enrollmentInclude,
      orderBy: { CreatedOn: 'desc' },
    });
  }

  async update(enrollmentId: number, data: any) {
    await this.findOne(enrollmentId);

    const payload: any = {
      UpdatedBy: data.UpdatedBy,
    };

    if (data.enrollmentNo !== undefined) payload.enrollmentNo = data.enrollmentNo || null;
    if (data.registrationNo !== undefined) payload.registrationNo = data.registrationNo || null;
    if (data.loginPassword !== undefined) payload.loginPassword = data.loginPassword || null;
    if (data.examPassword !== undefined) payload.examPassword = data.examPassword || null;
    if (data.studentName !== undefined) payload.studentName = data.studentName || null;
    if (data.fatherName !== undefined) payload.fatherName = data.fatherName || null;
    if (data.motherName !== undefined) payload.motherName = data.motherName || null;
    if (data.programId !== undefined) payload.programId = this.toNullableNumber(data.programId);
    if (data.yearId !== undefined) payload.yearId = this.toNullableNumber(data.yearId);
    if (data.semId !== undefined) payload.semId = this.toNullableNumber(data.semId);
    if (data.dateOfBirth !== undefined) payload.dateOfBirth = this.parseDate(data.dateOfBirth);
    if (data.fatherMobNo !== undefined) payload.fatherMobNo = data.fatherMobNo || null;
    if (data.adharNo !== undefined) payload.adharNo = data.adharNo || null;
    if (data.apaarNo !== undefined) payload.apaarNo = data.apaarNo || null;
    if (data.gender !== undefined) payload.gender = data.gender || null;
    if (data.emailId !== undefined) payload.emailId = data.emailId || null;
    if (data.sessionId !== undefined || data.session !== undefined) {
      payload.sessionId = this.toNullableNumber(data.sessionId ?? data.session);
    }
    if (data.IsActive !== undefined) payload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) payload.Remarks = data.Remarks;

    return this.enrollment().update({
      where: { enrollmentId },
      data: payload,
      include: enrollmentInclude,
    });
  }

  async softDelete(enrollmentId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(enrollmentId);

    return this.enrollment().update({
      where: { enrollmentId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const result = await this.enrollment().updateMany({
      where: {
        enrollmentId: { in: ids },
        IsDeleted: false,
      },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });

    return {
      message: `Successfully soft-deleted ${result.count} enrollment record(s)`,
      count: result.count,
    };
  }
}
