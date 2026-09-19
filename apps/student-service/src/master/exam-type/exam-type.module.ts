import { Module } from '@nestjs/common';
import { ExamTypeController } from './exam-type.controller';
import { ExamTypeService } from './exam-type.service';

@Module({
  controllers: [ExamTypeController],
  providers: [ExamTypeService],
  exports: [ExamTypeService],
})
export class ExamTypeModule {}
