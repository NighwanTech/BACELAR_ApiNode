import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { StudentAcademicController } from './student-academic.controller';
import { StudentAcademicService } from './student-academic.service';

@Module({
  imports: [PrismaModule],
  controllers: [StudentAcademicController],
  providers: [StudentAcademicService],
  exports: [StudentAcademicService],
})
export class StudentAcademicModule {}
