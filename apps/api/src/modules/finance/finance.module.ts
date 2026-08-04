import { Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { FeeController } from './fee.controller';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  controllers: [FeeController, InvoiceController, PaymentController],
  providers: [FeeService, InvoiceService, PaymentService],
  exports: [FeeService, InvoiceService, PaymentService],
})
export class FinanceModule {}
