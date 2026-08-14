import { Module } from '@nestjs/common';
import { ExaminationDetailsService } from './examination-details.service';
import { ExaminationDetailsController } from './examination-details.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [ExaminationDetailsController],
  providers: [ExaminationDetailsService],
  exports: [ExaminationDetailsService],
})
export class ExaminationDetailsModule {}
