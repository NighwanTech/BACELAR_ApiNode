import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class CampusQuickLinkService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.campusQuickLink.create({
      data: {
        quickLinkName: data.quickLinkName,
        icon: data.icon || null,
        pageUrl: data.pageUrl,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? data.IsActive : true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return this.prisma.campusQuickLink.findMany({
      where: { IsDeleted: false },
      orderBy: { quickLinkId: 'desc' },
    });
  }

  async findOne(quickLinkId: number) {
    const item = await this.prisma.campusQuickLink.findFirst({
      where: { quickLinkId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Campus quick link with ID ${quickLinkId} not found`);
    }
    return item;
  }

  async update(quickLinkId: number, data: any) {
    await this.findOne(quickLinkId);

    return this.prisma.campusQuickLink.update({
      where: { quickLinkId },
      data: {
        quickLinkName: data.quickLinkName,
        icon: data.icon,
        pageUrl: data.pageUrl,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async softDelete(quickLinkId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(quickLinkId);

    return this.prisma.campusQuickLink.update({
      where: { quickLinkId },
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
