import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class HeroSectionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return (this.prisma as any).heroSection.create({
      data: {
        badgeText: data.badgeText || null,
        title: data.title,
        highlightedTitle: data.highlightedTitle || null,
        description: data.description || null,
        backgroundImage: data.backgroundImage || null,
        primaryButtonText: data.primaryButtonText || null,
        primaryButtonLink: data.primaryButtonLink || null,
        secondaryButtonText: data.secondaryButtonText || null,
        secondaryButtonLink: data.secondaryButtonLink || null,
        displayOrder: data.displayOrder ?? 0,
        CreatedBy: data.CreatedBy || 'Admin',
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return (this.prisma as any).heroSection.findMany({
      where: { IsDeleted: false },
      orderBy: [{ displayOrder: 'asc' }, { heroSectionId: 'desc' }],
    });
  }

  async findOne(heroSectionId: number) {
    const item = await (this.prisma as any).heroSection.findFirst({
      where: { heroSectionId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Hero section entry with ID ${heroSectionId} not found`);
    }
    return item;
  }

  async update(heroSectionId: number, data: any) {
    await this.findOne(heroSectionId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy || 'Admin',
    };

    if (data.badgeText !== undefined) updatePayload.badgeText = data.badgeText;
    if (data.title !== undefined) updatePayload.title = data.title;
    if (data.highlightedTitle !== undefined) updatePayload.highlightedTitle = data.highlightedTitle;
    if (data.description !== undefined) updatePayload.description = data.description;
    if (data.backgroundImage !== undefined) updatePayload.backgroundImage = data.backgroundImage;
    if (data.primaryButtonText !== undefined) updatePayload.primaryButtonText = data.primaryButtonText;
    if (data.primaryButtonLink !== undefined) updatePayload.primaryButtonLink = data.primaryButtonLink;
    if (data.secondaryButtonText !== undefined) updatePayload.secondaryButtonText = data.secondaryButtonText;
    if (data.secondaryButtonLink !== undefined) updatePayload.secondaryButtonLink = data.secondaryButtonLink;
    if (data.displayOrder !== undefined) updatePayload.displayOrder = data.displayOrder;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return (this.prisma as any).heroSection.update({
      where: { heroSectionId },
      data: updatePayload,
    });
  }

  async softDelete(heroSectionId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(heroSectionId);

    return (this.prisma as any).heroSection.update({
      where: { heroSectionId },
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
