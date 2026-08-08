import { Module } from '@nestjs/common';
import { StudentPaymentController } from './student-payment.controller';
import { StudentPaymentService } from './student-payment.service';

@Module({
  controllers: [StudentPaymentController],
  providers: [StudentPaymentService],
})
export class StudentPaymentModule {}
