import { Module } from '@nestjs/common';
import { PaperTypeController } from './paper-type.controller';
import { PaperTypeService } from './paper-type.service';

@Module({
  controllers: [PaperTypeController],
  providers: [PaperTypeService],
  exports: [PaperTypeService],
})
export class PaperTypeModule {}
