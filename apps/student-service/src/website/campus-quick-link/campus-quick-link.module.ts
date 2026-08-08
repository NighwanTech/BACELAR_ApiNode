import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { CampusQuickLinkController } from './campus-quick-link.controller';
import { CampusQuickLinkService } from './campus-quick-link.service';

@Module({
  imports: [PrismaModule],
  controllers: [CampusQuickLinkController],
  providers: [CampusQuickLinkService],
  exports: [CampusQuickLinkService],
})
export class CampusQuickLinkModule {}
