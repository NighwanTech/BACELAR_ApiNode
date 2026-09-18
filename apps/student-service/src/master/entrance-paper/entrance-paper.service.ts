import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class EntrancePaperService {
  constructor(private readonly prisma: PrismaService) {}

  private db() {
    return (this.prisma as any).entrancePaperMaster;
  }

  async create(data: any) {
    const entrancePaperName = String(data.entrancePaperName || '').trim();
    if (!entrancePaperName) {
      throw new BadRequestException('entrancePaperName is required');
    }
    const existing = await this.db().findFirst({
      where: { entrancePaperName, IsDeleted: false },
    });
    if (existing) {
      throw new ConflictException('Entrance paper name already exists');
    }
    return this.db().create({
      data: {
        entrancePaperName,
        CreatedBy: data.CreatedBy || 'Admin User',
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? Boolean(data.IsActive) : true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.db().findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: { entrancePaperId: 'asc' },
    });
  }

  async findOne(entrancePaperId: number) {
    const row = await this.db().findFirst({
      where: { entrancePaperId, IsDeleted: false },
    });
    if (!row) throw new NotFoundException('Entrance paper not found');
    return row;
  }

  async update(entrancePaperId: number, data: any) {
    await this.findOne(entrancePaperId);
    if (data.entrancePaperName) {
      const name = String(data.entrancePaperName).trim();
      const dup = await this.db().findFirst({
        where: { entrancePaperName: name, IsDeleted: false, NOT: { entrancePaperId } },
      });
      if (dup) throw new ConflictException('Entrance paper name already exists');
    }
    return this.db().update({
      where: { entrancePaperId },
      data: {
        ...(data.entrancePaperName !== undefined
          ? { entrancePaperName: String(data.entrancePaperName).trim() }
          : {}),
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async updateStatus(entrancePaperId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(entrancePaperId);
    return this.db().update({
      where: { entrancePaperId },
      data: { IsActive, UpdatedBy },
    });
  }

  async softDelete(entrancePaperId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(entrancePaperId);
    return this.db().update({
      where: { entrancePaperId },
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
    const result = await this.db().updateMany({
      where: { entrancePaperId: { in: ids }, IsDeleted: false },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
    return { message: `Successfully soft-deleted ${result.count} entrance paper(s)`, count: result.count };
  }
}
