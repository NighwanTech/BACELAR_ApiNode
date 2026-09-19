import { Module } from '@nestjs/common';
import { PramanService } from './praman.service';
import { PramanController } from './praman.controller';

@Module({
  controllers: [PramanController],
  providers: [PramanService],
  exports: [PramanService],
})
export class PramanModule {}
