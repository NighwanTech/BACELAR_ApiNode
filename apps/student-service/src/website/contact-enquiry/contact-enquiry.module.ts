import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { ContactEnquiryController } from './contact-enquiry.controller';
import { ContactEnquiryService } from './contact-enquiry.service';

@Module({
  imports: [PrismaModule],
  controllers: [ContactEnquiryController],
  providers: [ContactEnquiryService],
  exports: [ContactEnquiryService],
})
export class ContactEnquiryModule {}
