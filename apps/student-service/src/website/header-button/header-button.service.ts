import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class HeaderButtonService {
  constructor(private readonly prisma: PrismaService) {}

  private get headerButton() {
    return (this.prisma as any).headerButton;
  }

  async create(data: any) {
    return this.headerButton.create({
      data: {
        title: data.title,
        icon: data.icon || null,
        link: data.link || null,
        linkType: data.linkType || null,
        displayOrder: data.displayOrder ?? 0,
        CreatedBy: data.CreatedBy || 'Admin',
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? data.IsActive : true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return this.headerButton.findMany({
      where: { IsDeleted: false },
      orderBy: [{ displayOrder: 'asc' }, { headerButtonId: 'desc' }],
    });
  }

  async findOne(headerButtonId: number) {
    const item = await this.headerButton.findFirst({
      where: { headerButtonId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Header button with ID ${headerButtonId} not found`);
    }
    return item;
  }

  async update(headerButtonId: number, data: any) {
    await this.findOne(headerButtonId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy || 'Admin',
    };

    if (data.title !== undefined) updatePayload.title = data.title;
    if (data.icon !== undefined) updatePayload.icon = data.icon;
    if (data.link !== undefined) updatePayload.link = data.link;
    if (data.linkType !== undefined) updatePayload.linkType = data.linkType;
    if (data.displayOrder !== undefined) updatePayload.displayOrder = data.displayOrder;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return this.headerButton.update({
      where: { headerButtonId },
      data: updatePayload,
    });
  }

  async softDelete(headerButtonId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(headerButtonId);

    return this.headerButton.update({
      where: { headerButtonId },
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
