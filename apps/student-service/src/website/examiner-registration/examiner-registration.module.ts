import { Module } from '@nestjs/common';
import { ExaminerRegistrationController } from './examiner-registration.controller';
import { ExaminerRegistrationService } from './examiner-registration.service';

@Module({
  controllers: [ExaminerRegistrationController],
  providers: [ExaminerRegistrationService],
  exports: [ExaminerRegistrationService],
})
export class ExaminerRegistrationModule {}
