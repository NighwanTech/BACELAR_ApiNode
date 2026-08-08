import { Module } from '@nestjs/common';
import { AcademicSessionController } from './academic-session.controller';
import { AcademicSessionService } from './academic-session.service';

@Module({
  controllers: [AcademicSessionController],
  providers: [AcademicSessionService],
})
export class AcademicSessionModule {}
