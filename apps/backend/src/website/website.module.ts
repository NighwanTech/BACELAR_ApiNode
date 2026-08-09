import { Module } from '@nestjs/common';
import { CampusQuickLinkModule } from './campus-quick-link/campus-quick-link.module';
import { LatestUpdateModule } from './latest-update/latest-update.module';
import { AdmissionEnquiryModule } from './admission-enquiry/admission-enquiry.module';
import { HeroSectionModule } from './hero-section/hero-section.module';
import { UploadModule } from './upload/upload.module';
import { NoticeBoardModule } from './notice-board/notice-board.module';
import { AccreditationSliderModule } from './accreditation-slider/accreditation-slider.module';
import { TopAchieverModule } from './top-achiever/top-achiever.module';
import { ImageGalleryModule } from './image-gallery/image-gallery.module';
import { VideoGalleryModule } from './video-gallery/video-gallery.module';
import { ContactEnquiryModule } from './contact-enquiry/contact-enquiry.module';

@Module({
  imports: [CampusQuickLinkModule, LatestUpdateModule, AdmissionEnquiryModule, HeroSectionModule, UploadModule, NoticeBoardModule, AccreditationSliderModule, TopAchieverModule, ImageGalleryModule, VideoGalleryModule, ContactEnquiryModule],
  exports: [CampusQuickLinkModule, LatestUpdateModule, AdmissionEnquiryModule, HeroSectionModule, UploadModule, NoticeBoardModule, AccreditationSliderModule, TopAchieverModule, ImageGalleryModule, VideoGalleryModule, ContactEnquiryModule],
})
export class WebsiteModule {}









