import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class StatsCounterService {
  constructor(private readonly prisma: PrismaService) {}

  private get statsCounter() {
    return (this.prisma as any).statsCounter;
  }

  async create(data: any) {
    return this.statsCounter.create({
      data: {
        title: data.title,
        value: data.value,
        suffix: data.suffix || null,
        icon: data.icon || null,
        backgroundImage: data.backgroundImage || null,
        displayOrder: data.displayOrder ?? 0,
        CreatedBy: data.CreatedBy || 'Admin',
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? data.IsActive : true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return this.statsCounter.findMany({
      where: { IsDeleted: false },
      orderBy: [{ displayOrder: 'asc' }, { statsCounterId: 'desc' }],
    });
  }

  async findOne(statsCounterId: number) {
    const item = await this.statsCounter.findFirst({
      where: { statsCounterId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Stats counter entry with ID ${statsCounterId} not found`);
    }
    return item;
  }

  async update(statsCounterId: number, data: any) {
    await this.findOne(statsCounterId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy || 'Admin',
    };

    if (data.title !== undefined) updatePayload.title = data.title;
    if (data.value !== undefined) updatePayload.value = data.value;
    if (data.suffix !== undefined) updatePayload.suffix = data.suffix;
    if (data.icon !== undefined) updatePayload.icon = data.icon;
    if (data.backgroundImage !== undefined) updatePayload.backgroundImage = data.backgroundImage;
    if (data.displayOrder !== undefined) updatePayload.displayOrder = data.displayOrder;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return this.statsCounter.update({
      where: { statsCounterId },
      data: updatePayload,
    });
  }

  
  async updateStatus(statsCounterId: number, IsActive: boolean, UpdatedBy: string) {
    return this.update(statsCounterId, { IsActive, UpdatedBy });
  }

  async softDelete(statsCounterId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(statsCounterId);

    return this.statsCounter.update({
      where: { statsCounterId },
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
