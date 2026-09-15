import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class MonthService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const monthName = String(data.monthName || '').trim();
    if (!monthName) {
      throw new BadRequestException('monthName is required');
    }

    const monthShortCode = String(data.monthShortCode || '').trim();
    if (!monthShortCode) {
      throw new BadRequestException('monthShortCode is required');
    }

    const duplicateName = await this.prisma.monthMaster.findFirst({
      where: { monthName, IsDeleted: false },
    });
    if (duplicateName) {
      throw new ConflictException('Month with this name already exists');
    }

    const duplicateCode = await this.prisma.monthMaster.findFirst({
      where: { monthShortCode, IsDeleted: false },
    });
    if (duplicateCode) {
      throw new ConflictException('Month with this short code already exists');
    }

    return this.prisma.monthMaster.create({
      data: {
        monthName,
        monthShortCode,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? Boolean(data.IsActive) : true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.prisma.monthMaster.findMany({
      where: {
        IsDeleted: false,
        ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}),
      },
      orderBy: { monthId: 'asc' },
    });
  }

  async findOne(monthId: number) {
    const row = await this.prisma.monthMaster.findFirst({
      where: { monthId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Month with ID ${monthId} not found`);
    }
    return row;
  }

  async update(monthId: number, data: any) {
    await this.findOne(monthId);

    if (data.monthName !== undefined) {
      const monthName = String(data.monthName || '').trim();
      const duplicate = await this.prisma.monthMaster.findFirst({
        where: {
          monthName,
          IsDeleted: false,
          NOT: { monthId },
        },
      });
      if (duplicate) {
        throw new ConflictException('Month with this name already exists');
      }
    }

    if (data.monthShortCode !== undefined) {
      const monthShortCode = String(data.monthShortCode || '').trim();
      const duplicate = await this.prisma.monthMaster.findFirst({
        where: {
          monthShortCode,
          IsDeleted: false,
          NOT: { monthId },
        },
      });
      if (duplicate) {
        throw new ConflictException('Month with this short code already exists');
      }
    }

    return this.prisma.monthMaster.update({
      where: { monthId },
      data: {
        monthName:
          data.monthName !== undefined
            ? String(data.monthName).trim()
            : undefined,
        monthShortCode:
          data.monthShortCode !== undefined
            ? String(data.monthShortCode).trim()
            : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async updateStatus(monthId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(monthId);
    return this.prisma.monthMaster.update({
      where: { monthId },
      data: { IsActive, UpdatedBy },
    });
  }

  async softDelete(monthId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(monthId);
    return this.prisma.monthMaster.update({
      where: { monthId },
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
    const result = await this.prisma.monthMaster.updateMany({
      where: {
        monthId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} month(s)`,
      count: result.count,
    };
  }
}
