import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@app/prisma';

const FEE_BY_TYPE: Array<{ match: RegExp; fee: number }> = [
  { match: /photo\s*copy|photocopy|answersheet/i, fee: 100 },
  { match: /scrutin|recheck/i, fee: 200 },
  { match: /revaluat/i, fee: 3000 },
];

const ALLOWED_STATUSES = [
  'SUBMITTED',
  'PROCESSING',
  'MAIL_SENT',
  'NO_CHANGE',
  'MARKS_INCREASED',
  'RESULT_UPGRADED',
] as const;

@Injectable()
export class ExamGrevianceService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeRoll(rollNo: string): string {
    return String(rollNo || '').trim().toUpperCase();
  }

  private resolveFee(typeName: string): number {
    const name = String(typeName || '');
    for (const row of FEE_BY_TYPE) {
      if (row.match.test(name)) return row.fee;
    }
    return 0;
  }

  private formatDob(value?: Date | string | null): string | null {
    if (!value) return null;
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return null;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    return `${dd}-${mm}-${d.getFullYear()}`;
  }

  private normalizeShortcode(shortcode?: string | null): string {
    const cleaned = String(shortcode || '')
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '');
    return cleaned || '00';
  }

  private async nextTrackNo(shortcode?: string | null): Promise<string> {
    const year = new Date().getFullYear();
    const code = this.normalizeShortcode(shortcode);
    const prefix = `${year}${code}`;

    // Avoid Prisma `startsWith` / MySQL LIKE collation clash (utf8mb4_unicode_ci vs utf8mb4_bin)
    const existing = await this.prisma.examGrevianceApplication.findMany({
      where: {
        IsDeleted: false,
        NOT: { trackNo: null },
      },
      select: { trackNo: true },
      orderBy: { examGrevianceApplicationId: 'desc' },
      take: 500,
    });

    let maxSeq = 0;
    for (const row of existing) {
      const trackNo = String(row.trackNo || '');
      if (!trackNo.startsWith(prefix)) continue;
      const suffix = trackNo.slice(prefix.length);
      const n = Number.parseInt(suffix, 10);
      if (Number.isFinite(n) && n > maxSeq) maxSeq = n;
    }

    return `${prefix}${String(maxSeq + 1).padStart(2, '0')}`;
  }

  async lookupByRoll(rollNoRaw: string) {
    const rollNo = this.normalizeRoll(rollNoRaw);
    if (!rollNo) throw new BadRequestException('Roll number is required');

    const results = await this.prisma.examResult.findMany({
      where: {
        IsDeleted: false,
        IsActive: true,
        OR: [{ rollNo }, { rollNo: String(rollNoRaw).trim() }],
      },
      include: { paper: { include: { paperTypeRelation: true } } },
      orderBy: [{ examinationDetailId: 'desc' }, { paperId: 'asc' }],
    });

    if (!results.length) {
      throw new NotFoundException(
        `No exam result found for roll number ${rollNo}. Please check and try again.`,
      );
    }

    const first = results[0];
    const student = {
      studentId: first.studentId,
      rollNo: first.rollNo || rollNo,
      enrolmentNo: first.enrolmentNo || null,
      examTypeId: first.examTypeId || null,
      examTypeName: first.examTypeName || 'REGULAR',
      programCategoryId: first.programCategoryId || null,
      programCategoryName: first.programCategoryName || null,
      programId: first.programId || null,
      programName: first.programName || null,
      studentName: first.studentName || null,
      fatherName: first.fatherName || null,
      motherName: first.motherName || null,
      dob: this.formatDob(first.dob),
      castCategory: first.castCategory || null,
      gender: first.gender || null,
      emailId: first.emailId || null,
      mobileNo: first.mobileNo || null,
      academicSessionId: first.academicSessionId || null,
      sessionalName: first.sessionalName || null,
      examinationDetailId: first.examinationDetailId || null,
      examinationName: first.examinationName || null,
      yearId: first.yearId || null,
      yearName: first.yearName || null,
      semId: first.semId || null,
      semesterName: first.semesterName || null,
    };

    const sumNums = (values: Array<number | null | undefined>) => {
      const nums = values.filter((v): v is number => v != null && !Number.isNaN(Number(v)));
      return nums.length ? nums.reduce((a, b) => a + Number(b), 0) : null;
    };

    const papers = results.map((r) => {
      const obtained = sumNums([
        r.theoryExternalObt,
        r.sessionalInternalObt,
        r.practicalObt,
      ]);
      const maxTotal =
        sumNums([r.theoryExternalMax, r.sessionalInternalMax, r.practicalMax]) ??
        r.totalMax;
      const minRequired = sumNums([
        r.theoryExternalMin,
        r.sessionalInternalMin,
        r.practicalMin,
      ]);
      const absent = String(r.attendanceStatus || '').toUpperCase() === 'A';
      const derivedResult = absent
        ? 'ABSENT'
        : obtained != null && minRequired != null
          ? obtained >= minRequired
            ? 'PASS'
            : 'FAIL'
          : null;

      return {
        examResultId: r.examResultId,
        paperId: r.paperId,
        paperCode: r.paperCode,
        subjectName: r.subjectName,
        paperName: r.paperName,
        paperType:
          r.paperType ||
          r.paper?.paperType ||
          r.paper?.paperTypeRelation?.name ||
          null,
        totalMax: maxTotal,
        totalMin: minRequired ?? r.totalMin,
        theoryExternalMax: r.theoryExternalMax,
        theoryExternalMin: r.theoryExternalMin,
        theoryExternalObt: r.theoryExternalObt,
        sessionalInternalMax: r.sessionalInternalMax,
        sessionalInternalMin: r.sessionalInternalMin,
        sessionalInternalObt: r.sessionalInternalObt,
        practicalMax: r.practicalMax,
        practicalMin: r.practicalMin,
        practicalObt: r.practicalObt,
        totalMarks: r.totalMarks ?? obtained,
        grade: r.grade,
        result: r.result || derivedResult,
        attendanceStatus: r.attendanceStatus,
      };
    });

    const applications = await this.prisma.examGrevianceApplication.findMany({
      where: {
        IsDeleted: false,
        OR: [{ rollNo }, { rollNo: String(rollNoRaw).trim() }],
      },
      include: { papers: true },
      orderBy: { examGrevianceApplicationId: 'desc' },
    });

    const grevianceTypes = await this.prisma.grevianceTypeMaster.findMany({
      where: { IsDeleted: false, IsActive: true },
      orderBy: { grevianceTypeName: 'asc' },
    });

    const feeTable = grevianceTypes.map((t) => ({
      grevianceTypeId: t.grevianceTypeId,
      grevianceTypeName: t.grevianceTypeName,
      fee: this.resolveFee(t.grevianceTypeName),
    }));

    return { student, papers, applications, grevianceTypes: feeTable };
  }

  async create(data: any) {
    const rollNo = this.normalizeRoll(data.rollNo);
    if (!rollNo) throw new BadRequestException('Roll number is required');

    const examResultIds: number[] = Array.isArray(data.examResultIds)
      ? data.examResultIds.map((id: any) => Number(id)).filter((id: number) => id > 0)
      : [];
    if (!examResultIds.length) {
      throw new BadRequestException('Select at least one paper');
    }

    let grevianceTypeName = String(data.grevianceTypeName || '').trim();
    let grevianceTypeId =
      data.grevianceTypeId !== undefined && data.grevianceTypeId !== null && data.grevianceTypeId !== ''
        ? Number(data.grevianceTypeId)
        : null;
    let grevianceShortcode: string | null = null;

    if (grevianceTypeId) {
      const typeRow = await this.prisma.grevianceTypeMaster.findFirst({
        where: { grevianceTypeId, IsDeleted: false, IsActive: true },
      });
      if (!typeRow) throw new NotFoundException('Greviance type not found');
      grevianceTypeName = typeRow.grevianceTypeName;
      grevianceShortcode = typeRow.shortcode;
    } else if (!grevianceTypeName) {
      throw new BadRequestException('Apply For (greviance type) is required');
    } else {
      const typeRow = await this.prisma.grevianceTypeMaster.findFirst({
        where: { grevianceTypeName, IsDeleted: false, IsActive: true },
      });
      grevianceShortcode = typeRow?.shortcode || null;
      grevianceTypeId = typeRow?.grevianceTypeId || null;
    }

    const results = await this.prisma.examResult.findMany({
      where: {
        examResultId: { in: examResultIds },
        IsDeleted: false,
        OR: [{ rollNo }, { rollNo: String(data.rollNo).trim() }],
      },
    });
    if (!results.length) {
      throw new BadRequestException('Selected papers do not match this roll number');
    }

    const first = results[0];
    const feePerPaper = this.resolveFee(grevianceTypeName);
    const feeAmount = feePerPaper * results.length;
    const trackNo = await this.nextTrackNo(grevianceShortcode);

    const created = await this.prisma.examGrevianceApplication.create({
      data: {
        studentId: first.studentId,
        rollNo: first.rollNo || rollNo,
        enrolmentNo: first.enrolmentNo || null,
        examTypeId: first.examTypeId || null,
        examTypeName: first.examTypeName || 'REGULAR',
        programCategoryId: first.programCategoryId || null,
        programCategoryName: first.programCategoryName || null,
        programId: first.programId || null,
        programName: first.programName || null,
        studentName: first.studentName || null,
        fatherName: first.fatherName || null,
        motherName: first.motherName || null,
        dob: first.dob || null,
        castCategory: first.castCategory || null,
        gender: first.gender || null,
        emailId: first.emailId || null,
        mobileNo: first.mobileNo || null,
        academicSessionId: first.academicSessionId || null,
        examinationDetailId: first.examinationDetailId || null,
        examinationName: first.examinationName || null,
        yearId: first.yearId || null,
        yearName: first.yearName || null,
        semId: first.semId || null,
        semesterName: first.semesterName || null,
        grevianceTypeId,
        grevianceTypeName,
        trackNo,
        status: 'SUBMITTED',
        feeAmount,
        paymentStatus: 'PENDING',
        CreatedBy: data.CreatedBy || 'Website',
        Remarks: data.Remarks || null,
        papers: {
          create: results.map((r) => ({
            examResultId: r.examResultId,
            paperId: r.paperId,
            paperCode: r.paperCode,
            subjectName: r.subjectName,
            paperName: r.paperName,
            paperType: r.paperType,
          })),
        },
      },
      include: { papers: true },
    });

    return created;
  }

  async trackByNo(trackNoRaw: string) {
    const trackNo = String(trackNoRaw || '').trim().toUpperCase();
    if (!trackNo) throw new BadRequestException('Track status number is required');

    const application = await this.prisma.examGrevianceApplication.findFirst({
      where: {
        IsDeleted: false,
        OR: [{ trackNo }, { trackNo: String(trackNoRaw).trim() }],
      },
      include: { papers: true },
    });
    if (!application) {
      throw new NotFoundException(
        `No application found for track number ${trackNo}. Please check and try again.`,
      );
    }

    return {
      application,
      statusLabel: application.status,
      student: {
        studentId: application.studentId,
        rollNo: application.rollNo,
        enrolmentNo: application.enrolmentNo,
        studentName: application.studentName,
        fatherName: application.fatherName,
        motherName: application.motherName,
        programName: application.programName,
        programCategoryName: application.programCategoryName,
        examTypeName: application.examTypeName,
        dob: this.formatDob(application.dob),
        castCategory: application.castCategory,
        gender: application.gender,
        examinationName: application.examinationName,
        yearName: application.yearName,
        semesterName: application.semesterName,
      },
    };
  }

  async findAll(filters: {
    status?: string;
    grevianceTypeId?: number;
    rollNo?: string;
    programId?: number;
    examinationDetailId?: number;
    activeOnly?: boolean;
  } = {}) {
    const where: Record<string, any> = { IsDeleted: false };
    if (filters.activeOnly) where.IsActive = true;
    if (filters.status) where.status = String(filters.status).trim().toUpperCase();
    if (filters.grevianceTypeId) where.grevianceTypeId = Number(filters.grevianceTypeId);
    if (filters.programId) where.programId = Number(filters.programId);
    if (filters.examinationDetailId) {
      where.examinationDetailId = Number(filters.examinationDetailId);
    }
    if (filters.rollNo) {
      const roll = this.normalizeRoll(filters.rollNo);
      where.OR = [{ rollNo: roll }, { rollNo: String(filters.rollNo).trim() }];
    }

    return this.prisma.examGrevianceApplication.findMany({
      where,
      include: { papers: true },
      orderBy: { examGrevianceApplicationId: 'desc' },
    });
  }

  async findOne(examGrevianceApplicationId: number) {
    const row = await this.prisma.examGrevianceApplication.findFirst({
      where: { examGrevianceApplicationId, IsDeleted: false },
      include: { papers: true },
    });
    if (!row) throw new NotFoundException('Exam greviance application not found');
    return row;
  }

  async updateApplicationStatus(
    examGrevianceApplicationId: number,
    status: string,
    UpdatedBy: string,
    Remarks?: string,
  ) {
    const nextStatus = String(status || '').trim().toUpperCase();
    if (!ALLOWED_STATUSES.includes(nextStatus as (typeof ALLOWED_STATUSES)[number])) {
      throw new BadRequestException(
        `Invalid status. Allowed: ${ALLOWED_STATUSES.join(', ')}`,
      );
    }
    if (!UpdatedBy?.trim()) {
      throw new BadRequestException('UpdatedBy is required');
    }

    await this.findOne(examGrevianceApplicationId);

    const data: Record<string, any> = {
      status: nextStatus,
      UpdatedBy: UpdatedBy.trim(),
    };
    if (Remarks !== undefined) data.Remarks = Remarks;

    return this.prisma.examGrevianceApplication.update({
      where: { examGrevianceApplicationId },
      data,
      include: { papers: true },
    });
  }
}
