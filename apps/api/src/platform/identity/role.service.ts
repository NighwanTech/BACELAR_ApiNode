import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: CreateRoleDto) {
    const existing = await this.prisma.role.findUnique({
      where: { tenantId_slug: { tenantId, slug: dto.slug } },
    });
    if (existing) {
      throw new BusinessException(
        ErrorCodes.RESOURCE_ALREADY_EXISTS,
        `Role '${dto.slug}' already exists`,
        409,
      );
    }
    const role = await this.prisma.role.create({
      data: {
        tenantId,
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        isSystem: dto.isSystem || false,
      },
    });
    if (dto.permissionIds?.length) {
      await this.assignPermissions(role.id, dto.permissionIds);
    }
    return this.prisma.role.findUnique({
      where: { id: role.id },
      include: { rolePermissions: { include: { permission: true } } },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { slug: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    const [items, total] = await Promise.all([
      this.prisma.role.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { rolePermissions: { include: { permission: true } } },
      }),
      this.prisma.role.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const role = await this.prisma.role.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { rolePermissions: { include: { permission: true } } },
    });
    if (!role) {
      throw new BusinessException(ErrorCodes.ROLE_NOT_FOUND, 'Role not found', 404);
    }
    return role;
  }

  async update(tenantId: string, id: string, dto: UpdateRoleDto) {
    await this.findById(tenantId, id);
    await this.prisma.role.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        status: dto.status as any,
      },
    });
    return this.findById(tenantId, id);
  }

  async assignPermissions(roleId: string, permissionIds: string[]) {
    const existing = await this.prisma.rolePermission.findMany({
      where: { roleId },
      select: { permissionId: true },
    });
    const existingIds = existing.map((e) => e.permissionId);
    const toAdd = permissionIds.filter((p) => !existingIds.includes(p));
    if (toAdd.length) {
      await this.prisma.rolePermission.createMany({
        data: toAdd.map((permissionId) => ({ roleId, permissionId })),
      });
    }
    return { added: toAdd.length };
  }

  async removePermission(roleId: string, permissionId: string) {
    await this.prisma.rolePermission.deleteMany({
      where: { roleId, permissionId },
    });
    return { success: true };
  }

  async remove(tenantId: string, id: string) {
    const role = await this.findById(tenantId, id);
    if (role.isSystem) {
      throw new BusinessException(
        ErrorCodes.RESOURCE_CONFLICT,
        'System roles cannot be deleted',
        409,
      );
    }
    await this.prisma.role.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true };
  }
}
