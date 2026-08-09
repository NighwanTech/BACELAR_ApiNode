import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class NoticeBoardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return (this.prisma as any).noticeBoard.create({
      data: {
        title: data.title,
        category: data.category || null,
        badgeText: data.badgeText || null,
        description: data.description || null,
        publishDate: data.publishDate ? new Date(data.publishDate) : new Date(),
        status: data.status || 'ACTIVE',
        pdf: data.pdf || null,
        link: data.link || null,
        isPinned: data.isPinned ?? false,
        displayOrder: data.displayOrder ?? 0,
        CreatedBy: data.CreatedBy || 'Admin',
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return (this.prisma as any).noticeBoard.findMany({
      where: { IsDeleted: false },
      orderBy: [{ isPinned: 'desc' }, { displayOrder: 'asc' }, { noticeBoardId: 'desc' }],
    });
  }

  async findOne(noticeBoardId: number) {
    const item = await (this.prisma as any).noticeBoard.findFirst({
      where: { noticeBoardId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Notice board entry with ID ${noticeBoardId} not found`);
    }
    return item;
  }

  async update(noticeBoardId: number, data: any) {
    await this.findOne(noticeBoardId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy || 'Admin',
    };

    if (data.title !== undefined) updatePayload.title = data.title;
    if (data.category !== undefined) updatePayload.category = data.category;
    if (data.badgeText !== undefined) updatePayload.badgeText = data.badgeText;
    if (data.description !== undefined) updatePayload.description = data.description;
    if (data.publishDate !== undefined) updatePayload.publishDate = data.publishDate ? new Date(data.publishDate) : null;
    if (data.status !== undefined) updatePayload.status = data.status;
    if (data.pdf !== undefined) updatePayload.pdf = data.pdf;
    if (data.link !== undefined) updatePayload.link = data.link;
    if (data.isPinned !== undefined) updatePayload.isPinned = data.isPinned;
    if (data.displayOrder !== undefined) updatePayload.displayOrder = data.displayOrder;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return (this.prisma as any).noticeBoard.update({
      where: { noticeBoardId },
      data: updatePayload,
    });
  }

  async softDelete(noticeBoardId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(noticeBoardId);

    return (this.prisma as any).noticeBoard.update({
      where: { noticeBoardId },
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
