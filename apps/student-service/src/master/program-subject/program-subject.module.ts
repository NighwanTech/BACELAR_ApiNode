import { Module } from '@nestjs/common';
import { ProgramSubjectService } from './program-subject.service';
import { ProgramSubjectController } from './program-subject.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [ProgramSubjectController],
  providers: [ProgramSubjectService],
  exports: [ProgramSubjectService],
})
export class ProgramSubjectModule {}
