import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: CreatePermissionDto) {
    const existing = await this.prisma.permission.findUnique({
      where: { tenantId_slug: { tenantId, slug: dto.slug } },
    });
    if (existing) {
      return existing;
    }
    return this.prisma.permission.create({
      data: {
        tenantId,
        name: dto.name,
        slug: dto.slug,
        module: dto.module,
        description: dto.description,
        action: dto.action,
        resource: dto.resource,
      },
    });
  }

  async createMany(tenantId: string, permissions: CreatePermissionDto[]) {
    const results = [];
    for (const perm of permissions) {
      results.push(await this.create(tenantId, perm));
    }
    return results;
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 50;
    const where: Record<string, unknown> = { tenantId, deletedAt: null };
    if (query.module) where.module = query.module;
    if (query.resource) where.resource = query.resource;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { slug: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    const [items, total] = await Promise.all([
      this.prisma.permission.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ module: 'asc' }, { resource: 'asc' }],
      }),
      this.prisma.permission.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    return this.prisma.permission.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
  }

  async remove(tenantId: string, id: string) {
    await this.prisma.permission.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true };
  }
}
