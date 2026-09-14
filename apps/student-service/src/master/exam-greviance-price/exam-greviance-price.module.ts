import { Module } from '@nestjs/common';
import { ExamGreviancePriceController } from './exam-greviance-price.controller';
import { ExamGreviancePriceMasterService } from './exam-greviance-price.service';

@Module({
  controllers: [ExamGreviancePriceController],
  providers: [ExamGreviancePriceMasterService],
})
export class ExamGreviancePriceModule {}
