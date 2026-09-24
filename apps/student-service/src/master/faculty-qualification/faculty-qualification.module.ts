import { Module } from '@nestjs/common';
import { FacultyQualificationController } from './faculty-qualification.controller';
import { FacultyQualificationService } from './faculty-qualification.service';

@Module({
  controllers: [FacultyQualificationController],
  providers: [FacultyQualificationService],
})
export class FacultyQualificationModule {}
