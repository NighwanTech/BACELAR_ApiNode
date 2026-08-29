import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { StudentMarksController } from './student-marks.controller';
import { StudentMarksService } from './student-marks.service';

@Module({
  imports: [PrismaModule],
  controllers: [StudentMarksController],
  providers: [StudentMarksService],
  exports: [StudentMarksService],
})
export class StudentMarksModule {}
