import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class CommitteeSubmenuService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return (this.prisma as any).committeeSubmenu.create({
      data: {
        committeeId: data.committeeId,
        name: data.name,
        url: data.url || null,
        priorityOrder: data.priorityOrder ?? 0,
        CreatedBy: data.CreatedBy || 'Admin',
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? data.IsActive : true,
        IsDeleted: false,
      },
      include: {
        committee: true,
      },
    });
  }

  async findAll(committeeId?: number) {
    const where: any = { IsDeleted: false };
    if (committeeId) {
      where.committeeId = committeeId;
    }
    return (this.prisma as any).committeeSubmenu.findMany({
      where,
      include: {
        committee: true,
      },
      orderBy: [{ priorityOrder: 'asc' }, { committeeSubmenuId: 'desc' }],
    });
  }

  async findOne(committeeSubmenuId: number) {
    const item = await (this.prisma as any).committeeSubmenu.findFirst({
      where: { committeeSubmenuId, IsDeleted: false },
      include: {
        committee: true,
      },
    });
    if (!item) {
      throw new NotFoundException(`Committee submenu entry with ID ${committeeSubmenuId} not found`);
    }
    return item;
  }

  async update(committeeSubmenuId: number, data: any) {
    await this.findOne(committeeSubmenuId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy || 'Admin',
    };

    if (data.committeeId !== undefined) updatePayload.committeeId = data.committeeId;
    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.url !== undefined) updatePayload.url = data.url;
    if (data.priorityOrder !== undefined) updatePayload.priorityOrder = data.priorityOrder;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return (this.prisma as any).committeeSubmenu.update({
      where: { committeeSubmenuId },
      data: updatePayload,
      include: {
        committee: true,
      },
    });
  }

  async softDelete(committeeSubmenuId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(committeeSubmenuId);

    return (this.prisma as any).committeeSubmenu.update({
      where: { committeeSubmenuId },
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
