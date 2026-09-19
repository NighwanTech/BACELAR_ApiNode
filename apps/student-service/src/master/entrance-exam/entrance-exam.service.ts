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
    rollNumberSequence?: string | null;
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
    const prefix = await this.buildRollNumberSequence(data.academicSessionId, data.programId);
    return {
      academicSessionName: session.academicSessionName,
      programCategoryName: category.programCategoryName,
      programName: program.programName,
      entrancePaperName: paper.entrancePaperName,
      rollNumberSequence: `${prefix}${this.serialFromSequence(data.rollNumberSequence)}`,
    };
  }

  private serialFromSequence(raw?: string | null) {
    const digits = String(raw || '').replace(/\D/g, '');
    if (digits.length >= 3) {
      const n = Number(digits.slice(-3));
      if (Number.isFinite(n) && n >= 1) return this.pad3(n);
    }
    return '001';
  }

  private parseRollSequence(stored: string, fallbackPrefix: string) {
    const digits = String(stored || '').replace(/\D/g, '');
    if (digits.length >= 12) {
      const startSerial = Number(digits.slice(-3));
      return {
        prefix: digits.slice(0, -3),
        startSerial: Number.isFinite(startSerial) && startSerial >= 1 ? startSerial : 1,
      };
    }
    if (digits.length >= 9) {
      return { prefix: digits, startSerial: 1 };
    }
    return { prefix: fallbackPrefix, startSerial: 1 };
  }

  private normalizeCollegeCode(code?: string | null) {
    const digits = String(code || '').replace(/\D/g, '');
    if (!digits) return '686';
    if (digits.length >= 3) return digits.slice(0, 3);
    return digits.padStart(3, '0');
  }

  private normalizeProgramCode(code?: string | null, fallbackId?: number) {
    const digits = String(code || '').replace(/\D/g, '');
    if (digits) return digits.length >= 2 ? digits.slice(-2) : digits.padStart(2, '0');
    if (fallbackId) return this.pad2(Number(fallbackId));
    return '01';
  }

  private async buildRollNumberSequence(academicSessionId: number, programId: number) {
    const session = await this.prisma.academicSession.findFirst({
      where: { academicSessionId, IsDeleted: false },
      include: { college: { select: { collegeCode: true } } },
    });
    const program = await this.prisma.program.findFirst({
      where: { programId, IsDeleted: false },
    });
    if (!session) throw new NotFoundException('Academic session not found');
    if (!program) throw new NotFoundException('Program not found');
    const yearMatch = String(session.academicSessionName || '').match(/(20\d{2})/);
    const year = yearMatch?.[1] || String(session.startYear || new Date().getFullYear());
    const collegeCode = this.normalizeCollegeCode((session as any).college?.collegeCode);
    const programCode = this.normalizeProgramCode(program.programCode, program.programId);
    return `${year}${collegeCode}${programCode}`;
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
      rollNumberSequence: data.rollNumberSequence,
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
      rollNumberSequence: data.rollNumberSequence,
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
      include: { entrancePaper: true },
      orderBy: [{ examDate: 'asc' }, { entranceExamId: 'asc' }],
    });
  }

  private paperMasterLimits(mapped: any) {
    const src = mapped?.entrancePaper || {};
    const maxRaw = src.maxMarks ?? mapped?.maxMarks;
    const minRaw = src.minMarks ?? mapped?.minMarks;
    const maxMarks = maxRaw === '' || maxRaw == null ? null : Number(maxRaw);
    const minMarks = minRaw === '' || minRaw == null ? null : Number(minRaw);
    return {
      maxMarks: Number.isFinite(maxMarks) ? maxMarks : null,
      minMarks: Number.isFinite(minMarks) ? minMarks : null,
    };
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
    return obtained >= minMarks ? 'QUALIFY' : 'NOT QUALIFY';
  }

  private async deleteUnmarkedPapers(entranceStudentIds: number[]) {
    if (!entranceStudentIds.length) return;
    await this.studentPaperDb().deleteMany({
      where: {
        entranceStudentId: { in: entranceStudentIds },
        obtainedMarks: null,
      },
    });
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

      const storedSequence = String(
        papers.find((p: any) => p.rollNumberSequence)?.rollNumberSequence || '',
      );
      const fallbackPrefix = await this.buildRollNumberSequence(academicSessionId, programId);
      const { prefix, startSerial } = this.parseRollSequence(storedSequence, fallbackPrefix);

      const existingRolls = await this.studentDb().findMany({
        where: { IsDeleted: false },
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
      let serial = Math.max(maxSerial, startSerial - 1);

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
      }

      const existingRows = await this.studentDb().findMany({
        where: { IsDeleted: false, academicSessionId, programId },
        select: { entranceStudentId: true },
      });
      await this.deleteUnmarkedPapers(existingRows.map((r: any) => Number(r.entranceStudentId)));

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

    await this.deleteUnmarkedPapers(rows.map((r: any) => Number(r.entranceStudentId)));

    return {
      papers: papers.map((p: any) => ({
        entranceExamId: p.entranceExamId,
        entrancePaperId: p.entrancePaperId,
        entrancePaperName: p.entrancePaperName,
        examDate: p.examDate,
        fromTime: p.fromTime,
        toTime: p.toTime,
      })),
      students: rows.map((row: any) => {
        const savedByPaper = new Map<number, any>(
          (row.papers || [])
            .filter((p: any) => p.obtainedMarks != null)
            .map((p: any) => [Number(p.entrancePaperId), p]),
        );
        return {
          entranceStudentId: row.entranceStudentId,
          studentId: row.studentId,
          entranceRollnumber: row.entranceRollnumber,
          registrationNo: row.registrationNo,
          candidateName: row.candidateName,
          fatherName: row.fatherName,
          motherName: row.motherName,
          stream: row.stream,
          papers: papers.map((paper: any) => {
            const saved = savedByPaper.get(Number(paper.entrancePaperId));
            const limits = this.paperMasterLimits(paper);
            return {
              entranceStudentPaperId: saved?.entranceStudentPaperId,
              entranceExamId: paper.entranceExamId,
              entrancePaperId: paper.entrancePaperId,
              entrancePaperName: paper.entrancePaperName,
              examDate: paper.examDate,
              fromTime: paper.fromTime,
              toTime: paper.toTime,
              maxMarks: limits.maxMarks ?? saved?.maxMarks ?? null,
              minMarks: limits.minMarks ?? saved?.minMarks ?? null,
              obtainedMarks: saved?.obtainedMarks ?? null,
              attendanceStatus: saved?.attendanceStatus ?? null,
              result: saved?.result ?? null,
            };
          }),
        };
      }),
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

    const mappedPapers = await this.mappedPapers(academicSessionId, programId);
    const mappedById = new Map<number, any>(
      mappedPapers.map((p: any) => [Number(p.entrancePaperId), p]),
    );

    let updated = 0;
    let filledCount = 0;
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
        if (raw === '' || raw == null || raw === undefined || String(raw).trim() === '') {
          continue;
        }
        filledCount += 1;
        const obtained = Number(raw);
        if (!Number.isFinite(obtained)) {
          throw new BadRequestException('Marks must be a number');
        }
        if (obtained < 0) {
          throw new BadRequestException('Marks cannot be negative');
        }
        const mapped = mappedById.get(paperId);
        if (!mapped) {
          throw new BadRequestException('Paper is not mapped for this program and session');
        }
        const limits = this.paperMasterLimits(mapped);
        if (limits.maxMarks == null || limits.minMarks == null) {
          throw new BadRequestException(
            `Set max and min marks for ${mapped.entrancePaperName || 'this paper'} in Entrance Paper Master first`,
          );
        }
        const maxMarks = limits.maxMarks;
        const minMarks = limits.minMarks;
        const existing = await this.studentPaperDb().findFirst({
          where: {
            entranceStudentId,
            ...(paperRowId ? { entranceStudentPaperId: paperRowId } : { entrancePaperId: paperId }),
          },
        });
        if (obtained > maxMarks) {
          throw new BadRequestException(
            `Marks for ${existing?.entrancePaperName || mapped.entrancePaperName || 'paper'} cannot be more than ${maxMarks}`,
          );
        }
        const attendanceStatus = paper.attendanceStatus
          ? String(paper.attendanceStatus).trim() || null
          : existing?.attendanceStatus ?? null;
        const result = this.paperResult(obtained, minMarks);
        if (existing) {
          await this.studentPaperDb().update({
            where: { entranceStudentPaperId: existing.entranceStudentPaperId },
            data: {
              obtainedMarks: obtained,
              maxMarks,
              minMarks,
              attendanceStatus,
              result,
              IsDeleted: false,
              IsActive: true,
              UpdatedBy: updatedBy,
            },
          });
        } else {
          await this.studentPaperDb().create({
            data: {
              entranceStudentId,
              studentId: row.studentId,
              entranceExamId: mapped.entranceExamId,
              entrancePaperId: paperId,
              entrancePaperName: mapped.entrancePaperName,
              examDate: mapped.examDate,
              fromTime: mapped.fromTime,
              toTime: mapped.toTime,
              maxMarks,
              minMarks,
              obtainedMarks: obtained,
              attendanceStatus,
              result,
              CreatedBy: updatedBy,
              IsDeleted: false,
              IsActive: true,
            },
          });
        }
        updated += 1;
      }
    }

    if (!filledCount) {
      throw new BadRequestException('Fill at least one mark to save');
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
    });
    if (!row) {
      throw new NotFoundException('Entrance roll number is not generated for this student. Run bulk generate first.');
    }

    const papers = await this.mappedPapers(row.academicSessionId, row.programId);

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
      examDate: papers?.[0]?.examDate || null,
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
