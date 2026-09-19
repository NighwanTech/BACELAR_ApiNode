import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class EntrancePaperService {
  constructor(private readonly prisma: PrismaService) {}

  private db() {
    return (this.prisma as any).entrancePaperMaster;
  }

  private parseMarks(value: any, label: string) {
    if (value === '' || value == null || value === undefined) {
      throw new BadRequestException(`${label} is required`);
    }
    const n = Number(value);
    if (!Number.isFinite(n) || n < 0) {
      throw new BadRequestException(`${label} must be a valid number`);
    }
    return n;
  }

  private parseLimits(data: any) {
    const maxMarks = this.parseMarks(data.maxMarks, 'Max marks');
    const minMarks = this.parseMarks(data.minMarks, 'Min marks');
    if (minMarks > maxMarks) {
      throw new BadRequestException('Min marks cannot be greater than max marks');
    }
    return { maxMarks, minMarks };
  }

  async create(data: any) {
    const entrancePaperName = String(data.entrancePaperName || '').trim();
    if (!entrancePaperName) {
      throw new BadRequestException('entrancePaperName is required');
    }
    const { maxMarks, minMarks } = this.parseLimits(data);
    const existing = await this.db().findFirst({
      where: { entrancePaperName, IsDeleted: false },
    });
    if (existing) {
      throw new ConflictException('Entrance paper name already exists');
    }
    return this.db().create({
      data: {
        entrancePaperName,
        maxMarks,
        minMarks,
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
    const limits =
      data.maxMarks !== undefined || data.minMarks !== undefined ? this.parseLimits(data) : null;
    return this.db().update({
      where: { entrancePaperId },
      data: {
        ...(data.entrancePaperName !== undefined
          ? { entrancePaperName: String(data.entrancePaperName).trim() }
          : {}),
        ...(limits ? { maxMarks: limits.maxMarks, minMarks: limits.minMarks } : {}),
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
