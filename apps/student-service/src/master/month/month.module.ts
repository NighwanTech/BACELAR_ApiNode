import { Module } from '@nestjs/common';
import { MonthService } from './month.service';
import { MonthController } from './month.controller';

@Module({
  controllers: [MonthController],
  providers: [MonthService],
  exports: [MonthService],
})
export class MonthModule {}
