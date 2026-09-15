import { Module } from '@nestjs/common';
import { PramanResponseController } from './praman-response.controller';
import { PramanResponseService } from './praman-response.service';

@Module({
  controllers: [PramanResponseController],
  providers: [PramanResponseService],
  exports: [PramanResponseService],
})
export class PramanResponseModule {}
