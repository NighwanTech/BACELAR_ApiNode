import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class ProgramService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.program.create({
      data: {
        programCategoryId: Number(data.programCategoryId),
        programName: data.programName,
        programShortName: data.programShortName,
        programCode: data.programCode,
        durationYears: Number(data.durationYears),
        termType: data.termType,
        totalTerms: Number(data.totalTerms),
        sequenceNo: Number(data.sequenceNo),
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(categoryId?: number, activeOnly = false) {
    const whereClause: any = {
      IsDeleted: false,
      ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}),
    };
    if (categoryId) {
      whereClause.programCategoryId = categoryId;
    }
    return this.prisma.program.findMany({
      where: whereClause,
      include: {
        programCategory: true,
      },
      orderBy: { sequenceNo: 'asc' },
    });
  }

  async findOne(programId: number) {
    const program = await this.prisma.program.findFirst({
      where: { programId, IsDeleted: false },
      include: {
        programCategory: true,
      },
    });
    if (!program) {
      throw new NotFoundException(`Program with ID ${programId} not found`);
    }
    return program;
  }

  async update(programId: number, data: any) {
    await this.findOne(programId);

    return this.prisma.program.update({
      where: { programId },
      data: {
        programCategoryId: data.programCategoryId !== undefined ? Number(data.programCategoryId) : undefined,
        programName: data.programName,
        programShortName: data.programShortName,
        programCode: data.programCode,
        durationYears: data.durationYears !== undefined ? Number(data.durationYears) : undefined,
        termType: data.termType,
        totalTerms: data.totalTerms !== undefined ? Number(data.totalTerms) : undefined,
        sequenceNo: data.sequenceNo !== undefined ? Number(data.sequenceNo) : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  
  async updateStatus(programId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(programId);
    return this.prisma.program.update({
      where: { programId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(programId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(programId);

    return this.prisma.program.update({
      where: { programId },
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
    const result = await this.prisma.program.updateMany({
      where: {
        programId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} program(s)`,
      count: result.count,
    };
  }
}
