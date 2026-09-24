import { Module } from '@nestjs/common';
import { AttendanceDaysService } from './attendance-days.service';
import { AttendanceDaysController } from './attendance-days.controller';

@Module({
  controllers: [AttendanceDaysController],
  providers: [AttendanceDaysService],
  exports: [AttendanceDaysService],
})
export class AttendanceDaysModule {}
