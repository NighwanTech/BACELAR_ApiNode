import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ContactEnquiryService } from './contact-enquiry.service';

@Controller()
export class ContactEnquiryController {
  constructor(private readonly contactEnquiryService: ContactEnquiryService) {}

  @MessagePattern({ cmd: 'create_contact_enquiry' })
  async create(@Payload() data: any) {
    try {
      return await this.contactEnquiryService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_contact_enquiries' })
  async findAll() {
    try {
      return await this.contactEnquiryService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_contact_enquiry' })
  async findOne(@Payload() data: { contactEnquiryId: number }) {
    try {
      return await this.contactEnquiryService.findOne(data.contactEnquiryId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_contact_enquiry' })
  async update(@Payload() data: any) {
    try {
      const { contactEnquiryId, ...updateData } = data;
      return await this.contactEnquiryService.update(contactEnquiryId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_contact_enquiry' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.contactEnquiryService.updateStatus(
        data.contactEnquiryId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_contact_enquiry' })
  async softDelete(
    @Payload() data: { contactEnquiryId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.contactEnquiryService.softDelete(
        data.contactEnquiryId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
