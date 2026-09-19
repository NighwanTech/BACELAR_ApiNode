import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class VideoGalleryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return (this.prisma as any).videoGallery.create({
      data: {
        title: data.title,
        category: data.category || null,
        description: data.description || null,
        thumbnail: data.thumbnail || null,
        video: data.video || null,
        videoUrl: data.videoUrl || null,
        duration: data.duration || null,
        displayOrder: data.displayOrder ?? 0,
        CreatedBy: data.CreatedBy || 'Admin',
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return (this.prisma as any).videoGallery.findMany({
      where: { IsDeleted: false },
      orderBy: [{ displayOrder: 'asc' }, { videoGalleryId: 'desc' }],
    });
  }

  async findOne(videoGalleryId: number) {
    const item = await (this.prisma as any).videoGallery.findFirst({
      where: { videoGalleryId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Video gallery entry with ID ${videoGalleryId} not found`);
    }
    return item;
  }

  async update(videoGalleryId: number, data: any) {
    await this.findOne(videoGalleryId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy || 'Admin',
    };

    if (data.title !== undefined) updatePayload.title = data.title;
    if (data.category !== undefined) updatePayload.category = data.category;
    if (data.description !== undefined) updatePayload.description = data.description;
    if (data.thumbnail !== undefined) updatePayload.thumbnail = data.thumbnail;
    if (data.video !== undefined) updatePayload.video = data.video;
    if (data.videoUrl !== undefined) updatePayload.videoUrl = data.videoUrl;
    if (data.duration !== undefined) updatePayload.duration = data.duration;
    if (data.displayOrder !== undefined) updatePayload.displayOrder = data.displayOrder;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return (this.prisma as any).videoGallery.update({
      where: { videoGalleryId },
      data: updatePayload,
    });
  }

  
  async updateStatus(videoGalleryId: number, IsActive: boolean, UpdatedBy: string) {
    return this.update(videoGalleryId, { IsActive, UpdatedBy });
  }

  async softDelete(videoGalleryId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(videoGalleryId);

    return (this.prisma as any).videoGallery.update({
      where: { videoGalleryId },
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
