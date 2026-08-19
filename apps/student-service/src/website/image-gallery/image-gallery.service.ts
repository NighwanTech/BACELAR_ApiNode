import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class ImageGalleryService {
  constructor(private readonly prisma: PrismaService) {}

  private formatImages(images: any): string | null {
    if (!images) return null;
    if (Array.isArray(images)) return JSON.stringify(images);
    return String(images);
  }

  async create(data: any) {
    return (this.prisma as any).imageGallery.create({
      data: {
        title: data.title,
        category: data.category || null,
        description: data.description || null,
        images: this.formatImages(data.images),
        date: data.date ? new Date(data.date) : new Date(),
        displayOrder: data.displayOrder ?? 0,
        CreatedBy: data.CreatedBy || 'Admin',
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return (this.prisma as any).imageGallery.findMany({
      where: { IsDeleted: false },
      orderBy: [{ displayOrder: 'asc' }, { imageGalleryId: 'desc' }],
    });
  }

  async findOne(imageGalleryId: number) {
    const item = await (this.prisma as any).imageGallery.findFirst({
      where: { imageGalleryId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Image gallery entry with ID ${imageGalleryId} not found`);
    }
    return item;
  }

  async update(imageGalleryId: number, data: any) {
    await this.findOne(imageGalleryId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy || 'Admin',
    };

    if (data.title !== undefined) updatePayload.title = data.title;
    if (data.category !== undefined) updatePayload.category = data.category;
    if (data.description !== undefined) updatePayload.description = data.description;
    if (data.images !== undefined) updatePayload.images = this.formatImages(data.images);
    if (data.date !== undefined) updatePayload.date = data.date ? new Date(data.date) : null;
    if (data.displayOrder !== undefined) updatePayload.displayOrder = data.displayOrder;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return (this.prisma as any).imageGallery.update({
      where: { imageGalleryId },
      data: updatePayload,
    });
  }

  
  async updateStatus(imageGalleryId: number, IsActive: boolean, UpdatedBy: string) {
    return this.update(imageGalleryId, { IsActive, UpdatedBy });
  }

  async softDelete(imageGalleryId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(imageGalleryId);

    return (this.prisma as any).imageGallery.update({
      where: { imageGalleryId },
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
