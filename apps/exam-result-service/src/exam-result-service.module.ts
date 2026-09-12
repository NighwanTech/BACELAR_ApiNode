import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { ExamResultModule } from './exam-result/exam-result.module';
import { ResultDeclarationModule } from './result-declaration/result-declaration.module';
import { PromotionModule } from './promotion/promotion.module';

@Module({
  imports: [PrismaModule, ExamResultModule, ResultDeclarationModule, PromotionModule],
  controllers: [],
  providers: [],
})
export class ExamResultServiceModule {}
