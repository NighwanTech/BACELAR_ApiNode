import { Module } from '@nestjs/common';
import { ExamSchemeController } from './exam-scheme.controller';
import { ExamSchemeService } from './exam-scheme.service';

@Module({
  controllers: [ExamSchemeController],
  providers: [ExamSchemeService],
  exports: [ExamSchemeService],
})
export class ExamSchemeModule {}
