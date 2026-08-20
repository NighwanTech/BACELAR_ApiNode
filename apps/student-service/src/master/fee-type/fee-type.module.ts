import { Module } from '@nestjs/common';
import { FeeTypeController } from './fee-type.controller';
import { FeeTypeService } from './fee-type.service';

@Module({
  controllers: [FeeTypeController],
  providers: [FeeTypeService],
})
export class FeeTypeModule {}
