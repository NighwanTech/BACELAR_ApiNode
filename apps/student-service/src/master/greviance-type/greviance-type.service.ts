import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class GrevianceTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const grevianceTypeName = String(data.grevianceTypeName || '').trim();
    if (!grevianceTypeName) {
      throw new BadRequestException('grevianceTypeName is required');
    }

    const duplicate = await this.prisma.grevianceTypeMaster.findFirst({
      where: { grevianceTypeName, IsDeleted: false },
    });
    if (duplicate) {
      throw new ConflictException('Greviance type already exists with this name');
    }

    return this.prisma.grevianceTypeMaster.create({
      data: {
        grevianceTypeName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.prisma.grevianceTypeMaster.findMany({
      where: {
        IsDeleted: false,
        ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}),
      },
      orderBy: { grevianceTypeName: 'asc' },
    });
  }

  async findOne(grevianceTypeId: number) {
    const row = await this.prisma.grevianceTypeMaster.findFirst({
      where: { grevianceTypeId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Greviance type with ID ${grevianceTypeId} not found`);
    }
    return row;
  }

  async update(grevianceTypeId: number, data: any) {
    await this.findOne(grevianceTypeId);

    if (data.grevianceTypeName !== undefined) {
      const grevianceTypeName = String(data.grevianceTypeName || '').trim();
      const duplicate = await this.prisma.grevianceTypeMaster.findFirst({
        where: {
          grevianceTypeName,
          IsDeleted: false,
          NOT: { grevianceTypeId },
        },
      });
      if (duplicate) {
        throw new ConflictException('Greviance type already exists with this name');
      }
    }

    return this.prisma.grevianceTypeMaster.update({
      where: { grevianceTypeId },
      data: {
        grevianceTypeName:
          data.grevianceTypeName !== undefined
            ? String(data.grevianceTypeName).trim()
            : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async updateStatus(grevianceTypeId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(grevianceTypeId);
    return this.prisma.grevianceTypeMaster.update({
      where: { grevianceTypeId },
      data: { IsActive, UpdatedBy },
    });
  }

  async softDelete(grevianceTypeId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(grevianceTypeId);
    return this.prisma.grevianceTypeMaster.update({
      where: { grevianceTypeId },
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
    const result = await this.prisma.grevianceTypeMaster.updateMany({
      where: {
        grevianceTypeId: { in: ids },
        IsDeleted: false,
      },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });

    return {
      message: `Successfully soft-deleted ${result.count} greviance type(s)`,
      count: result.count,
    };
  }
}
