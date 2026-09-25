import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { IdentitySyncController } from './identity-sync.controller';
import { CourseSyncService } from './course-sync.service';
import { IdentitySyncService } from './identity-sync.service';
import { KohaClient } from './koha.client';
import { MoodleClient } from './moodle.client';

@Module({
  imports: [PrismaModule],
  controllers: [IdentitySyncController],
  providers: [IdentitySyncService, CourseSyncService, MoodleClient, KohaClient],
  exports: [IdentitySyncService],
})
export class IntegrationModule {}
