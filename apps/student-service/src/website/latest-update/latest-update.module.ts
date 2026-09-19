import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { LatestUpdateController } from './latest-update.controller';
import { LatestUpdateService } from './latest-update.service';

@Module({
  imports: [PrismaModule],
  controllers: [LatestUpdateController],
  providers: [LatestUpdateService],
  exports: [LatestUpdateService],
})
export class LatestUpdateModule {}
