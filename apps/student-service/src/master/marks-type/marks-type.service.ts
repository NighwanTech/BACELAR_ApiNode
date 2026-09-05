import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class MarksTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const existingName = await this.prisma.marksTypeMaster.findFirst({
      where: { marksTypeName: data.marksTypeName, IsDeleted: false },
    });
    if (existingName) {
      throw new ConflictException('Marks type name already exists');
    }

    return this.prisma.marksTypeMaster.create({
      data: {
        marksTypeName: data.marksTypeName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.prisma.marksTypeMaster.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: { marksTypeName: 'asc' },
    });
  }

  async findOne(marksTypeId: number) {
    const marksType = await this.prisma.marksTypeMaster.findFirst({
      where: { marksTypeId, IsDeleted: false },
    });
    if (!marksType) {
      throw new NotFoundException(`Marks type with ID ${marksTypeId} not found`);
    }
    return marksType;
  }

  async update(marksTypeId: number, data: any) {
    await this.findOne(marksTypeId);

    if (data.marksTypeName) {
      const existingName = await this.prisma.marksTypeMaster.findFirst({
        where: {
          marksTypeName: data.marksTypeName,
          IsDeleted: false,
          NOT: { marksTypeId },
        },
      });
      if (existingName) {
        throw new ConflictException('Marks type name already exists');
      }
    }

    return this.prisma.marksTypeMaster.update({
      where: { marksTypeId },
      data: {
        marksTypeName: data.marksTypeName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async softDelete(marksTypeId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(marksTypeId);

    return this.prisma.marksTypeMaster.update({
      where: { marksTypeId },
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
