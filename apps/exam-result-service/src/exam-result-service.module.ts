import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { ExamResultModule } from './exam-result/exam-result.module';
import { ResultDeclarationModule } from './result-declaration/result-declaration.module';

@Module({
  imports: [PrismaModule, ExamResultModule, ResultDeclarationModule],
  controllers: [],
  providers: [],
})
export class ExamResultServiceModule {}
