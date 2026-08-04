import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationTemplateService } from './notification-template.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationTemplateService],
  exports: [NotificationService, NotificationTemplateService],
})
export class NotificationModule {}
