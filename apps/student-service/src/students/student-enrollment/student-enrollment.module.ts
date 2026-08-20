import { Module } from '@nestjs/common';
import { StudentEnrollmentController } from './student-enrollment.controller';
import { StudentEnrollmentService } from './student-enrollment.service';

@Module({
  controllers: [StudentEnrollmentController],
  providers: [StudentEnrollmentService],
})
export class StudentEnrollmentModule {}
