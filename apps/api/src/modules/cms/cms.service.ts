import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class CmsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPage(tenantId: string, dto: any, authorId: string) {
    const existing = await this.prisma.cmsPage.findUnique({
      where: { tenantId_slug: { tenantId, slug: dto.slug } },
    });
    if (existing) {
      throw new BusinessException(ErrorCodes.RESOURCE_ALREADY_EXISTS, 'Page slug already exists', 409);
    }
    return this.prisma.cmsPage.create({
      data: {
        tenantId,
        title: dto.title,
        slug: dto.slug,
        content: dto.content,
        contentJson: dto.contentJson,
        template: dto.template,
        status: dto.status || 'DRAFT',
        authorId,
        seo: dto.seo,
        metadata: dto.metadata,
      },
    });
  }

  async findAllPages(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.status) where.status = query.status;
    if (query.search) {
      where.title = { contains: query.search, mode: 'insensitive' };
    }
    const [items, total] = await Promise.all([
      this.prisma.cmsPage.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.cmsPage.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findPageBySlug(tenantId: string, slug: string) {
    return this.prisma.cmsPage.findUnique({
      where: { tenantId_slug: { tenantId, slug } },
    });
  }

  async updatePage(tenantId: string, id: string, dto: any) {
    await this.prisma.cmsPage.update({ where: { id }, data: { ...dto } });
    return this.prisma.cmsPage.findUnique({ where: { id } });
  }

  async publishPage(tenantId: string, id: string) {
    return this.prisma.cmsPage.update({
      where: { id },
      data: { status: 'PUBLISHED', publishedAt: new Date(), version: { increment: 1 } },
    });
  }

  async createPost(tenantId: string, dto: any) {
    const existing = await this.prisma.cmsPost.findUnique({
      where: { tenantId_slug: { tenantId, slug: dto.slug } },
    });
    if (existing) {
      throw new BusinessException(ErrorCodes.RESOURCE_ALREADY_EXISTS, 'Post slug already exists', 409);
    }
    return this.prisma.cmsPost.create({
      data: {
        tenantId,
        title: dto.title,
        slug: dto.slug,
        excerpt: dto.excerpt,
        content: dto.content,
        coverImage: dto.coverImage,
        category: dto.category,
        tags: dto.tags,
        authorId: dto.authorId,
        status: dto.status || 'DRAFT',
        seo: dto.seo,
      },
    });
  }

  async findAllPosts(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.status) where.status = query.status;
    if (query.category) where.category = query.category;
    if (query.search) {
      where.title = { contains: query.search, mode: 'insensitive' };
    }
    const [items, total] = await Promise.all([
      this.prisma.cmsPost.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.cmsPost.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async updatePost(tenantId: string, id: string, dto: any) {
    return this.prisma.cmsPost.update({ where: { id }, data: { ...dto } });
  }

  async publishPost(tenantId: string, id: string) {
    return this.prisma.cmsPost.update({
      where: { id },
      data: { status: 'PUBLISHED', publishedAt: new Date() },
    });
  }

  async removePage(tenantId: string, id: string) {
    await this.prisma.cmsPage.update({ where: { id }, data: { deletedAt: new Date() } });
    return { success: true };
  }

  async removePost(tenantId: string, id: string) {
    await this.prisma.cmsPost.update({ where: { id }, data: { deletedAt: new Date() } });
    return { success: true };
  }
}
