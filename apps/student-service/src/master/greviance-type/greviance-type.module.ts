import { Module } from '@nestjs/common';
import { GrevianceTypeController } from './greviance-type.controller';
import { GrevianceTypeService } from './greviance-type.service';

@Module({
  controllers: [GrevianceTypeController],
  providers: [GrevianceTypeService],
})
export class GrevianceTypeModule {}
