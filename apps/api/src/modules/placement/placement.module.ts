import { Module } from '@nestjs/common';
import { PlacementService } from './placement.service';
import { PlacementController } from './placement.controller';

@Module({
  controllers: [PlacementController],
  providers: [PlacementService],
  exports: [PlacementService],
})
export class PlacementModule {}
