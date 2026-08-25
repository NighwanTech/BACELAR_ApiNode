import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class ExamSchemeService {
  constructor(private readonly prisma: PrismaService) {}

  private examScheme() {
    return (this.prisma as any).examScheme;
  }

  private examSchemePaper() {
    return (this.prisma as any).examSchemePaper;
  }

  private schemeInclude() {
    return {
      papers: {
        where: { IsDeleted: false },
        orderBy: { srNo: 'asc' as const },
      },
      examinationDetail: true,
      academicSession: true,
      programCategory: true,
      program: true,
      year: true,
      semester: true,
    };
  }

  private toDateInput(value: Date | string | null | undefined): string | null {
    if (!value) return null;
    const raw = String(value);
    if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return null;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  private parseDate(value?: string | null): Date | null {
    if (!value) return null;
    const raw = String(value).trim();
    if (!raw) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      return new Date(`${raw}T00:00:00`);
    }
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  private paperLabel(code?: string | null, name?: string | null) {
    const pCode = String(code || '').trim();
    const pName = String(name || '').trim();
    if (pCode && pName) return `${pCode} ${pName}`;
    return pName || pCode || null;
  }

  private mapScheme(scheme: any) {
    if (!scheme) return null;
    return {
      ...scheme,
      pcShortName:
        scheme.programCategory?.pcShortName || scheme.pcShortName || null,
      papers: (scheme.papers || []).map((paper: any) => ({
        ...paper,
        examDate: this.toDateInput(paper.examDate),
      })),
    };
  }

  private async countStudentsByPaper(params: {
    paperIds: number[];
    examinationDetailId: number;
    programId: number;
    yearId: number;
    semId?: number | null;
  }) {
    const counts = new Map<number, number>();
    if (!params.paperIds.length) return counts;

    const examWhere: any = {
      IsDeleted: false,
      courseId: params.programId,
      yearId: params.yearId,
      ...(params.semId ? { semId: params.semId } : {}),
    };

    const byExamination = await this.prisma.studentExam.findMany({
      where: { ...examWhere, examinationDetailId: params.examinationDetailId },
      select: { studentExamId: true },
    });
    const examIds = (
      byExamination.length
        ? byExamination
        : await this.prisma.studentExam.findMany({
            where: examWhere,
            select: { studentExamId: true },
          })
    ).map((row) => row.studentExamId);

    if (!examIds.length) return counts;

    const grouped = await this.prisma.studentExamPaper.groupBy({
      by: ['paperId'],
      where: {
        studentExamId: { in: examIds },
        paperId: { in: params.paperIds },
        IsDeleted: false,
        isChosen: true,
      },
      _count: { paperId: true },
    });
    for (const row of grouped) {
      if (row.paperId) counts.set(row.paperId, row._count.paperId);
    }
    return counts;
  }

  async preview(query: {
    examinationDetailId?: number;
    academicSessionId?: number;
    programCategoryId?: number;
    programId?: number;
    yearId?: number;
    semId?: number;
  }) {
    const examinationDetailId = Number(query.examinationDetailId);
    const programId = Number(query.programId);
    const yearId = Number(query.yearId);
    const semId = query.semId ? Number(query.semId) : null;
    if (!examinationDetailId || !programId || !yearId) {
      throw new BadRequestException('Examination, program and year are required');
    }

    const examination = await this.prisma.examinationDetails.findFirst({
      where: { examinationId: examinationDetailId, IsDeleted: false },
      include: { academicSession: true },
    });
    if (!examination) {
      throw new NotFoundException('Examination not found');
    }

    const program = await this.prisma.program.findFirst({
      where: { programId, IsDeleted: false },
      include: { programCategory: true },
    });
    if (!program) {
      throw new NotFoundException('Program not found');
    }

    const year = await this.prisma.yearMaster.findFirst({
      where: { yearId, IsDeleted: false },
    });
    const semester = semId
      ? await this.prisma.semesterMaster.findFirst({
          where: { semId, IsDeleted: false },
        })
      : null;

    const papers = await this.prisma.paperDetailMaster.findMany({
      where: {
        programId,
        IsDeleted: false,
        OR: [{ yearId }, { yearId: null }],
        ...(semId
          ? { AND: [{ OR: [{ semId }, { semId: null }] }] }
          : {}),
      },
      include: { paperTypeRelation: true, program: true },
      orderBy: [{ paperId: 'asc' }],
    });

    const existing = await this.examScheme().findFirst({
      where: {
        examinationDetailId,
        programId,
        yearId,
        semId,
        IsDeleted: false,
      },
      include: this.schemeInclude(),
    });
    const savedByPaperId = new Map<number, any>(
      (existing?.papers || [])
        .filter((p: any) => p.paperId)
        .map((p: any) => [Number(p.paperId), p]),
    );

    const paperIds = papers.map((p) => p.paperId);
    const studentCounts = await this.countStudentsByPaper({
      paperIds,
      examinationDetailId,
      programId,
      yearId,
      semId,
    });

    const rows = papers.map((paper, index) => {
      const saved = savedByPaperId.get(paper.paperId);
      const paperNameWithCode =
        saved?.paperNameWithCode || this.paperLabel(paper.paperCode, paper.paperName);
      return {
        examSchemePaperId: saved?.examSchemePaperId || null,
        srNo: saved?.srNo || index + 1,
        programId: paper.programId || program.programId,
        programName: paper.program?.programName || program.programName,
        paperId: paper.paperId,
        subjectName: saved?.subjectName || paper.subjectName || null,
        paperName: saved?.paperName || paper.paperName,
        paperCode: saved?.paperCode || paper.paperCode || null,
        paperNameWithCode,
        paperTypeId: saved?.paperTypeId || paper.paperTypeId || null,
        paperType:
          saved?.paperType ||
          paper.paperTypeRelation?.name ||
          paper.paperType ||
          null,
        examDate: this.toDateInput(saved?.examDate) || '',
        examTime: saved?.examTime || '',
        shift: saved?.shift || '',
        noOfStudent: studentCounts.get(paper.paperId) || 0,
      };
    });

    return {
      examSchemeId: existing?.examSchemeId || null,
      examinationDetailId,
      examinationName: examination.examinationName,
      academicSessionId: examination.academicId,
      academicSessionName: examination.academicSession?.academicSessionName || null,
      programCategoryId: program.programCategoryId,
      programCategoryName: program.programCategory?.programCategoryName || null,
      programId: program.programId,
      programName: program.programName,
      yearId,
      yearName: year?.yearName || existing?.yearName || null,
      semId,
      semName: semester?.semesterName || existing?.semName || null,
      papers: rows,
    };
  }

  async save(data: any) {
    const examinationDetailId = Number(data.examinationDetailId);
    const programId = Number(data.programId);
    const yearId = Number(data.yearId);
    const semId = data.semId ? Number(data.semId) : null;
    const papers: any[] = Array.isArray(data.papers) ? data.papers : [];
    const actor = String(data.CreatedBy || data.UpdatedBy || 'Admin User');

    if (!examinationDetailId || !programId || !yearId) {
      throw new BadRequestException('Examination, program and year are required');
    }
    if (!papers.length) {
      throw new BadRequestException('At least one paper is required');
    }

    const examination = await this.prisma.examinationDetails.findFirst({
      where: { examinationId: examinationDetailId, IsDeleted: false },
      include: { academicSession: true },
    });
    if (!examination) throw new NotFoundException('Examination not found');

    const program = await this.prisma.program.findFirst({
      where: { programId, IsDeleted: false },
      include: { programCategory: true },
    });
    if (!program) throw new NotFoundException('Program not found');

    const year = await this.prisma.yearMaster.findFirst({
      where: { yearId, IsDeleted: false },
    });
    if (!year) throw new NotFoundException('Year not found');

    const semester = semId
      ? await this.prisma.semesterMaster.findFirst({
          where: { semId, IsDeleted: false },
        })
      : null;

    const uniquePaperIds = [
      ...new Set(
        papers
          .map((p) => Number(p.paperId))
          .filter((id) => Number.isFinite(id) && id > 0),
      ),
    ];
    const masterPapers = uniquePaperIds.length
      ? await this.prisma.paperDetailMaster.findMany({
          where: { paperId: { in: uniquePaperIds }, IsDeleted: false },
          include: { paperTypeRelation: true, program: true },
        })
      : [];
    const masterById = new Map(masterPapers.map((p) => [p.paperId, p]));

    const studentCounts = await this.countStudentsByPaper({
      paperIds: uniquePaperIds,
      examinationDetailId,
      programId,
      yearId,
      semId,
    });

    const header = {
      examinationDetailId,
      examinationName: examination.examinationName,
      academicSessionId: examination.academicId,
      academicSessionName: examination.academicSession?.academicSessionName || null,
      programCategoryId: program.programCategoryId,
      programCategoryName: program.programCategory?.programCategoryName || null,
      programId,
      programName: program.programName,
      yearId,
      yearName: year.yearName,
      semId,
      semName: semester?.semesterName || null,
    };

    const existing = await this.examScheme().findFirst({
      where: {
        examinationDetailId,
        programId,
        yearId,
        semId,
      },
      include: { papers: true },
    });

    const scheme = existing
      ? await this.examScheme().update({
          where: { examSchemeId: existing.examSchemeId },
          data: { ...header, UpdatedBy: actor, IsDeleted: false, IsActive: true },
        })
      : await this.examScheme().create({
          data: { ...header, CreatedBy: actor, IsActive: true, IsDeleted: false },
        });

    const existingByPaperId = new Map<number, any>(
      (existing?.papers || [])
        .filter((p: any) => p.paperId)
        .map((p: any) => [Number(p.paperId), p]),
    );
    const keptIds: number[] = [];

    for (const [index, row] of papers.entries()) {
      const paperId = Number(row.paperId);
      if (!paperId) continue;
      const master = masterById.get(paperId);
      const paperName = row.paperName || master?.paperName || null;
      const paperCode = row.paperCode || master?.paperCode || null;
      const payload = {
        examSchemeId: scheme.examSchemeId,
        srNo: Number(row.srNo) || index + 1,
        programId: master?.programId || program.programId,
        programName: master?.program?.programName || program.programName,
        paperId,
        subjectName: row.subjectName || master?.subjectName || null,
        paperName,
        paperCode,
        paperNameWithCode:
          row.paperNameWithCode || this.paperLabel(paperCode, paperName),
        paperTypeId: row.paperTypeId || master?.paperTypeId || null,
        paperType:
          row.paperType || master?.paperTypeRelation?.name || master?.paperType || null,
        examDate: this.parseDate(row.examDate),
        examTime: String(row.examTime || '').trim() || null,
        shift: String(row.shift || '').trim() || null,
        noOfStudent: studentCounts.get(paperId) || Number(row.noOfStudent) || 0,
        IsActive: true,
        IsDeleted: false,
        DeletedOn: null,
        DeletedBy: null,
        DeletedRemarks: null,
      };

      const found = existingByPaperId.get(paperId);
      if (found?.examSchemePaperId) {
        const updated = await this.examSchemePaper().update({
          where: { examSchemePaperId: found.examSchemePaperId },
          data: { ...payload, UpdatedBy: actor },
        });
        keptIds.push(updated.examSchemePaperId);
      } else {
        const created = await this.examSchemePaper().create({
          data: { ...payload, CreatedBy: actor },
        });
        keptIds.push(created.examSchemePaperId);
      }
    }

    if (keptIds.length) {
      await this.examSchemePaper().updateMany({
        where: {
          examSchemeId: scheme.examSchemeId,
          examSchemePaperId: { notIn: keptIds },
          IsDeleted: false,
        },
        data: {
          IsDeleted: true,
          DeletedBy: actor,
          DeletedOn: new Date(),
          DeletedRemarks: 'Removed from exam scheme save',
        },
      });
    }

    const saved = await this.examScheme().findFirst({
      where: { examSchemeId: scheme.examSchemeId },
      include: this.schemeInclude(),
    });
    return this.mapScheme(saved);
  }

  async findAll() {
    const rows = await this.examScheme().findMany({
      where: { IsDeleted: false },
      include: this.schemeInclude(),
      orderBy: { examSchemeId: 'desc' },
    });
    return rows.map((row: any) => this.mapScheme(row));
  }

  async findOne(examSchemeId: number) {
    const row = await this.examScheme().findFirst({
      where: { examSchemeId, IsDeleted: false },
      include: this.schemeInclude(),
    });
    if (!row) throw new NotFoundException('Exam scheme not found');
    return this.mapScheme(row);
  }

  async updateStatus(examSchemeId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(examSchemeId);
    return this.examScheme().update({
      where: { examSchemeId },
      data: { IsActive, UpdatedBy },
    });
  }

  async remove(examSchemeId: number, DeletedBy: string, DeletedRemarks?: string) {
    const row = await this.examScheme().findFirst({
      where: { examSchemeId, IsDeleted: false },
    });
    if (!row) throw new NotFoundException('Exam scheme not found');

    await this.examSchemePaper().updateMany({
      where: { examSchemeId, IsDeleted: false },
      data: {
        IsDeleted: true,
        DeletedBy,
        DeletedOn: new Date(),
        DeletedRemarks: DeletedRemarks || 'Exam scheme deleted',
      },
    });

    return this.examScheme().update({
      where: { examSchemeId },
      data: {
        IsDeleted: true,
        DeletedBy,
        DeletedOn: new Date(),
        DeletedRemarks: DeletedRemarks || 'Exam scheme deleted',
      },
    });
  }
}
