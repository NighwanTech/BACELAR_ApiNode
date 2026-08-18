import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class CommitteeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return (this.prisma as any).committee.create({
      data: {
        name: data.name,
        url: data.url || null,
        priorityOrder: data.priorityOrder ?? 0,
        CreatedBy: data.CreatedBy || 'Admin',
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? data.IsActive : true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return (this.prisma as any).committee.findMany({
      where: { IsDeleted: false },
      orderBy: [{ priorityOrder: 'asc' }, { committeeId: 'desc' }],
    });
  }

  async findOne(committeeId: number) {
    const item = await (this.prisma as any).committee.findFirst({
      where: { committeeId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Committee entry with ID ${committeeId} not found`);
    }
    return item;
  }

  async update(committeeId: number, data: any) {
    await this.findOne(committeeId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy || 'Admin',
    };

    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.url !== undefined) updatePayload.url = data.url;
    if (data.priorityOrder !== undefined) updatePayload.priorityOrder = data.priorityOrder;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return (this.prisma as any).committee.update({
      where: { committeeId },
      data: updatePayload,
    });
  }

  async softDelete(committeeId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(committeeId);

    return (this.prisma as any).committee.update({
      where: { committeeId },
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
