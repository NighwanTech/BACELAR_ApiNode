import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { ExamResultModule } from './exam-result/exam-result.module';

@Module({
  imports: [PrismaModule, ExamResultModule],
  controllers: [],
  providers: [],
})
export class ExamResultServiceModule {}
