import { Module } from '@nestjs/common';
import { ExamAdmitCardController } from './exam-admit-card.controller';
import { ExamAdmitCardService } from './exam-admit-card.service';

@Module({
  controllers: [ExamAdmitCardController],
  providers: [ExamAdmitCardService],
})
export class ExamAdmitCardModule {}
