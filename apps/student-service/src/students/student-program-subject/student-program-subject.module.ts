import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { StudentProgramSubjectController } from './student-program-subject.controller';
import { StudentProgramSubjectService } from './student-program-subject.service';

@Module({
  imports: [PrismaModule],
  controllers: [StudentProgramSubjectController],
  providers: [StudentProgramSubjectService],
  exports: [StudentProgramSubjectService],
})
export class StudentProgramSubjectModule {}
