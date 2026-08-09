import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class AccreditationSliderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return (this.prisma as any).accreditationSlider.create({
      data: {
        title: data.title,
        image: data.image || null,
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
    return (this.prisma as any).accreditationSlider.findMany({
      where: { IsDeleted: false },
      orderBy: [{ displayOrder: 'asc' }, { accreditationSliderId: 'desc' }],
    });
  }

  async findOne(accreditationSliderId: number) {
    const item = await (this.prisma as any).accreditationSlider.findFirst({
      where: { accreditationSliderId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Accreditation slider entry with ID ${accreditationSliderId} not found`);
    }
    return item;
  }

  async update(accreditationSliderId: number, data: any) {
    await this.findOne(accreditationSliderId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy || 'Admin',
    };

    if (data.title !== undefined) updatePayload.title = data.title;
    if (data.image !== undefined) updatePayload.image = data.image;
    if (data.link !== undefined) updatePayload.link = data.link;
    if (data.displayOrder !== undefined) updatePayload.displayOrder = data.displayOrder;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return (this.prisma as any).accreditationSlider.update({
      where: { accreditationSliderId },
      data: updatePayload,
    });
  }

  async softDelete(accreditationSliderId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(accreditationSliderId);

    return (this.prisma as any).accreditationSlider.update({
      where: { accreditationSliderId },
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
