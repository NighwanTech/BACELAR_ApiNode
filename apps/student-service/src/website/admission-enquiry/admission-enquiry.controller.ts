import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AdmissionEnquiryService } from './admission-enquiry.service';

@Controller()
export class AdmissionEnquiryController {
  constructor(private readonly admissionEnquiryService: AdmissionEnquiryService) {}

  @MessagePattern({ cmd: 'create_admission_enquiry' })
  async create(@Payload() data: any) {
    try {
      return await this.admissionEnquiryService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_admission_enquiries' })
  async findAll() {
    try {
      return await this.admissionEnquiryService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_admission_enquiry' })
  async findOne(@Payload() data: { admissionEnquiryId: number }) {
    try {
      return await this.admissionEnquiryService.findOne(data.admissionEnquiryId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_admission_enquiry' })
  async update(@Payload() data: any) {
    try {
      const { admissionEnquiryId, ...updateData } = data;
      return await this.admissionEnquiryService.update(admissionEnquiryId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_admission_enquiry' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.admissionEnquiryService.updateStatus(
        data.admissionEnquiryId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_admission_enquiry' })
  async softDelete(
    @Payload() data: { admissionEnquiryId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.admissionEnquiryService.softDelete(
        data.admissionEnquiryId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
