import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { StudentAcademicSubjectController } from './student-academic-subject.controller';
import { StudentAcademicSubjectService } from './student-academic-subject.service';

@Module({
  imports: [PrismaModule],
  controllers: [StudentAcademicSubjectController],
  providers: [StudentAcademicSubjectService],
  exports: [StudentAcademicSubjectService],
})
export class StudentAcademicSubjectModule {}
