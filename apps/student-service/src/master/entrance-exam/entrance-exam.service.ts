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

    try {
      const rows = await this.prisma.$queryRaw<any[]>`
        CALL sp_bulk_generate_entrance_roll(
          ${academicSessionId},
          ${programCategoryId},
          ${programId},
          ${updatedBy}
        )
      `;
      const flat = (Array.isArray(rows) ? rows : [rows]).flat(3) as any[];
      const first = flat.find(
        (row) => row && typeof row === 'object' && (row.generated !== undefined || row.GENERATED !== undefined),
      );
      if (first) {
        return {
          generated: Number(first.generated ?? first.GENERATED ?? 0),
          skipped: Number(first.skipped ?? first.SKIPPED ?? 0),
          total: Number(first.total ?? first.TOTAL ?? 0),
          prefix: first.prefix ?? first.PREFIX ?? null,
        };
      }
    } catch {
      /* SP missing — fall through to in-process generate */
    }

    return this.generateRollsFallback(academicSessionId, programCategoryId, programId, updatedBy);
  }

  private pad2(n: number) {
    return String(n).padStart(2, '0').slice(-2);
  }

  private pad3(n: number) {
    return String(n).padStart(3, '0').slice(-3);
  }

  private async generateRollsFallback(
    academicSessionId: number,
    programCategoryId: number,
    programId: number,
    updatedBy: string,
  ) {
    await this.prisma.$executeRawUnsafe(`SELECT GET_LOCK('sp_bulk_generate_entrance_roll', 15)`);
    try {
      const session = academicSessionId
        ? await this.prisma.academicSession.findFirst({
            where: { academicSessionId, IsDeleted: false },
          })
        : null;
      const program = await this.prisma.program.findFirst({
        where: { programId, IsDeleted: false },
      });
      if (!program) throw new NotFoundException('Program not found');
      if (program.programCategoryId !== programCategoryId) {
        throw new BadRequestException('Program does not belong to selected category');
      }

      const year = String(session?.startYear || new Date().getFullYear());
      const numericCode = String(program.programCode || '').match(/^\d+$/)
        ? Number(program.programCode)
        : program.programId;
      const prefix = `${year}686${this.pad2(numericCode)}`;

      // Prisma startsWith → LIKE binds utf8mb4_bin; column is utf8mb4_unicode_ci (MySQL 1267).
      const existing = await this.prisma.student.findMany({
        where: {
          IsDeleted: false,
          NOT: { entranceRollnumber: null },
        },
        select: { entranceRollnumber: true },
      });
      let maxSerial = 0;
      for (const row of existing) {
        const raw = String(row.entranceRollnumber || '');
        if (!raw.startsWith(prefix) || raw.length !== prefix.length + 3) continue;
        const n = Number(raw.slice(-3));
        if (Number.isFinite(n) && n > maxSerial) maxSerial = n;
      }

      const candidates = await this.prisma.student.findMany({
        where: {
          IsDeleted: false,
          programId,
          program: { programCategoryId },
          ...(academicSessionId ? { academicSessionId } : {}),
        },
        select: { StudentRegistrationId: true, entranceRollnumber: true },
        orderBy: { StudentRegistrationId: 'asc' },
      });
      const pending = candidates.filter((s) => !String(s.entranceRollnumber || '').trim());
      const skipped = candidates.length - pending.length;

      let serial = maxSerial;
      for (const student of pending) {
        serial += 1;
        await this.prisma.student.update({
          where: { StudentRegistrationId: student.StudentRegistrationId },
          data: {
            entranceRollnumber: `${prefix}${this.pad3(serial)}`,
            UpdatedBy: updatedBy,
          },
        });
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

  async getAdmitCard(query: { entranceRollnumber?: string; studentId?: number }) {
    const roll = String(query.entranceRollnumber || '').trim();
    const studentId = query.studentId ? Number(query.studentId) : 0;
    if (!roll && !studentId) {
      throw new BadRequestException('entranceRollnumber or studentId is required');
    }

    const student = await this.prisma.student.findFirst({
      where: {
        IsDeleted: false,
        ...(roll ? { entranceRollnumber: roll } : { StudentRegistrationId: studentId }),
      },
      include: {
        program: { include: { programCategory: true } },
        academicSession: true,
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
    });
    if (!student) throw new NotFoundException('Student not found for entrance admit card');
    if (!student.entranceRollnumber) {
      throw new BadRequestException('Entrance roll number is not generated for this student. Run bulk generate first.');
    }

    const allPapers = student.programId
      ? await this.db().findMany({
          where: {
            IsDeleted: false,
            IsActive: true,
            programId: student.programId,
          },
          orderBy: [{ examDate: 'asc' }, { entranceExamId: 'asc' }],
        })
      : [];
    const sessionId = student.academicSessionId ? Number(student.academicSessionId) : 0;
    const sessionPapers = sessionId
      ? allPapers.filter((p: any) => Number(p.academicSessionId) === sessionId)
      : allPapers;
    const papers = sessionPapers.length ? sessionPapers : allPapers;

    const latestByType = (type: string) => {
      const hit = (student.studentAttachments || []).find(
        (a: any) => String(a.documentType || '').toUpperCase() === type,
      );
      return hit?.fileUrl || null;
    };

    const streamRaw = student.academicDetails?.[0]?.stream || '';
    const streamMap: Record<string, string> = {
      SCIENCE: 'Science',
      COMMERCE: 'Commerce',
      ARTS: 'Art',
      ART: 'Art',
    };
    const stream =
      streamMap[String(streamRaw).toUpperCase()] || streamRaw || 'Art/Science/Commerce';

    return {
      studentId: student.StudentRegistrationId,
      entranceRollnumber: student.entranceRollnumber,
      studentName: student.candidateName,
      fatherName: student.fatherName,
      motherName: student.studentProfile?.motherName || null,
      programId: student.programId,
      programName: student.program?.programShortName || student.program?.programName || '',
      programFullName: student.program?.programName || '',
      programShortName: student.program?.programShortName || '',
      programCategoryName:
        student.program?.programCategory?.pcShortName ||
        student.program?.programCategory?.programCategoryName ||
        '',
      academicSessionId: student.academicSessionId,
      academicSessionName: student.academicSession?.academicSessionName || '',
      stream,
      photoUrl: latestByType('PHOTO') || latestByType('CANDIDATE PHOTO'),
      signatureUrl: latestByType('SIGNATURE') || latestByType('SIGN'),
      examDate: papers[0]?.examDate || null,
      papers: papers.map((p: any) => ({
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
