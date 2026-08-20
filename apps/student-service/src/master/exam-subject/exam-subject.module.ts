import { Module } from '@nestjs/common';
import { ExamSubjectController } from './exam-subject.controller';
import { ExamSubjectService } from './exam-subject.service';

@Module({
  controllers: [ExamSubjectController],
  providers: [ExamSubjectService],
  exports: [ExamSubjectService],
})
export class ExamSubjectModule {}
