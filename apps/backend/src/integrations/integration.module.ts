import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { IdentitySyncController } from './identity-sync.controller';
import { IdentitySyncService } from './identity-sync.service';
import { KohaClient } from './koha.client';
import { MoodleClient } from './moodle.client';

@Module({
  imports: [PrismaModule],
  controllers: [IdentitySyncController],
  providers: [IdentitySyncService, MoodleClient, KohaClient],
})
export class IntegrationModule {}
