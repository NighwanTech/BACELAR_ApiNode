import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class ProgramCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.programCategory.create({
      data: {
        programCategoryName: data.programCategoryName,
        pcShortName: data.pcShortName,
        sequenceNo: data.sequenceNo,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return this.prisma.programCategory.findMany({
      where: { IsDeleted: false },
      orderBy: { sequenceNo: 'asc' },
    });
  }

  async findOne(programCategoryId: number) {
    const pc = await this.prisma.programCategory.findFirst({
      where: { programCategoryId, IsDeleted: false },
    });
    if (!pc) {
      throw new NotFoundException(`Program Category with ID ${programCategoryId} not found`);
    }
    return pc;
  }

  async update(programCategoryId: number, data: any) {
    await this.findOne(programCategoryId);

    return this.prisma.programCategory.update({
      where: { programCategoryId },
      data: {
        programCategoryName: data.programCategoryName,
        pcShortName: data.pcShortName,
        sequenceNo: data.sequenceNo,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async softDelete(programCategoryId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(programCategoryId);

    return this.prisma.programCategory.update({
      where: { programCategoryId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }
}
