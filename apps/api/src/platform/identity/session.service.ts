import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const userId = query.userId;
    const where: any = { tenantId };
    if (userId) where.userId = userId;
    if (query.status) where.status = query.status;

    const [items, total] = await Promise.all([
      this.prisma.session.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true } },
        },
      }),
      this.prisma.session.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async revoke(tenantId: string, id: string) {
    await this.prisma.session.updateMany({
      where: { id, tenantId, status: 'ACTIVE' },
      data: { status: 'REVOKED', revokedAt: new Date() },
    });
    return { success: true };
  }

  async revokeAll(tenantId: string, userId: string) {
    await this.prisma.session.updateMany({
      where: { tenantId, userId, status: 'ACTIVE' },
      data: { status: 'TERMINATED', revokedAt: new Date() },
    });
    return { success: true };
  }
}
