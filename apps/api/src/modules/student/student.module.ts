import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';

@Module({
  controllers: [StudentController, EnrollmentController],
  providers: [StudentService, EnrollmentService],
  exports: [StudentService, EnrollmentService],
})
export class StudentModule {}
