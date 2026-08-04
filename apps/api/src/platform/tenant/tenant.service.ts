import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { generateId } from '@universityos/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTenantDto) {
    const existing = await this.prisma.tenant.findUnique({
      where: { code: dto.code },
    });
    if (existing) {
      throw new BusinessException(
        ErrorCodes.RESOURCE_ALREADY_EXISTS,
        `Tenant with code '${dto.code}' already exists`,
        409,
      );
    }

    const tenant = await this.prisma.tenant.create({
      data: {
        code: dto.code.toLowerCase(),
        name: dto.name,
        type: dto.type as any,
        domain: dto.domain,
        email: dto.email,
        phone: dto.phone,
        address: dto.address as any,
        logo: dto.logo,
        theme: dto.theme as any,
        config: dto.config as any,
        timezone: dto.timezone || 'Asia/Kolkata',
        locale: dto.locale || 'en-IN',
        status: (dto.status as any) || 'ACTIVE',
      },
    });

    // Create primary domain
    if (dto.domain) {
      await this.prisma.tenantDomain.create({
        data: {
          tenantId: tenant.id,
          domain: dto.domain,
          isPrimary: true,
        },
      });
    }

    // Seed default roles
    await this.seedDefaultRoles(tenant.id);

    return this.prisma.tenant.findUnique({
      where: { id: tenant.id },
    });
  }

  async findAll(query: { page?: number; limit?: number; search?: string; status?: string }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { deletedAt: null };
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { code: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.status) {
      where.status = query.status;
    }
    const [items, total] = await Promise.all([
      this.prisma.tenant.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.tenant.count({ where }),
    ]);
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 0,
    };
  }

  async findById(id: string) {
    const tenant = await this.prisma.tenant.findFirst({
      where: { id, deletedAt: null },
      include: { domains: true, featureFlags: true },
    });
    if (!tenant) {
      throw new BusinessException(ErrorCodes.TENANT_NOT_FOUND, 'Tenant not found', 404);
    }
    return tenant;
  }

  async findByCode(code: string) {
    return this.prisma.tenant.findUnique({
      where: { code },
      include: { domains: true, featureFlags: true },
    });
  }

  async update(id: string, dto: UpdateTenantDto) {
    const tenant = await this.findById(id);
    await this.prisma.tenant.update({
      where: { id: tenant.id },
      data: {
        name: dto.name,
        type: dto.type as any,
        domain: dto.domain,
        email: dto.email,
        phone: dto.phone,
        address: dto.address as any,
        logo: dto.logo,
        favicon: dto.favicon,
        theme: dto.theme as any,
        config: dto.config as any,
        timezone: dto.timezone,
        locale: dto.locale,
        academicYear: dto.academicYear,
        status: dto.status as any,
      },
    });
    return this.findById(id);
  }

  async updateBranding(id: string, branding: Record<string, unknown>) {
    await this.findById(id);
    const tenant = await this.prisma.tenant.update({
      where: { id },
      data: {
        theme: branding as any,
        logo: branding['logo'] as string | undefined,
        favicon: branding['favicon'] as string | undefined,
      },
      select: { id: true, theme: true, logo: true, favicon: true },
    });
    return tenant;
  }

  async remove(id: string) {
    await this.findById(id);
    await this.prisma.tenant.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'ARCHIVED' },
    });
    return { success: true };
  }

  private async seedDefaultRoles(tenantId: string) {
    const roles = [
      { name: 'Super Admin', slug: 'super_admin', isSystem: true },
      { name: 'Admin', slug: 'admin', isSystem: true },
      { name: 'Staff', slug: 'staff', isSystem: true },
      { name: 'Faculty', slug: 'faculty', isSystem: true },
      { name: 'Student', slug: 'student', isSystem: true },
      { name: 'Guardian', slug: 'guardian', isSystem: true },
    ];
    for (const role of roles) {
      await this.prisma.role.create({
        data: { tenantId, ...role },
      });
    }
  }
}
