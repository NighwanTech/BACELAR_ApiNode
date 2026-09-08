import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../common/active-only';

const STATUS_CURRENT = 'CURRENT';
const STATUS_PREVIOUS = 'PREVIOUS';

@Injectable()
export class ResultDeclarationService {
  constructor(private readonly prisma: PrismaService) {}

  private declarationDb() {
    const db = (this.prisma as any).resultDeclaration;
    if (!db) {
      throw new BadRequestException(
        'Prisma model resultDeclaration is missing. Restart API after prisma generate.',
      );
    }
    return db;
  }

  private examResultDb() {
    const db = (this.prisma as any).examResult;
    if (!db) {
      throw new BadRequestException(
        'Prisma model examResult is missing. Restart API after prisma generate.',
      );
    }
    return db;
  }

  private toNum(value: any): number | null {
    if (value === undefined || value === null || value === '') return null;
    const n = Number(value);
    return Number.isNaN(n) ? null : n;
  }

  private toDate(value: any): Date | null {
    if (!value) return null;
    const d = value instanceof Date ? value : new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  private normalizeRoll(rollNo: string): string {
    return String(rollNo || '').trim().toUpperCase();
  }

  private buildCourseLabel(parts: {
    programName?: string | null;
    programShortName?: string | null;
    semesterName?: string | null;
    yearName?: string | null;
  }): string {
    const program = String(parts.programName || '').trim();
    const shortName = String(parts.programShortName || '').trim();
    const sem = String(parts.semesterName || '').trim();
    const year = String(parts.yearName || '').trim();

    let label = program;
    if (shortName && program && !program.includes(`[${shortName}]`)) {
      label = `${program} [${shortName}]`;
    }
    if (sem) label = `${label} ${sem}`.trim();
    else if (year) label = `${label} ${year}`.trim();
    return label || 'Course';
  }

  private async snapshotMasters(data: any) {
    const academicSessionId = this.toNum(data.academicSessionId);
    const examinationDetailId = this.toNum(data.examinationDetailId);
    const programId = this.toNum(data.programId);
    const yearId = this.toNum(data.yearId);
    const semId = this.toNum(data.semId);

    if (!academicSessionId) throw new BadRequestException('academicSessionId is required');
    if (!programId) throw new BadRequestException('programId is required');

    const session = await this.prisma.academicSession.findFirst({
      where: { academicSessionId, IsDeleted: false },
      include: {
        college: {
          select: {
            collegeId: true,
            collegeCode: true,
            collegeName: true,
            shortName: true,
            collegeAddress: true,
          },
        },
      },
    });
    if (!session) throw new NotFoundException('Academic session not found');

    const program = await this.prisma.program.findFirst({
      where: { programId, IsDeleted: false },
    });
    if (!program) throw new NotFoundException('Program not found');

    let examinationName: string | null = data.examinationName ?? null;
    if (examinationDetailId) {
      const exam = await this.prisma.examinationDetails.findFirst({
        where: { examinationId: examinationDetailId, IsDeleted: false },
      });
      if (!exam) throw new NotFoundException('Examination detail not found');
      examinationName = exam.examinationName;
    }

    let yearName: string | null = data.yearName ?? null;
    if (yearId) {
      const year = await this.prisma.yearMaster.findFirst({
        where: { yearId, IsDeleted: false },
      });
      if (!year) throw new NotFoundException('Year not found');
      yearName = year.yearName;
    }

    let semesterName: string | null = data.semesterName ?? null;
    if (semId) {
      const semester = await this.prisma.semesterMaster.findFirst({
        where: { semId, IsDeleted: false },
      });
      if (!semester) throw new NotFoundException('Semester not found');
      semesterName = semester.semesterName;
    }

    const courseLabel =
      data.courseLabel ||
      this.buildCourseLabel({
        programName: program.programName,
        programShortName: program.programShortName,
        semesterName,
        yearName,
      });

    return {
      academicSessionId,
      sessionalName: session.academicSessionName,
      examinationDetailId,
      examinationName,
      programId,
      programName: program.programName,
      yearId,
      yearName,
      semId,
      semesterName,
      courseLabel,
      college: session.college || null,
    };
  }

  async declare(data: any) {
    const snap = await this.snapshotMasters(data);
    const declareDate = this.toDate(data.declareDate) || new Date();
    const createdBy = data.CreatedBy || data.publishedBy || 'Admin';

    const marksCount = await this.examResultDb().count({
      where: {
        IsDeleted: false,
        academicSessionId: snap.academicSessionId,
        programId: snap.programId,
        ...(snap.yearId ? { yearId: snap.yearId } : {}),
        ...(snap.semId ? { semId: snap.semId } : {}),
        ...(snap.examinationDetailId ? { examinationDetailId: snap.examinationDetailId } : {}),
      },
    });
    if (marksCount === 0) {
      throw new BadRequestException(
        'No exam marks found for this Session + Program + Year/Semester. Enter marks first.',
      );
    }

    const existingCurrent = await this.declarationDb().findMany({
      where: {
        IsDeleted: false,
        status: STATUS_CURRENT,
        programId: snap.programId,
        yearId: snap.yearId ?? null,
        semId: snap.semId ?? null,
      },
    });

    const duplicateSameSession = existingCurrent.find(
      (row: any) =>
        Number(row.academicSessionId) === snap.academicSessionId &&
        Number(row.examinationDetailId || 0) === Number(snap.examinationDetailId || 0),
    );
    if (duplicateSameSession) {
      throw new ConflictException(
        'This result is already declared as CURRENT for the same Session / Program / Year / Semester',
      );
    }

    return this.prisma.$transaction(async (tx: any) => {
      if (existingCurrent.length > 0) {
        await tx.resultDeclaration.updateMany({
          where: {
            resultDeclarationId: {
              in: existingCurrent.map((r: any) => r.resultDeclarationId),
            },
          },
          data: {
            status: STATUS_PREVIOUS,
            UpdatedBy: createdBy,
          },
        });
      }

      const created = await tx.resultDeclaration.create({
        data: {
          academicSessionId: snap.academicSessionId,
          sessionalName: snap.sessionalName,
          examinationDetailId: snap.examinationDetailId,
          examinationName: snap.examinationName,
          programId: snap.programId,
          programName: snap.programName,
          yearId: snap.yearId,
          yearName: snap.yearName,
          semId: snap.semId,
          semesterName: snap.semesterName,
          courseLabel: snap.courseLabel,
          declareDate,
          status: STATUS_CURRENT,
          publishedAt: new Date(),
          publishedBy: createdBy,
          CreatedBy: createdBy,
          Remarks: data.Remarks || null,
          IsActive: true,
          IsDeleted: false,
        },
      });

      await tx.examResult.updateMany({
        where: {
          IsDeleted: false,
          academicSessionId: snap.academicSessionId,
          programId: snap.programId,
          ...(snap.yearId ? { yearId: snap.yearId } : {}),
          ...(snap.semId ? { semId: snap.semId } : {}),
          ...(snap.examinationDetailId ? { examinationDetailId: snap.examinationDetailId } : {}),
        },
        data: {
          resultDeclareDate: declareDate,
        },
      });

      return created;
    });
  }

  async findAll(filters: any = {}) {
    const where: Record<string, any> = { IsDeleted: false };
    if (isActiveOnly(filters.activeOnly)) where.IsActive = true;
    if (filters.status) where.status = String(filters.status).trim().toUpperCase();
    for (const key of [
      'academicSessionId',
      'examinationDetailId',
      'programId',
      'yearId',
      'semId',
    ]) {
      if (filters[key] !== undefined && filters[key] !== null && String(filters[key]).trim() !== '') {
        where[key] = Number(filters[key]);
      }
    }

    return this.declarationDb().findMany({
      where,
      orderBy: [{ declareDate: 'desc' }, { resultDeclarationId: 'desc' }],
    });
  }

  async findOne(resultDeclarationId: number) {
    const row = await this.declarationDb().findFirst({
      where: { resultDeclarationId, IsDeleted: false },
    });
    if (!row) throw new NotFoundException(`Result declaration ${resultDeclarationId} not found`);
    return row;
  }

  async listCurrentPublic() {
    return this.declarationDb().findMany({
      where: {
        IsDeleted: false,
        IsActive: true,
        status: STATUS_CURRENT,
      },
      select: {
        resultDeclarationId: true,
        academicSessionId: true,
        sessionalName: true,
        examinationDetailId: true,
        examinationName: true,
        programId: true,
        programName: true,
        yearId: true,
        yearName: true,
        semId: true,
        semesterName: true,
        courseLabel: true,
        declareDate: true,
        status: true,
      },
      orderBy: [{ courseLabel: 'asc' }, { resultDeclarationId: 'desc' }],
    });
  }

  async listPreviousSessionsPublic() {
    const rows = await this.declarationDb().findMany({
      where: {
        IsDeleted: false,
        IsActive: true,
        status: STATUS_PREVIOUS,
      },
      select: {
        academicSessionId: true,
        sessionalName: true,
      },
      distinct: ['academicSessionId'],
      orderBy: [{ academicSessionId: 'desc' }],
    });
    return rows;
  }

  async listPreviousBySessionPublic(academicSessionId: number) {
    return this.declarationDb().findMany({
      where: {
        IsDeleted: false,
        IsActive: true,
        status: STATUS_PREVIOUS,
        academicSessionId: Number(academicSessionId),
      },
      select: {
        resultDeclarationId: true,
        academicSessionId: true,
        sessionalName: true,
        examinationDetailId: true,
        examinationName: true,
        programId: true,
        programName: true,
        yearId: true,
        yearName: true,
        semId: true,
        semesterName: true,
        courseLabel: true,
        declareDate: true,
        status: true,
      },
      orderBy: [{ courseLabel: 'asc' }, { resultDeclarationId: 'desc' }],
    });
  }

  async archive(resultDeclarationId: number, UpdatedBy?: string) {
    const row = await this.findOne(resultDeclarationId);
    if (row.status !== STATUS_CURRENT) {
      throw new BadRequestException('Only CURRENT declarations can be moved to PREVIOUS');
    }
    return this.declarationDb().update({
      where: { resultDeclarationId },
      data: {
        status: STATUS_PREVIOUS,
        UpdatedBy: UpdatedBy || 'Admin',
      },
    });
  }

  async softDelete(resultDeclarationId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(resultDeclarationId);
    return this.declarationDb().update({
      where: { resultDeclarationId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  private groupPapers(rows: any[]) {
    const groupMap = new Map<string, any[]>();
    for (const row of rows) {
      const key = String(row.paperType || 'Other').trim() || 'Other';
      if (!groupMap.has(key)) groupMap.set(key, []);
      groupMap.get(key)!.push({
        paperId: row.paperId,
        paperCode: row.paperCode,
        subjectName: row.subjectName,
        paperName: row.paperName,
        paperType: row.paperType,
        attendanceStatus: row.attendanceStatus,
        theoryExternalMax: row.theoryExternalMax,
        theoryExternalMin: row.theoryExternalMin,
        theoryExternalObt: row.theoryExternalObt,
        sessionalInternalMax: row.sessionalInternalMax,
        sessionalInternalMin: row.sessionalInternalMin,
        sessionalInternalObt: row.sessionalInternalObt,
        practicalMax: row.practicalMax,
        practicalMin: row.practicalMin,
        practicalObt: row.practicalObt,
        totalMax: row.totalMax,
        totalMin: row.totalMin,
        totalMarks: row.totalMarks,
        creditMax: row.creditMax,
        creditObt: row.creditObt,
        gradePoint: row.gradePoint,
        grade: row.grade,
        result: row.result,
      });
    }

    const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    return Array.from(groupMap.entries()).map(([paperType, papers], index) => ({
      groupIndex: roman[index] || String(index + 1),
      paperType,
      papers,
    }));
  }

  private buildMarksheet(
    declaration: any,
    rows: any[],
    college: any,
    photoUrl: string | null = null,
  ) {
    const first = rows[0];
    const creditMax = rows.reduce((sum, r) => sum + (Number(r.creditMax) || 0), 0);
    const creditObt = rows.reduce((sum, r) => sum + (Number(r.creditObt) || 0), 0);

    const sgpa =
      rows.map((r) => r.sgpa).find((v) => v !== null && v !== undefined) ?? null;
    const ygpa =
      rows.map((r) => r.ygpa).find((v) => v !== null && v !== undefined) ?? null;
    const cgpa =
      rows.map((r) => r.cgpa).find((v) => v !== null && v !== undefined) ?? null;
    const percentage =
      rows.map((r) => r.percentage).find((v) => v !== null && v !== undefined) ?? null;
    const semesterGrade =
      rows.map((r) => r.grade).find((v) => v && String(v).trim() !== '') ||
      rows.map((r) => r.result).find((v) => v && String(v).trim() !== '') ||
      null;
    const overallResult =
      rows.map((r) => r.result).find((v) => v && String(v).trim() !== '') || null;

    const collegeCode = college?.collegeCode ? String(college.collegeCode) : '';
    const collegeName = college?.collegeName ? String(college.collegeName) : '';
    const collegeDisplay = [collegeCode, collegeName].filter(Boolean).join(', ');

    const courseName =
      declaration.courseLabel ||
      this.buildCourseLabel({
        programName: declaration.programName || first.programName,
        semesterName: declaration.semesterName || first.semesterName,
        yearName: declaration.yearName || first.yearName,
      });

    return {
      college: {
        collegeId: college?.collegeId ?? null,
        collegeCode: college?.collegeCode ?? null,
        collegeName: college?.collegeName ?? null,
        shortName: college?.shortName ?? null,
        collegeAddress: college?.collegeAddress ?? null,
        displayName: collegeDisplay || collegeName || null,
      },
      title: 'Provisional Statement of Marks',
      examinationName: declaration.examinationName || first.examinationName || null,
      declareDate: declaration.declareDate,
      status: declaration.status,
      resultDeclarationId: declaration.resultDeclarationId,
      student: {
        rollNo: first.rollNo,
        enrolmentNo: first.enrolmentNo,
        studentName: first.studentName,
        fatherName: first.fatherName,
        motherName: first.motherName,
        examCategory: 'Regular',
        courseName,
        programName: declaration.programName || first.programName,
        yearName: declaration.yearName || first.yearName,
        semesterName: declaration.semesterName || first.semesterName,
        sessionName: declaration.sessionalName || first.sessionalName,
        collegeName: collegeDisplay || collegeName || null,
        photoUrl: photoUrl || null,
      },
      paperGroups: this.groupPapers(rows),
      summary: {
        creditMax,
        creditObt,
        sgpa,
        ygpa,
        cgpa,
        percentage,
        semesterGrade,
        result: overallResult,
      },
    };
  }

  private async resolveStudentPhotoUrl(studentId: number): Promise<string | null> {
    if (!studentId) return null;

    try {
      const attachment = await (this.prisma as any).studentAttachment.findFirst({
        where: {
          studentId: Number(studentId),
          IsDeleted: false,
          documentType: { in: ['PHOTO', 'Photo', 'photo'] },
        },
        orderBy: { attachmentId: 'desc' },
        select: { fileUrl: true },
      });
      if (attachment?.fileUrl) return String(attachment.fileUrl);

      // Fallback: some rows store type with spaces / mixed case
      const anyPhoto = await (this.prisma as any).studentAttachment.findFirst({
        where: {
          studentId: Number(studentId),
          IsDeleted: false,
          OR: [
            { documentType: { contains: 'PHOTO' } },
            { documentType: { contains: 'Photo' } },
          ],
        },
        orderBy: { attachmentId: 'desc' },
        select: { fileUrl: true },
      });
      if (anyPhoto?.fileUrl) return String(anyPhoto.fileUrl);

      const student = await this.prisma.student.findFirst({
        where: { StudentRegistrationId: Number(studentId) },
        include: { studentProfile: true },
      });
      const profilePhoto =
        (student as any)?.studentProfile?.ProfilePhoto ||
        (student as any)?.ProfilePhoto ||
        null;
      return profilePhoto ? String(profilePhoto) : null;
    } catch {
      return null;
    }
  }

  async getPublicMarksheet(params: {
    rollNo: string;
    resultDeclarationId: number;
  }) {
    const rollNo = this.normalizeRoll(params.rollNo);
    if (!rollNo) throw new BadRequestException('rollNo is required');
    const resultDeclarationId = Number(params.resultDeclarationId);
    if (!resultDeclarationId) {
      throw new BadRequestException('resultDeclarationId is required');
    }

    const declaration = await this.declarationDb().findFirst({
      where: {
        resultDeclarationId,
        IsDeleted: false,
        IsActive: true,
        status: { in: [STATUS_CURRENT, STATUS_PREVIOUS] },
      },
    });
    if (!declaration) {
      throw new NotFoundException('Result is not declared or not available');
    }

    const where: Record<string, any> = {
      IsDeleted: false,
      IsActive: true,
      academicSessionId: declaration.academicSessionId,
      programId: declaration.programId,
      OR: [{ rollNo }, { rollNo: String(params.rollNo).trim() }],
    };
    if (declaration.yearId != null) where.yearId = declaration.yearId;
    if (declaration.semId != null) where.semId = declaration.semId;
    if (declaration.examinationDetailId != null) {
      where.examinationDetailId = declaration.examinationDetailId;
    }

    const rows = await this.examResultDb().findMany({
      where,
      orderBy: [{ paperType: 'asc' }, { paperCode: 'asc' }, { examResultId: 'asc' }],
    });

    if (!rows.length) {
      throw new NotFoundException('No result found for this Roll No. and Course');
    }

    const [session, photoUrl] = await Promise.all([
      this.prisma.academicSession.findFirst({
        where: { academicSessionId: declaration.academicSessionId },
        include: {
          college: {
            select: {
              collegeId: true,
              collegeCode: true,
              collegeName: true,
              shortName: true,
              collegeAddress: true,
            },
          },
        },
      }),
      this.resolveStudentPhotoUrl(Number(rows[0].studentId)),
    ]);

    return this.buildMarksheet(
      declaration,
      rows,
      session?.college || null,
      photoUrl,
    );
  }
}
