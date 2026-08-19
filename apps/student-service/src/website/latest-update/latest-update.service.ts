import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class LatestUpdateService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return (this.prisma as any).latestUpdate.create({
      data: {
        title: data.title,
        shortName: data.shortName || null,
        grade: data.grade || null,
        logo: data.logo || null,
        description: data.description || null,
        validFrom: data.validFrom ? new Date(data.validFrom) : null,
        validUntil: data.validUntil ? new Date(data.validUntil) : null,
        linkUrl: data.linkUrl || null,
        displayOrder: data.displayOrder ?? 0,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return (this.prisma as any).latestUpdate.findMany({
      where: { IsDeleted: false },
      orderBy: [{ displayOrder: 'asc' }, { latestUpdateId: 'desc' }],
    });
  }

  async findOne(latestUpdateId: number) {
    const item = await (this.prisma as any).latestUpdate.findFirst({
      where: { latestUpdateId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Latest update entry with ID ${latestUpdateId} not found`);
    }
    return item;
  }

  async update(latestUpdateId: number, data: any) {
    await this.findOne(latestUpdateId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy,
    };

    if (data.title !== undefined) updatePayload.title = data.title;
    if (data.shortName !== undefined) updatePayload.shortName = data.shortName;
    if (data.grade !== undefined) updatePayload.grade = data.grade;
    if (data.logo !== undefined) updatePayload.logo = data.logo;
    if (data.description !== undefined) updatePayload.description = data.description;
    if (data.validFrom !== undefined) updatePayload.validFrom = data.validFrom ? new Date(data.validFrom) : null;
    if (data.validUntil !== undefined) updatePayload.validUntil = data.validUntil ? new Date(data.validUntil) : null;
    if (data.linkUrl !== undefined) updatePayload.linkUrl = data.linkUrl;
    if (data.displayOrder !== undefined) updatePayload.displayOrder = data.displayOrder;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return (this.prisma as any).latestUpdate.update({
      where: { latestUpdateId },
      data: updatePayload,
    });
  }

  
  async updateStatus(latestUpdateId: number, IsActive: boolean, UpdatedBy: string) {
    return this.update(latestUpdateId, { IsActive, UpdatedBy });
  }

  async softDelete(latestUpdateId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(latestUpdateId);

    return (this.prisma as any).latestUpdate.update({
      where: { latestUpdateId },
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
