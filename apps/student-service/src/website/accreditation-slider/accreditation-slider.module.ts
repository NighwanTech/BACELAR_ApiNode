import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { AccreditationSliderController } from './accreditation-slider.controller';
import { AccreditationSliderService } from './accreditation-slider.service';

@Module({
  imports: [PrismaModule],
  controllers: [AccreditationSliderController],
  providers: [AccreditationSliderService],
  exports: [AccreditationSliderService],
})
export class AccreditationSliderModule {}
