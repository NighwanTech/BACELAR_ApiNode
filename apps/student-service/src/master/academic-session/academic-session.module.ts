import { Module } from '@nestjs/common';
import { AcademicSessionService } from './academic-session.service';
import { AcademicSessionController } from './academic-session.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [AcademicSessionController],
  providers: [AcademicSessionService],
  exports: [AcademicSessionService],
})
export class AcademicSessionModule {}
