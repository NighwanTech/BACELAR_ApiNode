import { Module } from '@nestjs/common';
import { EntranceExamController } from './entrance-exam.controller';
import { EntranceExamService } from './entrance-exam.service';

@Module({
  controllers: [EntranceExamController],
  providers: [EntranceExamService],
  exports: [EntranceExamService],
})
export class EntranceExamModule {}
