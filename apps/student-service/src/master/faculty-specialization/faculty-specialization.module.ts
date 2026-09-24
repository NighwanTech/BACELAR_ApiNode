import { Module } from '@nestjs/common';
import { FacultySpecializationController } from './faculty-specialization.controller';
import { FacultySpecializationService } from './faculty-specialization.service';

@Module({
  controllers: [FacultySpecializationController],
  providers: [FacultySpecializationService],
})
export class FacultySpecializationModule {}
