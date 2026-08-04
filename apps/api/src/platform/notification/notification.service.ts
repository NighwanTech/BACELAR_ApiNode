import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { RabbitService } from '../../core/rabbit/rabbit.service';
import { RabbitRoutingKeys } from '../../core/rabbit/rabbit.constants';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbit: RabbitService,
  ) {}

  async create(tenantId: string, dto: CreateNotificationDto) {
    const notification = await this.prisma.notification.create({
      data: {
        tenantId,
        userId: dto.userId,
        type: dto.type,
        channel: dto.channel,
        subject: dto.subject,
        body: dto.body,
        template: dto.template,
        data: dto.data as any,
        status: 'QUEUED',
      },
    });

    // Publish to RabbitMQ for async delivery
    const routingKey = this.getRoutingKey(dto.channel);
    await this.rabbit.publish(routingKey, {
      notificationId: notification.id,
      tenantId,
      userId: dto.userId,
      channel: dto.channel,
      subject: dto.subject,
      body: dto.body,
      data: dto.data,
    });

    return notification;
  }

  async createMany(tenantId: string, dto: CreateNotificationDto, userIds: string[]) {
    const created = await this.prisma.notification.createMany({
      data: userIds.map((userId) => ({
        tenantId,
        userId,
        type: dto.type,
        channel: dto.channel,
        subject: dto.subject,
        body: dto.body,
        template: dto.template,
        data: dto.data as any,
        status: 'QUEUED',
      })),
    });
    return { count: created.count };
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId };
    if (query.userId) where.userId = query.userId;
    if (query.type) where.type = query.type;
    if (query.status) where.status = query.status;

    const [items, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.notification.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async markAsRead(notificationId: string, userId: string) {
    await this.prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: { status: 'READ', readAt: new Date() },
    });
    return { success: true };
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, status: { not: 'READ' } },
      data: { status: 'READ', readAt: new Date() },
    });
    return { success: true };
  }

  async getUnreadCount(userId: string) {
    return this.prisma.notification.count({
      where: { userId, status: { not: 'READ' } },
    });
  }

  private getRoutingKey(channel: string): string {
    switch (channel) {
      case 'email':
        return RabbitRoutingKeys.EMAIL_SEND;
      case 'sms':
        return RabbitRoutingKeys.SMS_SEND;
      case 'push':
        return RabbitRoutingKeys.PUSH_SEND;
      default:
        return RabbitRoutingKeys.NOTIFICATION_CREATED;
    }
  }
}
