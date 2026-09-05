import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class PaperTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const existingName = await this.prisma.paperTypeMaster.findFirst({
      where: { name: data.name, IsDeleted: false },
    });
    if (existingName) {
      throw new ConflictException('Paper type name already exists');
    }

    return this.prisma.paperTypeMaster.create({
      data: {
        name: data.name,
        description: data.description || null,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.prisma.paperTypeMaster.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(paperTypeId: number) {
    const paperType = await this.prisma.paperTypeMaster.findFirst({
      where: { paperTypeId, IsDeleted: false },
    });
    if (!paperType) {
      throw new NotFoundException(`Paper type with ID ${paperTypeId} not found`);
    }
    return paperType;
  }

  async update(paperTypeId: number, data: any) {
    await this.findOne(paperTypeId);

    if (data.name) {
      const existingName = await this.prisma.paperTypeMaster.findFirst({
        where: {
          name: data.name,
          IsDeleted: false,
          NOT: { paperTypeId },
        },
      });
      if (existingName) {
        throw new ConflictException('Paper type name already exists');
      }
    }

    return this.prisma.paperTypeMaster.update({
      where: { paperTypeId },
      data: {
        name: data.name,
        description: data.description,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async softDelete(paperTypeId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(paperTypeId);

    return this.prisma.paperTypeMaster.update({
      where: { paperTypeId },
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
