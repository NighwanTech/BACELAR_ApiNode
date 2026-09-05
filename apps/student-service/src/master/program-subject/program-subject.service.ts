import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class ProgramSubjectService {
  constructor(private readonly prisma: PrismaService) {}

  private getIncludeRelations() {
    return {
      program: true,
      programCategory: true,
    };
  }

  private async resolveProgramFields(
    programId: number,
    programCategoryId?: number,
  ) {
    const program = await this.prisma.program.findFirst({
      where: { programId, IsDeleted: false },
      include: { programCategory: true },
    });
    if (!program) {
      throw new NotFoundException(`Program with ID ${programId} not found`);
    }

    if (
      programCategoryId !== undefined &&
      programCategoryId !== null &&
      Number(programCategoryId) !== program.programCategoryId
    ) {
      throw new BadRequestException(
        'Program does not belong to the selected program category',
      );
    }

    return {
      programId: program.programId,
      programName: program.programName,
      programCategoryId: program.programCategoryId,
      programCategoryName: program.programCategory?.programCategoryName || null,
    };
  }

  async create(data: any) {
    const resolved = await this.resolveProgramFields(
      Number(data.programId),
      data.programCategoryId !== undefined && data.programCategoryId !== null && data.programCategoryId !== ''
        ? Number(data.programCategoryId)
        : undefined,
    );

    const programSubjectName = String(data.programSubjectName || '').trim();
    const existing = await this.prisma.programSubjectMaster.findFirst({
      where: {
        programId: resolved.programId,
        programSubjectName,
        IsDeleted: false,
      },
    });
    if (existing) {
      throw new ConflictException(
        'Program subject name already exists for this program',
      );
    }

    return this.mapRow(
      await this.prisma.programSubjectMaster.create({
        data: {
          programId: resolved.programId,
          programName: data.programName || resolved.programName,
          programCategoryId: resolved.programCategoryId,
          programCategoryName:
            data.programCategoryName || resolved.programCategoryName,
          programSubjectName,
          CreatedBy: data.CreatedBy,
          Remarks: data.Remarks || null,
          IsActive: true,
          IsDeleted: false,
        },
        include: this.getIncludeRelations(),
      }),
    );
  }

  private mapRow(row: any) {
    return {
      ...row,
      programId: row.programId,
      programName: row.programName || row.program?.programName || null,
      programCategoryId:
        row.programCategoryId ?? row.program?.programCategoryId ?? null,
      programCategoryName:
        row.programCategoryName ||
        row.programCategory?.programCategoryName ||
        row.program?.programCategory?.programCategoryName ||
        null,
    };
  }

  async findAll(programId?: number, activeOnly = false) {
    const rows = await this.prisma.programSubjectMaster.findMany({
      where: {
        IsDeleted: false,
        ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}),
        ...(programId ? { programId: Number(programId) } : {}),
      },
      include: this.getIncludeRelations(),
      orderBy: [{ programId: 'asc' }, { programSubjectName: 'asc' }],
    });
    return rows.map((row) => this.mapRow(row));
  }

  async findOne(programSubjectId: number) {
    const programSubject = await this.prisma.programSubjectMaster.findFirst({
      where: { programSubjectId, IsDeleted: false },
      include: this.getIncludeRelations(),
    });
    if (!programSubject) {
      throw new NotFoundException(
        `Program subject with ID ${programSubjectId} not found`,
      );
    }
    return this.mapRow(programSubject);
  }

  async update(programSubjectId: number, data: any) {
    const current = await this.findOne(programSubjectId);
    const programId =
      data.programId !== undefined ? Number(data.programId) : current.programId;
    const programSubjectName =
      data.programSubjectName !== undefined
        ? String(data.programSubjectName).trim()
        : current.programSubjectName;

    const categoryIdForCheck =
      data.programCategoryId !== undefined &&
      data.programCategoryId !== null &&
      data.programCategoryId !== ''
        ? Number(data.programCategoryId)
        : data.programId !== undefined
          ? undefined
          : current.programCategoryId ?? undefined;

    const resolved = await this.resolveProgramFields(
      programId,
      categoryIdForCheck,
    );

    const existing = await this.prisma.programSubjectMaster.findFirst({
      where: {
        programId: resolved.programId,
        programSubjectName,
        IsDeleted: false,
        NOT: { programSubjectId },
      },
    });
    if (existing) {
      throw new ConflictException(
        'Program subject name already exists for this program',
      );
    }

    return this.mapRow(
      await this.prisma.programSubjectMaster.update({
        where: { programSubjectId },
        data: {
          programId: resolved.programId,
          programName:
            data.programName !== undefined
              ? data.programName
              : resolved.programName,
          programCategoryId: resolved.programCategoryId,
          programCategoryName:
            data.programCategoryName !== undefined
              ? data.programCategoryName
              : resolved.programCategoryName,
          programSubjectName:
            data.programSubjectName !== undefined ? programSubjectName : undefined,
          UpdatedBy: data.UpdatedBy,
          IsActive: data.IsActive,
          Remarks: data.Remarks,
        },
        include: this.getIncludeRelations(),
      }),
    );
  }

  async updateStatus(
    programSubjectId: number,
    IsActive: boolean,
    UpdatedBy: string,
  ) {
    await this.findOne(programSubjectId);
    return this.prisma.programSubjectMaster.update({
      where: { programSubjectId },
      data: {
        IsActive,
        UpdatedBy,
      },
      include: this.getIncludeRelations(),
    });
  }

  async softDelete(
    programSubjectId: number,
    DeletedBy: string,
    DeletedRemarks?: string,
  ) {
    await this.findOne(programSubjectId);

    return this.prisma.programSubjectMaster.update({
      where: { programSubjectId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }
}
