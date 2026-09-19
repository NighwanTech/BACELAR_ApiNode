import { Module } from '@nestjs/common';
import { PaperDetailController } from './paper-detail.controller';
import { PaperDetailService } from './paper-detail.service';

@Module({
  controllers: [PaperDetailController],
  providers: [PaperDetailService],
  exports: [PaperDetailService],
})
export class PaperDetailModule {}
