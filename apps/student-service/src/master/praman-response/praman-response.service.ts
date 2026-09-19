import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class PramanResponseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const pramanResponseName = String(data.pramanResponseName || '').trim();
    if (!pramanResponseName) {
      throw new BadRequestException('pramanResponseName is required');
    }

    const duplicate = await this.prisma.pramanResponseMaster.findFirst({
      where: { pramanResponseName, IsDeleted: false },
    });
    if (duplicate) {
      throw new ConflictException('Praman response with this name already exists');
    }

    return this.prisma.pramanResponseMaster.create({
      data: {
        pramanResponseName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? Boolean(data.IsActive) : true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.prisma.pramanResponseMaster.findMany({
      where: {
        IsDeleted: false,
        ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}),
      },
      orderBy: { pramanResponseId: 'asc' },
    });
  }

  async findOne(pramanResponseId: number) {
    const row = await this.prisma.pramanResponseMaster.findFirst({
      where: { pramanResponseId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Praman response with ID ${pramanResponseId} not found`);
    }
    return row;
  }

  async update(pramanResponseId: number, data: any) {
    await this.findOne(pramanResponseId);

    if (data.pramanResponseName !== undefined) {
      const pramanResponseName = String(data.pramanResponseName || '').trim();
      const duplicate = await this.prisma.pramanResponseMaster.findFirst({
        where: {
          pramanResponseName,
          IsDeleted: false,
          NOT: { pramanResponseId },
        },
      });
      if (duplicate) {
        throw new ConflictException('Praman response with this name already exists');
      }
    }

    return this.prisma.pramanResponseMaster.update({
      where: { pramanResponseId },
      data: {
        pramanResponseName:
          data.pramanResponseName !== undefined
            ? String(data.pramanResponseName).trim()
            : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive !== undefined ? Boolean(data.IsActive) : undefined,
        Remarks: data.Remarks,
      },
    });
  }

  async updateStatus(pramanResponseId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(pramanResponseId);
    return this.prisma.pramanResponseMaster.update({
      where: { pramanResponseId },
      data: { IsActive, UpdatedBy },
    });
  }

  async softDelete(pramanResponseId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(pramanResponseId);
    return this.prisma.pramanResponseMaster.update({
      where: { pramanResponseId },
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
    const result = await this.prisma.pramanResponseMaster.updateMany({
      where: {
        pramanResponseId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} praman response(s)`,
      count: result.count,
    };
  }
}
