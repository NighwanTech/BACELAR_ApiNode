import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class PramanSubParameterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const pramanId = Number(data.pramanId);
    if (!pramanId || isNaN(pramanId)) {
      throw new BadRequestException('Valid pramanId is required');
    }

    const praman = await this.prisma.pramanMaster.findFirst({
      where: { pramanId, IsDeleted: false },
    });
    if (!praman) {
      throw new NotFoundException(`Praman with ID ${pramanId} not found`);
    }

    const subPramanParameterName = String(data.subPramanParameterName || '').trim();
    if (!subPramanParameterName) {
      throw new BadRequestException('subPramanParameterName is required');
    }

    const pramanName = data.pramanName ? String(data.pramanName).trim() : praman.pramanName;

    const duplicate = await this.prisma.pramanSubParameterMaster.findFirst({
      where: {
        pramanId,
        subPramanParameterName,
        IsDeleted: false,
      },
    });
    if (duplicate) {
      throw new ConflictException('Sub praman parameter with this name already exists for this praman');
    }

    return this.prisma.pramanSubParameterMaster.create({
      data: {
        pramanId,
        pramanName,
        subPramanParameterName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? Boolean(data.IsActive) : true,
        IsDeleted: false,
      },
      include: {
        praman: true,
      },
    });
  }

  async findAll(activeOnly = false, pramanId?: number) {
    return this.prisma.pramanSubParameterMaster.findMany({
      where: {
        IsDeleted: false,
        ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}),
        ...(pramanId ? { pramanId } : {}),
      },
      include: {
        praman: true,
      },
      orderBy: { subPramanParameterId: 'asc' },
    });
  }

  async findOne(subPramanParameterId: number) {
    const row = await this.prisma.pramanSubParameterMaster.findFirst({
      where: { subPramanParameterId, IsDeleted: false },
      include: {
        praman: true,
      },
    });
    if (!row) {
      throw new NotFoundException(`Sub praman parameter with ID ${subPramanParameterId} not found`);
    }
    return row;
  }

  async update(subPramanParameterId: number, data: any) {
    const existing = await this.findOne(subPramanParameterId);

    let pramanId = existing.pramanId;
    let pramanName = existing.pramanName;

    if (data.pramanId !== undefined) {
      pramanId = Number(data.pramanId);
      const praman = await this.prisma.pramanMaster.findFirst({
        where: { pramanId, IsDeleted: false },
      });
      if (!praman) {
        throw new NotFoundException(`Praman with ID ${pramanId} not found`);
      }
      pramanName = praman.pramanName;
    }

    if (data.pramanName !== undefined && data.pramanName !== null) {
      pramanName = String(data.pramanName).trim();
    }

    if (data.subPramanParameterName !== undefined) {
      const subPramanParameterName = String(data.subPramanParameterName || '').trim();
      const duplicate = await this.prisma.pramanSubParameterMaster.findFirst({
        where: {
          pramanId,
          subPramanParameterName,
          IsDeleted: false,
          NOT: { subPramanParameterId },
        },
      });
      if (duplicate) {
        throw new ConflictException('Sub praman parameter with this name already exists for this praman');
      }
    }

    return this.prisma.pramanSubParameterMaster.update({
      where: { subPramanParameterId },
      data: {
        pramanId,
        pramanName,
        subPramanParameterName:
          data.subPramanParameterName !== undefined
            ? String(data.subPramanParameterName).trim()
            : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
      include: {
        praman: true,
      },
    });
  }

  async updateStatus(subPramanParameterId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(subPramanParameterId);
    return this.prisma.pramanSubParameterMaster.update({
      where: { subPramanParameterId },
      data: { IsActive, UpdatedBy },
      include: {
        praman: true,
      },
    });
  }

  async softDelete(subPramanParameterId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(subPramanParameterId);
    return this.prisma.pramanSubParameterMaster.update({
      where: { subPramanParameterId },
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
    const result = await this.prisma.pramanSubParameterMaster.updateMany({
      where: {
        subPramanParameterId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} sub praman parameter(s)`,
      count: result.count,
    };
  }
}
