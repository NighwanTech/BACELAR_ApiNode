import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: CreateNotificationDto) {
    const data = await this.notificationService.create(tenantId, dto);
    return success(data, 'Notification created successfully');
  }

  @Post('bulk')
  async createMany(
    @Tenant('id') tenantId: string,
    @Body() dto: CreateNotificationDto,
    @Body('userIds') userIds: string[],
  ) {
    const data = await this.notificationService.createMany(tenantId, dto, userIds);
    return success(data, 'Notifications created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('userId') userId?: string,
    @Query('type') type?: string,
    @Query('status') status?: string,
  ) {
    const data = await this.notificationService.findAll(tenantId, {
      page,
      limit,
      userId,
      type,
      status,
    });
    return paginated(data, 'Notifications retrieved');
  }

  @Get('unread-count')
  async getUnreadCount(@CurrentUser('id') userId: string) {
    const data = await this.notificationService.getUnreadCount(userId);
    return success({ count: data }, 'Unread count retrieved');
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string, @CurrentUser('id') userId: string) {
    const data = await this.notificationService.markAsRead(id, userId);
    return success(data, 'Notification marked as read');
  }

  @Patch('read-all')
  async markAllAsRead(@CurrentUser('id') userId: string) {
    const data = await this.notificationService.markAllAsRead(userId);
    return success(data, 'All notifications marked as read');
  }
}
