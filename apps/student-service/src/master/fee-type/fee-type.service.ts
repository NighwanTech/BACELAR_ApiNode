import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

/** Master CRUD for feeTypeMaster */
@Injectable()
export class FeeTypeService {
  constructor(private readonly prisma: PrismaService) {}

  private get feeTypeDb() {
    return (this.prisma as any).feeTypeMaster;
  }

  async create(data: any) {
    return this.feeTypeDb.create({
      data: {
        feeTypeName: data.feeTypeName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.feeTypeDb.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: { feeTypeName: 'asc' },
    });
  }

  async findOne(feeTypeId: number) {
    const feeType = await this.feeTypeDb.findFirst({
      where: { feeTypeId, IsDeleted: false },
    });
    if (!feeType) {
      throw new NotFoundException(`Fee type with ID ${feeTypeId} not found`);
    }
    return feeType;
  }

  async update(feeTypeId: number, data: any) {
    await this.findOne(feeTypeId);

    return this.feeTypeDb.update({
      where: { feeTypeId },
      data: {
        feeTypeName: data.feeTypeName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async updateStatus(feeTypeId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(feeTypeId);
    return this.feeTypeDb.update({
      where: { feeTypeId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(feeTypeId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(feeTypeId);

    return this.feeTypeDb.update({
      where: { feeTypeId },
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
    const result = await this.feeTypeDb.updateMany({
      where: {
        feeTypeId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} fee type(s)`,
      count: result.count,
    };
  }
}
