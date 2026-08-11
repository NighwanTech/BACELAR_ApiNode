import { Module } from '@nestjs/common';
import { HeaderButtonController } from './header-button.controller';
import { HeaderButtonService } from './header-button.service';

@Module({
  controllers: [HeaderButtonController],
  providers: [HeaderButtonService],
  exports: [HeaderButtonService],
})
export class HeaderButtonModule {}
