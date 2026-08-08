import { Module } from '@nestjs/common';
import { CampusQuickLinkModule } from './campus-quick-link/campus-quick-link.module';

@Module({
  imports: [CampusQuickLinkModule],
  exports: [CampusQuickLinkModule],
})
export class WebsiteModule {}
