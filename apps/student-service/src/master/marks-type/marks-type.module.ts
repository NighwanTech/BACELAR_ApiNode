import { Module } from '@nestjs/common';
import { MarksTypeController } from './marks-type.controller';
import { MarksTypeService } from './marks-type.service';

@Module({
  controllers: [MarksTypeController],
  providers: [MarksTypeService],
  exports: [MarksTypeService],
})
export class MarksTypeModule {}
