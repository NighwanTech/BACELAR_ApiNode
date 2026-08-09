import { Module } from '@nestjs/common';
import { CampusQuickLinkModule } from './campus-quick-link/campus-quick-link.module';
import { LatestUpdateModule } from './latest-update/latest-update.module';
import { AdmissionEnquiryModule } from './admission-enquiry/admission-enquiry.module';
import { HeroSectionModule } from './hero-section/hero-section.module';

@Module({
  imports: [CampusQuickLinkModule, LatestUpdateModule, AdmissionEnquiryModule, HeroSectionModule],
  exports: [CampusQuickLinkModule, LatestUpdateModule, AdmissionEnquiryModule, HeroSectionModule],
})
export class WebsiteModule {}



