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

  async lookupByRoll(rollNoRaw: string) {
    const rollNo = this.normalizeRoll(rollNoRaw);
    if (!rollNo) throw new BadRequestException('Roll number is required');

    const results = await this.prisma.examResult.findMany({
      where: {
        IsDeleted: false,
        IsActive: true,
        OR: [{ rollNo }, { rollNo: String(rollNoRaw).trim() }],
      },
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

    const papers = results.map((r) => ({
      examResultId: r.examResultId,
      paperId: r.paperId,
      paperCode: r.paperCode,
      subjectName: r.subjectName,
      paperName: r.paperName,
      paperType: r.paperType,
      totalMax: r.totalMax,
      totalMin: r.totalMin,
      theoryExternalMax: r.theoryExternalMax,
      theoryExternalObt: r.theoryExternalObt,
      sessionalInternalMax: r.sessionalInternalMax,
      sessionalInternalObt: r.sessionalInternalObt,
      practicalMax: r.practicalMax,
      practicalObt: r.practicalObt,
      totalMarks: r.totalMarks,
      grade: r.grade,
      result: r.result,
      attendanceStatus: r.attendanceStatus,
    }));

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

    if (grevianceTypeId) {
      const typeRow = await this.prisma.grevianceTypeMaster.findFirst({
        where: { grevianceTypeId, IsDeleted: false, IsActive: true },
      });
      if (!typeRow) throw new NotFoundException('Greviance type not found');
      grevianceTypeName = typeRow.grevianceTypeName;
    } else if (!grevianceTypeName) {
      throw new BadRequestException('Apply For (greviance type) is required');
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
