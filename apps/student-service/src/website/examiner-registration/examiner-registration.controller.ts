import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExaminerRegistrationService } from './examiner-registration.service';

@Controller()
export class ExaminerRegistrationController {
  constructor(private readonly examinerRegistrationService: ExaminerRegistrationService) {}

  @MessagePattern({ cmd: 'create_examiner_registration' })
  async create(@Payload() data: any) {
    try {
      return await this.examinerRegistrationService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_examiner_registrations' })
  async findAll() {
    try {
      return await this.examinerRegistrationService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_examiner_registration' })
  async findOne(@Payload() data: { examinerId: number }) {
    try {
      return await this.examinerRegistrationService.findOne(data.examinerId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_examiner_registration' })
  async update(@Payload() data: any) {
    try {
      const { examinerId, ...updateData } = data;
      return await this.examinerRegistrationService.update(examinerId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_examiner_registration' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.examinerRegistrationService.updateStatus(
        data.examinerId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_examiner_registration' })
  async softDelete(
    @Payload() data: { examinerId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.examinerRegistrationService.softDelete(
        data.examinerId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
