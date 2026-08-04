import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { RedisService } from '../../core/redis/redis.service';

@Injectable()
export class ConfigurationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async getConfig(tenantId: string) {
    const cached = await this.redis.get<any>(`config:${tenantId}`);
    if (cached) return cached;

    const tenant = await this.prisma.tenant.findFirst({
      where: { id: tenantId, deletedAt: null },
      select: {
        id: true,
        code: true,
        name: true,
        type: true,
        domain: true,
        theme: true,
        config: true,
        timezone: true,
        locale: true,
        academicYear: true,
        logo: true,
        favicon: true,
      },
    });
    if (tenant) {
      await this.redis.set(`config:${tenantId}`, tenant, 600);
    }
    return tenant;
  }

  async updateConfig(tenantId: string, config: Record<string, unknown>) {
    const tenant = await this.prisma.tenant.update({
      where: { id: tenantId },
      data: { config: config as any },
    });
    await this.redis.del(`config:${tenantId}`);
    return tenant.config;
  }

  async updateTheme(tenantId: string, theme: Record<string, unknown>) {
    const tenant = await this.prisma.tenant.update({
      where: { id: tenantId },
      data: { theme: theme as any },
    });
    await this.redis.del(`config:${tenantId}`);
    return tenant.theme;
  }

  async updateAcademicYear(tenantId: string, academicYear: string) {
    const tenant = await this.prisma.tenant.update({
      where: { id: tenantId },
      data: { academicYear },
    });
    await this.redis.del(`config:${tenantId}`);
    return tenant.academicYear;
  }

  async getModules(tenantId: string) {
    const role = await this.prisma.role.findFirst({
      where: { tenantId, isSystem: true },
    });
    const features = await this.prisma.featureFlag.findMany({
      where: { tenantId, deletedAt: null },
    });
    return features;
  }
}
