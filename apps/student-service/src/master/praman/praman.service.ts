import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class PramanService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const pramanName = String(data.pramanName || '').trim();
    if (!pramanName) {
      throw new BadRequestException('pramanName is required');
    }

    const duplicate = await this.prisma.pramanMaster.findFirst({
      where: { pramanName, IsDeleted: false },
    });
    if (duplicate) {
      throw new ConflictException('Praman with this name already exists');
    }

    return this.prisma.pramanMaster.create({
      data: {
        pramanName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? Boolean(data.IsActive) : true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.prisma.pramanMaster.findMany({
      where: {
        IsDeleted: false,
        ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}),
      },
      orderBy: { pramanId: 'asc' },
    });
  }

  async findOne(pramanId: number) {
    const row = await this.prisma.pramanMaster.findFirst({
      where: { pramanId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Praman with ID ${pramanId} not found`);
    }
    return row;
  }

  async update(pramanId: number, data: any) {
    await this.findOne(pramanId);

    if (data.pramanName !== undefined) {
      const pramanName = String(data.pramanName || '').trim();
      const duplicate = await this.prisma.pramanMaster.findFirst({
        where: {
          pramanName,
          IsDeleted: false,
          NOT: { pramanId },
        },
      });
      if (duplicate) {
        throw new ConflictException('Praman with this name already exists');
      }
    }

    return this.prisma.pramanMaster.update({
      where: { pramanId },
      data: {
        pramanName:
          data.pramanName !== undefined
            ? String(data.pramanName).trim()
            : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async updateStatus(pramanId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(pramanId);
    return this.prisma.pramanMaster.update({
      where: { pramanId },
      data: { IsActive, UpdatedBy },
    });
  }

  async softDelete(pramanId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(pramanId);
    return this.prisma.pramanMaster.update({
      where: { pramanId },
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
    const result = await this.prisma.pramanMaster.updateMany({
      where: {
        pramanId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} praman(s)`,
      count: result.count,
    };
  }
}
