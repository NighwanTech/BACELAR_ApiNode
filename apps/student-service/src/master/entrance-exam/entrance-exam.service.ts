import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class EntranceExamService {
  constructor(private readonly prisma: PrismaService) {}

  private db() {
    return (this.prisma as any).entranceExamMaster;
  }

  private paperDb() {
    return (this.prisma as any).entrancePaperMaster;
  }

  private async resolveNames(data: {
    academicSessionId: number;
    programCategoryId: number;
    programId: number;
    entrancePaperId: number;
  }) {
    const [session, category, program, paper] = await Promise.all([
      this.prisma.academicSession.findFirst({
        where: { academicSessionId: data.academicSessionId, IsDeleted: false },
      }),
      this.prisma.programCategory.findFirst({
        where: { programCategoryId: data.programCategoryId, IsDeleted: false },
      }),
      this.prisma.program.findFirst({
        where: { programId: data.programId, IsDeleted: false },
      }),
      this.paperDb().findFirst({
        where: { entrancePaperId: data.entrancePaperId, IsDeleted: false },
      }),
    ]);
    if (!session) throw new NotFoundException('Academic session not found');
    if (!category) throw new NotFoundException('Program category not found');
    if (!program) throw new NotFoundException('Program not found');
    if (!paper) throw new NotFoundException('Entrance paper not found');
    if (program.programCategoryId !== data.programCategoryId) {
      throw new BadRequestException('Program does not belong to selected category');
    }
    return {
      academicSessionName: session.academicSessionName,
      programCategoryName: category.programCategoryName,
      programName: program.programName,
      entrancePaperName: paper.entrancePaperName,
    };
  }

  async create(data: any) {
    const academicSessionId = Number(data.academicSessionId);
    const programCategoryId = Number(data.programCategoryId);
    const programId = Number(data.programId);
    const entrancePaperId = Number(data.entrancePaperId);
    if (!academicSessionId || !programCategoryId || !programId || !entrancePaperId) {
      throw new BadRequestException('Session, category, program and paper are required');
    }
    const names = await this.resolveNames({
      academicSessionId,
      programCategoryId,
      programId,
      entrancePaperId,
    });
    const dup = await this.db().findFirst({
      where: {
        academicSessionId,
        programId,
        entrancePaperId,
        IsDeleted: false,
      },
    });
    if (dup) throw new ConflictException('This paper is already mapped for the same program and session. Choose a different paper (e.g. Paper-2) with its own date and time.');
    return this.db().create({
      data: {
        academicSessionId,
        programCategoryId,
        programId,
        entrancePaperId,
        ...names,
        examDate: String(data.examDate || '').trim() || null,
        fromTime: String(data.fromTime || '').trim() || null,
        toTime: String(data.toTime || '').trim() || null,
        CreatedBy: data.CreatedBy || 'Admin User',
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? Boolean(data.IsActive) : true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false, filters?: {
    academicSessionId?: number;
    programCategoryId?: number;
    programId?: number;
  }) {
    const where: any = {
      IsDeleted: false,
      ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}),
    };
    if (filters?.academicSessionId) where.academicSessionId = Number(filters.academicSessionId);
    if (filters?.programCategoryId) where.programCategoryId = Number(filters.programCategoryId);
    if (filters?.programId) where.programId = Number(filters.programId);
    return this.db().findMany({
      where,
      orderBy: [{ academicSessionId: 'desc' }, { programId: 'asc' }, { entranceExamId: 'asc' }],
    });
  }

  async findOne(entranceExamId: number) {
    const row = await this.db().findFirst({
      where: { entranceExamId, IsDeleted: false },
    });
    if (!row) throw new NotFoundException('Entrance exam not found');
    return row;
  }

  async update(entranceExamId: number, data: any) {
    const existing = await this.findOne(entranceExamId);
    const academicSessionId = data.academicSessionId
      ? Number(data.academicSessionId)
      : existing.academicSessionId;
    const programCategoryId = data.programCategoryId
      ? Number(data.programCategoryId)
      : existing.programCategoryId;
    const programId = data.programId ? Number(data.programId) : existing.programId;
    const entrancePaperId = data.entrancePaperId
      ? Number(data.entrancePaperId)
      : existing.entrancePaperId;
    const names = await this.resolveNames({
      academicSessionId,
      programCategoryId,
      programId,
      entrancePaperId,
    });
    const dup = await this.db().findFirst({
      where: {
        academicSessionId,
        programId,
        entrancePaperId,
        IsDeleted: false,
        NOT: { entranceExamId },
      },
    });
    if (dup) throw new ConflictException('This paper is already mapped for the same program and session. Choose a different paper (e.g. Paper-2) with its own date and time.');
    return this.db().update({
      where: { entranceExamId },
      data: {
        academicSessionId,
        programCategoryId,
        programId,
        entrancePaperId,
        ...names,
        examDate: data.examDate !== undefined ? String(data.examDate || '').trim() || null : undefined,
        fromTime: data.fromTime !== undefined ? String(data.fromTime || '').trim() || null : undefined,
        toTime: data.toTime !== undefined ? String(data.toTime || '').trim() || null : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async updateStatus(entranceExamId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(entranceExamId);
    return this.db().update({
      where: { entranceExamId },
      data: { IsActive, UpdatedBy },
    });
  }

  async softDelete(entranceExamId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(entranceExamId);
    return this.db().update({
      where: { entranceExamId },
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
    const result = await this.db().updateMany({
      where: { entranceExamId: { in: ids }, IsDeleted: false },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
    return { message: `Successfully soft-deleted ${result.count} entrance exam(s)`, count: result.count };
  }

  async generateRolls(data: {
    academicSessionId?: number;
    programCategoryId: number;
    programId: number;
    UpdatedBy?: string;
  }) {
    const programCategoryId = Number(data.programCategoryId);
    const programId = Number(data.programId);
    const academicSessionId = data.academicSessionId ? Number(data.academicSessionId) : 0;
    const updatedBy = String(data.UpdatedBy || 'Admin User');
    if (!programCategoryId || !programId) {
      throw new BadRequestException('programCategoryId and programId are required');
    }
    if (!academicSessionId) {
      throw new BadRequestException('academicSessionId is required');
    }
    return this.generateRollsFallback(academicSessionId, programCategoryId, programId, updatedBy);
  }

  private pad2(n: number) {
    return String(n).padStart(2, '0').slice(-2);
  }

  private pad3(n: number) {
    return String(n).padStart(3, '0').slice(-3);
  }

  private studentDb() {
    return (this.prisma as any).entranceStudent;
  }

  private studentPaperDb() {
    return (this.prisma as any).entranceStudentPaper;
  }

  private mappedPapers(academicSessionId: number, programId: number) {
    return this.db().findMany({
      where: {
        IsDeleted: false,
        IsActive: true,
        academicSessionId,
        programId,
      },
      orderBy: [{ examDate: 'asc' }, { entranceExamId: 'asc' }],
    });
  }

  private latestAttachment(attachments: any[], type: string) {
    const hit = (attachments || []).find(
      (a: any) => String(a.documentType || '').toUpperCase() === type,
    );
    return hit?.fileUrl || null;
  }

  private streamLabel(raw?: string | null) {
    const streamMap: Record<string, string> = {
      SCIENCE: 'Science',
      COMMERCE: 'Commerce',
      ARTS: 'Art',
      ART: 'Art',
    };
    const key = String(raw || '').toUpperCase();
    return streamMap[key] || raw || 'Art/Science/Commerce';
  }

  private paperResult(obtained: number | null, minMarks: number | null) {
    if (obtained == null || minMarks == null) return null;
    return obtained >= minMarks ? 'PASS' : 'FAIL';
  }

  private async ensurePaperRows(row: any, papers: any[], createdBy: string) {
    const existing = await this.studentPaperDb().findMany({
      where: { entranceStudentId: row.entranceStudentId, IsDeleted: false },
    });
    const have = new Set(existing.map((p: any) => Number(p.entrancePaperId)));
    for (const paper of papers) {
      if (have.has(Number(paper.entrancePaperId))) continue;
      await this.studentPaperDb().create({
        data: {
          entranceStudentId: row.entranceStudentId,
          studentId: row.studentId,
          entranceExamId: paper.entranceExamId,
          entrancePaperId: paper.entrancePaperId,
          entrancePaperName: paper.entrancePaperName,
          examDate: paper.examDate,
          fromTime: paper.fromTime,
          toTime: paper.toTime,
          maxMarks: 100,
          minMarks: 33,
          CreatedBy: createdBy,
          IsDeleted: false,
          IsActive: true,
        },
      });
    }
  }

  private async generateRollsFallback(
    academicSessionId: number,
    programCategoryId: number,
    programId: number,
    updatedBy: string,
  ) {
    await this.prisma.$executeRawUnsafe(`SELECT GET_LOCK('sp_bulk_generate_entrance_roll', 15)`);
    try {
      const session = await this.prisma.academicSession.findFirst({
        where: { academicSessionId, IsDeleted: false },
      });
      const category = await this.prisma.programCategory.findFirst({
        where: { programCategoryId, IsDeleted: false },
      });
      const program = await this.prisma.program.findFirst({
        where: { programId, IsDeleted: false },
      });
      if (!session) throw new NotFoundException('Academic session not found');
      if (!category) throw new NotFoundException('Program category not found');
      if (!program) throw new NotFoundException('Program not found');
      if (program.programCategoryId !== programCategoryId) {
        throw new BadRequestException('Program does not belong to selected category');
      }

      const papers = await this.mappedPapers(academicSessionId, programId);
      if (!papers.length) {
        throw new BadRequestException('Map at least one entrance paper for this program and session first');
      }

      const year = String(session.startYear || new Date().getFullYear());
      const numericCode = String(program.programCode || '').match(/^\d+$/)
        ? Number(program.programCode)
        : program.programId;
      const prefix = `${year}686${this.pad2(numericCode)}`;

      const existingRolls = await this.studentDb().findMany({
        where: { IsDeleted: false, NOT: { entranceRollnumber: null } },
        select: { entranceRollnumber: true },
      });
      let maxSerial = 0;
      for (const row of existingRolls) {
        const raw = String(row.entranceRollnumber || '');
        if (!raw.startsWith(prefix) || raw.length !== prefix.length + 3) continue;
        const n = Number(raw.slice(-3));
        if (Number.isFinite(n) && n > maxSerial) maxSerial = n;
      }

      const already = await this.studentDb().findMany({
        where: {
          IsDeleted: false,
          academicSessionId,
          programId,
        },
        select: { studentId: true },
      });
      const alreadyIds = new Set(already.map((r: any) => Number(r.studentId)));

      const candidates = await this.prisma.student.findMany({
        where: {
          IsDeleted: false,
          programId,
          program: { programCategoryId },
          academicSessionId,
        },
        include: {
          studentProfile: true,
          academicDetails: {
            where: { IsDeleted: false },
            orderBy: { academicDetailId: 'desc' },
            take: 1,
          },
          studentAttachments: {
            where: { IsDeleted: false },
            orderBy: { attachmentId: 'desc' },
          },
        },
        orderBy: { StudentRegistrationId: 'asc' },
      });

      const pending = candidates.filter((s) => !alreadyIds.has(Number(s.StudentRegistrationId)));
      const skipped = candidates.length - pending.length;
      let serial = maxSerial;

      for (const student of pending) {
        serial += 1;
        const created = await this.studentDb().create({
          data: {
            studentId: student.StudentRegistrationId,
            academicSessionId,
            academicSessionName: session.academicSessionName,
            programCategoryId,
            programCategoryName: category.programCategoryName,
            programId,
            programName: program.programName,
            programShortName: program.programShortName,
            entranceRollnumber: `${prefix}${this.pad3(serial)}`,
            registrationNo: student.registrationNo,
            candidateName: student.candidateName,
            fatherName: student.fatherName,
            motherName: student.studentProfile?.motherName || null,
            mobileNo: student.mobileNo,
            email: student.email,
            stream: this.streamLabel(student.academicDetails?.[0]?.stream),
            photoUrl:
              this.latestAttachment(student.studentAttachments, 'PHOTO') ||
              this.latestAttachment(student.studentAttachments, 'CANDIDATE PHOTO'),
            signatureUrl:
              this.latestAttachment(student.studentAttachments, 'SIGNATURE') ||
              this.latestAttachment(student.studentAttachments, 'SIGN'),
            CreatedBy: updatedBy,
            IsDeleted: false,
            IsActive: true,
          },
        });
        await this.ensurePaperRows(created, papers, updatedBy);
      }

      const existingRows = await this.studentDb().findMany({
        where: { IsDeleted: false, academicSessionId, programId },
      });
      for (const row of existingRows) {
        await this.ensurePaperRows(row, papers, updatedBy);
      }

      return {
        generated: pending.length,
        skipped,
        total: pending.length + skipped,
        prefix,
      };
    } finally {
      await this.prisma.$executeRawUnsafe(`SELECT RELEASE_LOCK('sp_bulk_generate_entrance_roll')`);
    }
  }

  async listStudents(filters: {
    academicSessionId?: number;
    programCategoryId?: number;
    programId?: number;
  }) {
    const academicSessionId = Number(filters.academicSessionId || 0);
    const programCategoryId = Number(filters.programCategoryId || 0);
    const programId = Number(filters.programId || 0);
    if (!academicSessionId || !programCategoryId || !programId) {
      throw new BadRequestException('Session, category and program are required');
    }

    const papers = await this.mappedPapers(academicSessionId, programId);
    const rows = await this.studentDb().findMany({
      where: {
        IsDeleted: false,
        academicSessionId,
        programCategoryId,
        programId,
      },
      include: {
        papers: {
          where: { IsDeleted: false },
          orderBy: { entranceStudentPaperId: 'asc' },
        },
      },
      orderBy: { entranceRollnumber: 'asc' },
    });

    for (const row of rows) {
      await this.ensurePaperRows(row, papers, 'Admin User');
    }

    const fresh = await this.studentDb().findMany({
      where: {
        IsDeleted: false,
        academicSessionId,
        programCategoryId,
        programId,
      },
      include: {
        papers: {
          where: { IsDeleted: false },
          orderBy: { entranceStudentPaperId: 'asc' },
        },
      },
      orderBy: { entranceRollnumber: 'asc' },
    });

    return {
      papers: papers.map((p: any) => ({
        entranceExamId: p.entranceExamId,
        entrancePaperId: p.entrancePaperId,
        entrancePaperName: p.entrancePaperName,
        examDate: p.examDate,
        fromTime: p.fromTime,
        toTime: p.toTime,
      })),
      students: fresh.map((row: any) => ({
        entranceStudentId: row.entranceStudentId,
        studentId: row.studentId,
        entranceRollnumber: row.entranceRollnumber,
        registrationNo: row.registrationNo,
        candidateName: row.candidateName,
        fatherName: row.fatherName,
        motherName: row.motherName,
        stream: row.stream,
        papers: (row.papers || []).map((p: any) => ({
          entranceStudentPaperId: p.entranceStudentPaperId,
          entranceExamId: p.entranceExamId,
          entrancePaperId: p.entrancePaperId,
          entrancePaperName: p.entrancePaperName,
          examDate: p.examDate,
          fromTime: p.fromTime,
          toTime: p.toTime,
          maxMarks: p.maxMarks,
          minMarks: p.minMarks,
          obtainedMarks: p.obtainedMarks,
          attendanceStatus: p.attendanceStatus,
          result: p.result,
        })),
      })),
    };
  }

  async saveMarks(data: {
    academicSessionId: number;
    programCategoryId: number;
    programId: number;
    UpdatedBy?: string;
    students: Array<{
      entranceStudentId: number;
      papers: Array<{
        entranceStudentPaperId?: number;
        entrancePaperId: number;
        obtainedMarks?: number | string | null;
        attendanceStatus?: string | null;
      }>;
    }>;
  }) {
    const academicSessionId = Number(data.academicSessionId);
    const programCategoryId = Number(data.programCategoryId);
    const programId = Number(data.programId);
    const updatedBy = String(data.UpdatedBy || 'Admin User');
    if (!academicSessionId || !programCategoryId || !programId) {
      throw new BadRequestException('Session, category and program are required');
    }
    const items = Array.isArray(data.students) ? data.students : [];
    if (!items.length) throw new BadRequestException('No student marks to save');

    let updated = 0;
    for (const item of items) {
      const entranceStudentId = Number(item.entranceStudentId);
      const row = await this.studentDb().findFirst({
        where: {
          entranceStudentId,
          academicSessionId,
          programCategoryId,
          programId,
          IsDeleted: false,
        },
      });
      if (!row) continue;
      for (const paper of item.papers || []) {
        const paperId = Number(paper.entrancePaperId);
        const paperRowId = Number(paper.entranceStudentPaperId || 0);
        const raw = paper.obtainedMarks;
        const obtained =
          raw === '' || raw == null || raw === undefined ? null : Number(raw);
        if (obtained != null && !Number.isFinite(obtained)) {
          throw new BadRequestException('Marks must be a number');
        }
        const existing = await this.studentPaperDb().findFirst({
          where: {
            IsDeleted: false,
            entranceStudentId,
            ...(paperRowId ? { entranceStudentPaperId: paperRowId } : { entrancePaperId: paperId }),
          },
        });
        if (!existing) continue;
        if (obtained != null && existing.maxMarks != null && obtained > Number(existing.maxMarks)) {
          throw new BadRequestException(
            `Marks for ${existing.entrancePaperName || 'paper'} cannot be more than ${existing.maxMarks}`,
          );
        }
        if (obtained != null && obtained < 0) {
          throw new BadRequestException('Marks cannot be negative');
        }
        await this.studentPaperDb().update({
          where: { entranceStudentPaperId: existing.entranceStudentPaperId },
          data: {
            obtainedMarks: obtained,
            attendanceStatus: paper.attendanceStatus
              ? String(paper.attendanceStatus).trim() || null
              : existing.attendanceStatus,
            result: this.paperResult(obtained, existing.minMarks == null ? null : Number(existing.minMarks)),
            UpdatedBy: updatedBy,
          },
        });
        updated += 1;
      }
    }

    return { message: 'Entrance marks saved', updated };
  }

  async getAdmitCard(query: { entranceRollnumber?: string; studentId?: number }) {
    const roll = String(query.entranceRollnumber || '').trim();
    const studentId = query.studentId ? Number(query.studentId) : 0;
    if (!roll && !studentId) {
      throw new BadRequestException('entranceRollnumber or studentId is required');
    }

    const row = await this.studentDb().findFirst({
      where: {
        IsDeleted: false,
        ...(roll ? { entranceRollnumber: roll } : { studentId }),
      },
      include: {
        papers: {
          where: { IsDeleted: false },
          orderBy: [{ examDate: 'asc' }, { entranceStudentPaperId: 'asc' }],
        },
      },
    });
    if (!row) {
      throw new NotFoundException('Entrance roll number is not generated for this student. Run bulk generate first.');
    }

    return {
      studentId: row.studentId,
      entranceRollnumber: row.entranceRollnumber,
      studentName: row.candidateName,
      fatherName: row.fatherName,
      motherName: row.motherName,
      programId: row.programId,
      programName: row.programShortName || row.programName || '',
      programFullName: row.programName || '',
      programShortName: row.programShortName || '',
      programCategoryName: row.programCategoryName || '',
      academicSessionId: row.academicSessionId,
      academicSessionName: row.academicSessionName || '',
      stream: row.stream,
      photoUrl: row.photoUrl,
      signatureUrl: row.signatureUrl,
      examDate: row.papers?.[0]?.examDate || null,
      papers: (row.papers || []).map((p: any) => ({
        entranceExamId: p.entranceExamId,
        entrancePaperId: p.entrancePaperId,
        entrancePaperName: p.entrancePaperName,
        examDate: p.examDate,
        fromTime: p.fromTime,
        toTime: p.toTime,
      })),
    };
  }
}
