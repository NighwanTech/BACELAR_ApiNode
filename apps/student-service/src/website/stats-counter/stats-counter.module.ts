import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { StatsCounterController } from './stats-counter.controller';
import { StatsCounterService } from './stats-counter.service';

@Module({
  imports: [PrismaModule],
  controllers: [StatsCounterController],
  providers: [StatsCounterService],
  exports: [StatsCounterService],
})
export class StatsCounterModule {}
