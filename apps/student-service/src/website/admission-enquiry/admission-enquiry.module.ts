import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { AdmissionEnquiryController } from './admission-enquiry.controller';
import { AdmissionEnquiryService } from './admission-enquiry.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdmissionEnquiryController],
  providers: [AdmissionEnquiryService],
  exports: [AdmissionEnquiryService],
})
export class AdmissionEnquiryModule {}
