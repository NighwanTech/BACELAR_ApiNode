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
      academicSession: true,
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
  constructor(private readonly prisma: PrismaService) { }

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
    const yearText = String(year).replace(/[^0-9]/g, '');
    const rows = await this.prisma.$queryRawUnsafe<{ enrollmentNo: string | null }[]>(
      `SELECT enrollmentNo FROM studentEnrollment WHERE SUBSTRING(enrollmentNo, 1, 8) = 'BACE${yearText}'`,
    );
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
      sessionId: student.academicSessionId || null,
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
        academicSession: true,
      },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }
    if (!student.programId || !student.program) {
      throw new BadRequestException('Student program is missing. Assign a program before confirming enrollment.');
    }

    const payments = await this.prisma.studentPayment.findMany({
      where: { studentId, IsDeleted: false },
      orderBy: { CreatedOn: 'desc' },
    });
    const hasSuccessfulPayment = payments.some((p) => {
      const status = String(p.paymentStatus || '').toUpperCase();
      return status === 'SUCCESS';
    });
    if (!hasSuccessfulPayment) {
      throw new BadRequestException(
        'Enrollment number can be generated only after successful payment.',
      );
    }

    const snapshot = this.snapshotFromStudent(student);
    const year = this.resolveEnrollmentYear(
      student.academicSession?.academicSessionName || student.admissionSession?.admissionSessionName,
    );
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

  async findPage(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    sessionId?: number;
    programId?: number;
    programCategoryId?: number;
    yearId?: number;
    semesterId?: number;
    sortKey?: string;
    sortDir?: string;
  }) {
    const page = Math.max(1, Number(query.page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(query.pageSize) || 10));
    const where: any = { IsDeleted: false };
    if (query.programId) where.programId = Number(query.programId);
    if (query.yearId) where.yearId = Number(query.yearId);
    if (query.semesterId) where.semId = Number(query.semesterId);
    if (query.programCategoryId) {
      where.program = { programCategoryId: Number(query.programCategoryId) };
    }
    if (query.sessionId) {
      const sessionId = Number(query.sessionId);
      where.OR = [
        { sessionId },
        { student: { academicSessionId: sessionId } },
      ];
    }
    const search = String(query.search || '').trim();
    if (search) {
      const searchOr = [
        { registrationNo: { contains: search } },
        { enrollmentNo: { contains: search } },
        { studentName: { contains: search } },
        { fatherName: { contains: search } },
        { motherName: { contains: search } },
        { emailId: { contains: search } },
        { fatherMobNo: { contains: search } },
        { adharNo: { contains: search } },
        { apaarNo: { contains: search } },
        { student: { mobileNo: { contains: search } } },
      ];
      where.AND = [...(where.AND || []), { OR: searchOr }];
    }
    const dir = String(query.sortDir || 'asc').toLowerCase() === 'desc' ? 'desc' : 'asc';
    const sortMap: Record<string, any> = {
      studentName: { studentName: dir },
      enrollmentNo: { enrollmentNo: dir },
      registrationNo: { registrationNo: dir },
      fatherName: { fatherName: dir },
    };
    const orderBy = sortMap[String(query.sortKey || '')] || { studentName: 'asc' };
    const [total, items] = await Promise.all([
      this.enrollment().count({ where }),
      this.enrollment().findMany({
        where,
        include: enrollmentInclude,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);
    return { items, page, pageSize, total };
  }

  async findExamDetailsPage(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    programId?: number;
    programCategoryId?: number;
    yearId?: number;
    semId?: number;
    examType?: string;
    filled?: boolean | string;
    sortKey?: string;
    sortDir?: string;
  }) {
    const page = Math.max(1, Number(query.page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(query.pageSize) || 10));
    const examType = String(query.examType || '').trim().toUpperCase();
    if (examType.includes('BACK')) {
      return { items: [], page, pageSize, total: 0 };
    }
    const where: any = { IsDeleted: false };
    if (query.programId) where.programId = Number(query.programId);
    if (query.yearId) where.yearId = Number(query.yearId);
    if (query.semId) where.semId = Number(query.semId);
    if (query.programCategoryId) {
      where.OR = [
        { program: { programCategoryId: Number(query.programCategoryId) } },
        { student: { program: { programCategoryId: Number(query.programCategoryId) } } },
      ];
    }
    const search = String(query.search || '').trim();
    if (search) {
      const searchOr = [
        { registrationNo: { contains: search } },
        { enrollmentNo: { contains: search } },
        { studentName: { contains: search } },
        { fatherMobNo: { contains: search } },
        { student: { mobileNo: { contains: search } } },
        { student: { candidateName: { contains: search } } },
      ];
      where.AND = [...(where.AND || []), { OR: searchOr }];
    }
    const light = await this.enrollment().findMany({
      where,
      select: { enrollmentId: true, studentId: true, studentName: true, fatherName: true, registrationNo: true, enrollmentNo: true },
      orderBy: { enrollmentId: 'asc' },
    });
    const latest = new Map<number, any>();
    for (const row of light) {
      const prev = latest.get(row.studentId);
      if (!prev || row.enrollmentId > prev.enrollmentId) latest.set(row.studentId, row);
    }
    let rows = [...latest.values()];
    const studentIds = rows.map((row) => Number(row.studentId)).filter(Boolean);
    const payments = studentIds.length
      ? await this.prisma.studentPayment.findMany({
          where: { IsDeleted: false, studentId: { in: studentIds } },
          include: { feeTypeMaster: true },
          orderBy: { CreatedOn: 'desc' },
        })
      : [];
    const paymentByStudent = new Map<number, any>();
    for (const payment of payments) {
      const fee = String(payment.feeType || payment.feeTypeMaster?.feeTypeName || '').toUpperCase();
      if (!fee.includes('EXAM')) continue;
      const sid = Number(payment.studentId);
      const current = paymentByStudent.get(sid);
      const success = String(payment.paymentStatus || '').toUpperCase() === 'SUCCESS';
      if (!current || (success && String(current.paymentStatus || '').toUpperCase() !== 'SUCCESS')) {
        paymentByStudent.set(sid, payment);
      }
    }
    const wantFilled = String(query.filled ?? 'true') !== 'false';
    rows = rows.filter((row) => Boolean(paymentByStudent.get(Number(row.studentId))) === wantFilled);
    const dir = String(query.sortDir || 'asc').toLowerCase() === 'desc' ? -1 : 1;
    const sortKey = String(query.sortKey || 'studentName');
    rows.sort((a, b) => {
      const av = String(a[sortKey] || a.studentName || '').toLowerCase();
      const bv = String(b[sortKey] || b.studentName || '').toLowerCase();
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
    const total = rows.length;
    const pageRows = rows.slice((page - 1) * pageSize, page * pageSize);
    const ids = pageRows.map((row) => row.enrollmentId);
    const full = ids.length
      ? await this.enrollment().findMany({
          where: { enrollmentId: { in: ids } },
          include: {
            student: { include: { studentProfile: true, loginMaster: true, program: { include: { programCategory: true } } } },
            program: { include: { programCategory: true } },
            year: true,
            semester: true,
          },
        })
      : [];
    const byId = new Map(full.map((row: any) => [row.enrollmentId, row]));
    const items = pageRows.map((lightRow) => {
      const enr: any = byId.get(lightRow.enrollmentId) || lightRow;
      const student = enr.student || {};
      const program = enr.program || student.program || {};
      const category = program.programCategory || student.program?.programCategory || {};
      const payment = paymentByStudent.get(Number(enr.studentId));
      const programName = program.programName || '';
      const programShort = program.programShortName || '';
      const bedText = `${programName} ${programShort} ${category.programCategoryName || ''} ${category.pcShortName || ''}`;
      const isBed = /\bB\.?\s*ED\.?\b/i.test(bedText) || /bachelor\s+of\s+education/i.test(bedText);
      const dobRaw = enr.dateOfBirth || student.studentProfile?.dateOfBirth;
      const when = payment?.paymentDateTime || payment?.CreatedOn;
      return {
        key: `enr-${enr.enrollmentId}`,
        studentId: enr.studentId,
        enrollmentId: enr.enrollmentId,
        registrationNo: enr.registrationNo || student.registrationNo || '',
        enrollmentNo: enr.enrollmentNo || '',
        loginPassword: enr.examPassword || enr.loginPassword || student.loginMaster?.PlainPassword || '',
        studentName: enr.studentName || student.candidateName || '',
        fatherName: enr.fatherName || student.fatherName || '',
        dob: dobRaw ? new Date(dobRaw).toLocaleDateString('en-GB').replace(/\//g, '-') : '',
        mobileNo: student.mobileNo || enr.fatherMobNo || '',
        program: programName,
        programId: enr.programId || student.programId || null,
        programCategoryId: program.programCategoryId || category.programCategoryId || null,
        year: enr.year?.yearName || '',
        yearId: enr.yearId || null,
        semester: enr.semester?.semesterName || '',
        semId: enr.semId || null,
        examType: 'REGULAR',
        examFee: Number(payment?.amountPaid || 0),
        paymentStatus: payment?.paymentStatus || '',
        utr: payment?.bankRrnNo || '',
        paymentId: payment?.razorpayPaymentId || payment?.merchantOrderId || '',
        dateAndTime: when ? new Date(when).toLocaleString('en-GB', { hour12: false }).replace(',', '') : '',
        filled: Boolean(payment),
        isBed,
      };
    });
    return { items, page, pageSize, total };
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
