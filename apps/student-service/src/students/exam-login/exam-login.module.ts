import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { ExamLoginController } from './exam-login.controller';
import { ExamLoginService } from './exam-login.service';

@Module({
  imports: [PrismaModule],
  controllers: [ExamLoginController],
  providers: [ExamLoginService],
  exports: [ExamLoginService],
})
export class ExamLoginModule {}
