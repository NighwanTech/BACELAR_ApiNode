import { Module } from '@nestjs/common';
import { CommitteeSubmenuController } from './committee-submenu.controller';
import { CommitteeSubmenuService } from './committee-submenu.service';

@Module({
  controllers: [CommitteeSubmenuController],
  providers: [CommitteeSubmenuService],
  exports: [CommitteeSubmenuService],
})
export class CommitteeSubmenuModule {}
