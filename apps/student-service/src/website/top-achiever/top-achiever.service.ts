import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class TopAchieverService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return (this.prisma as any).topAchiever.create({
      data: {
        name: data.name,
        image: data.image || null,
        designation: data.designation || null,
        achievement: data.achievement || null,
        batch: data.batch || null,
        course: data.course || null,
        description: data.description || null,
        link: data.link || null,
        displayOrder: data.displayOrder ?? 0,
        CreatedBy: data.CreatedBy || 'Admin',
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return (this.prisma as any).topAchiever.findMany({
      where: { IsDeleted: false },
      orderBy: [{ displayOrder: 'asc' }, { topAchieverId: 'desc' }],
    });
  }

  async findOne(topAchieverId: number) {
    const item = await (this.prisma as any).topAchiever.findFirst({
      where: { topAchieverId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Top achiever entry with ID ${topAchieverId} not found`);
    }
    return item;
  }

  async update(topAchieverId: number, data: any) {
    await this.findOne(topAchieverId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy || 'Admin',
    };

    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.image !== undefined) updatePayload.image = data.image;
    if (data.designation !== undefined) updatePayload.designation = data.designation;
    if (data.achievement !== undefined) updatePayload.achievement = data.achievement;
    if (data.batch !== undefined) updatePayload.batch = data.batch;
    if (data.course !== undefined) updatePayload.course = data.course;
    if (data.description !== undefined) updatePayload.description = data.description;
    if (data.link !== undefined) updatePayload.link = data.link;
    if (data.displayOrder !== undefined) updatePayload.displayOrder = data.displayOrder;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return (this.prisma as any).topAchiever.update({
      where: { topAchieverId },
      data: updatePayload,
    });
  }

  async softDelete(topAchieverId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(topAchieverId);

    return (this.prisma as any).topAchiever.update({
      where: { topAchieverId },
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
