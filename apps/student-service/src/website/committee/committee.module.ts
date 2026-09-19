import { Module } from '@nestjs/common';
import { CommitteeController } from './committee.controller';
import { CommitteeService } from './committee.service';

@Module({
  controllers: [CommitteeController],
  providers: [CommitteeService],
  exports: [CommitteeService],
})
export class CommitteeModule {}
