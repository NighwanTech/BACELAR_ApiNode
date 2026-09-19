import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { StudentAttendanceController } from './student-attendance.controller';
import { StudentAttendanceService } from './student-attendance.service';

@Module({
  imports: [PrismaModule],
  controllers: [StudentAttendanceController],
  providers: [StudentAttendanceService],
  exports: [StudentAttendanceService],
})
export class StudentAttendanceModule {}
