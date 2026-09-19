import { Module } from '@nestjs/common';
import { PramanDetailsController } from './praman-details.controller';
import { PramanDetailsService } from './praman-details.service';

@Module({
  controllers: [PramanDetailsController],
  providers: [PramanDetailsService],
  exports: [PramanDetailsService],
})
export class PramanDetailsModule {}
