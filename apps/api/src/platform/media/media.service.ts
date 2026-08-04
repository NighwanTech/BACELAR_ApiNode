import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { StorageService } from '../../core/storage/storage.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class MediaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  async upload(tenantId: string, uploadedById: string, file: any, altText?: string) {
    const storageKey = await this.storage.upload(
      file.buffer,
      file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_'),
      file.mimetype,
      tenantId,
    );
    const url = await this.storage.getPresignedUrl(storageKey, 86400);
    return this.prisma.media.create({
      data: {
        tenantId,
        uploadedById,
        name: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        storageKey,
        url,
        altText,
      },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' };
    }
    const [items, total] = await Promise.all([
      this.prisma.media.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.media.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const media = await this.prisma.media.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!media) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Media not found', 404);
    }
    return media;
  }

  async delete(tenantId: string, id: string) {
    const media = await this.findById(tenantId, id);
    await this.storage.delete(media.storageKey);
    await this.prisma.media.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true };
  }
}
