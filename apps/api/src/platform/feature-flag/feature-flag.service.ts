import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { SetFeatureFlagDto } from './dto/set-feature-flag.dto';
import { RedisService } from '../../core/redis/redis.service';

@Injectable()
export class FeatureFlagService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async set(tenantId: string, dto: SetFeatureFlagDto) {
    const flag = await this.prisma.featureFlag.upsert({
      where: { tenantId_key: { tenantId, key: dto.key } },
      update: {
        name: dto.name,
        module: dto.module,
        description: dto.description,
        enabled: dto.enabled,
        config: dto.config as any,
        isPremium: dto.isPremium,
      },
      create: {
        tenantId,
        key: dto.key,
        name: dto.name,
        module: dto.module,
        description: dto.description,
        enabled: dto.enabled,
        config: dto.config as any,
        isPremium: dto.isPremium,
      },
    });
    await this.invalidateCache(tenantId);
    return flag;
  }

  async bulkSet(tenantId: string, flags: SetFeatureFlagDto[]) {
    const results: any[] = [];
    for (const flag of flags) {
      results.push(await this.set(tenantId, flag as any));
    }
    await this.invalidateCache(tenantId);
    return results;
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 50;
    const where: any = { tenantId, deletedAt: null };
    if (query.module) where.module = query.module;
    const [items, total] = await Promise.all([
      this.prisma.featureFlag.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.featureFlag.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async isEnabled(tenantId: string, key: string): Promise<boolean> {
    const cached = await this.redis.get<boolean>(`features:${tenantId}:${key}`);
    if (cached !== null) return cached;
    const flag = await this.prisma.featureFlag.findUnique({
      where: { tenantId_key: { tenantId, key } },
    });
    const enabled = flag?.enabled ?? false;
    await this.redis.set(`features:${tenantId}:${key}`, enabled, 600);
    return enabled;
  }

  async getAllAsMap(tenantId: string): Promise<Record<string, boolean>> {
    const cached = await this.redis.get<Record<string, boolean>>(`features:${tenantId}`);
    if (cached) return cached;
    const flags = await this.prisma.featureFlag.findMany({
      where: { tenantId, deletedAt: null },
      select: { key: true, enabled: true },
    });
    const map = flags.reduce((acc, f) => ({ ...acc, [f.key]: f.enabled }), {});
    await this.redis.set(`features:${tenantId}`, map, 600);
    return map;
  }

  async remove(tenantId: string, key: string) {
    await this.prisma.featureFlag.updateMany({
      where: { tenantId, key },
      data: { deletedAt: new Date() },
    });
    await this.invalidateCache(tenantId);
    return { success: true };
  }

  private async invalidateCache(tenantId: string) {
    await this.redis.delPattern(`features:${tenantId}*`);
  }
}
