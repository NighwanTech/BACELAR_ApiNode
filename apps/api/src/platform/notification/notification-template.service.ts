import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class NotificationTemplateService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string | null, dto: any) {
    return this.prisma.notificationTemplate.create({
      data: {
        tenantId,
        code: dto.code,
        channel: dto.channel,
        subject: dto.subject,
        body: dto.body,
        variables: dto.variables,
        isSystem: dto.isSystem || false,
      },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = {
      OR: [{ tenantId }, { tenantId: null }],
      deletedAt: null,
    };
    if (query.channel) where.channel = query.channel;
    const [items, total] = await Promise.all([
      this.prisma.notificationTemplate.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.notificationTemplate.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async render(template: string, variables: Record<string, unknown>) {
    let body = template;
    for (const [key, value] of Object.entries(variables)) {
      body = body.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    }
    return body;
  }
}
