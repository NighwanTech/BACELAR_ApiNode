import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { RabbitService } from '../../core/rabbit/rabbit.service';
import { RabbitQueues } from '../../core/rabbit/rabbit.constants';

export interface AuditEntry {
  tenantId: string;
  userId?: string;
  action: string;
  module: string;
  resource: string;
  resourceId?: string;
  oldValue?: any;
  newValue?: any;
  metadata?: any;
}

@Injectable()
export class AuditService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbit: RabbitService,
  ) {}

  async record(entry: AuditEntry) {
    // Persist synchronously for critical audit
    await this.prisma.auditLog.create({
      data: {
        tenantId: entry.tenantId,
        userId: entry.userId,
        action: entry.action,
        module: entry.module,
        resource: entry.resource,
        resourceId: entry.resourceId,
        oldValue: entry.oldValue,
        newValue: entry.newValue,
        metadata: entry.metadata,
      },
    });
    return { success: true };
  }

  async recordAsync(entry: AuditEntry) {
    await this.rabbit.publish('audit.created', entry);
    return { queued: true };
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId };
    if (query.module) where.module = query.module;
    if (query.resource) where.resource = query.resource;
    if (query.resourceId) where.resourceId = query.resourceId;
    if (query.userId) where.userId = query.userId;
    if (query.action) where.action = query.action;
    if (query.from || query.to) {
      where.createdAt = {};
      if (query.from) where.createdAt.gte = new Date(query.from);
      if (query.to) where.createdAt.lte = new Date(query.to);
    }

    const [items, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
      }),
      this.prisma.auditLog.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async getByResource(tenantId: string, resource: string, resourceId: string) {
    return this.prisma.auditLog.findMany({
      where: { tenantId, resource, resourceId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
