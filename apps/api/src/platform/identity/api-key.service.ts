import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { generateId } from '@universityos/common';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, userId: string, dto: CreateApiKeyDto) {
    const rawKey = `uos_${crypto.randomBytes(24).toString('hex')}`;
    const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');
    const prefix = rawKey.slice(0, 12);

    const apiKey = await this.prisma.apiKey.create({
      data: {
        tenantId,
        userId,
        name: dto.name,
        keyHash,
        prefix,
        scopes: dto.scopes,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
      },
    });

    return {
      id: apiKey.id,
      name: apiKey.name,
      prefix,
      key: rawKey,
      expiresAt: apiKey.expiresAt,
      createdAt: apiKey.createdAt,
    };
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    const [items, total] = await Promise.all([
      this.prisma.apiKey.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          prefix: true,
          scopes: true,
          expiresAt: true,
          lastUsedAt: true,
          status: true,
          createdAt: true,
        },
      }),
      this.prisma.apiKey.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async revoke(tenantId: string, id: string) {
    await this.prisma.apiKey.updateMany({
      where: { id, tenantId },
      data: { status: 'INACTIVE' },
    });
    return { success: true };
  }

  async validate(key: string): Promise<boolean> {
    const keyHash = crypto.createHash('sha256').update(key).digest('hex');
    const apiKey = await this.prisma.apiKey.findUnique({
      where: { keyHash },
    });
    if (!apiKey || apiKey.status !== 'ACTIVE' || apiKey.deletedAt) {
      return false;
    }
    if (apiKey.expiresAt && apiKey.expiresAt < new Date()) {
      return false;
    }
    await this.prisma.apiKey.update({
      where: { id: apiKey.id },
      data: { lastUsedAt: new Date() },
    });
    return true;
  }
}
