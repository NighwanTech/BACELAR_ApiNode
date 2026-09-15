import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { ExamGrevianceController } from './exam-greviance.controller';
import { ExamGrevianceService } from './exam-greviance.service';

@Module({
  imports: [PrismaModule],
  controllers: [ExamGrevianceController],
  providers: [ExamGrevianceService],
})
export class ExamGrevianceModule {}
