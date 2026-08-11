import { Module } from '@nestjs/common';
import { ProgramEligibilityService } from './program-eligibility.service';
import { ProgramEligibilityController } from './program-eligibility.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [ProgramEligibilityController],
  providers: [ProgramEligibilityService],
  exports: [ProgramEligibilityService],
})
export class ProgramEligibilityModule {}
