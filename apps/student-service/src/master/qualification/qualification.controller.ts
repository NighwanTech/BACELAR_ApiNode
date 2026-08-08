import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QualificationService } from './qualification.service';

@Controller()
export class QualificationController {
  constructor(private readonly qualificationService: QualificationService) {}

  @MessagePattern({ cmd: 'create_qualification' })
  async create(@Payload() data: any) {
    try {
      return await this.qualificationService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_qualifications' })
  async findAll() {
    try {
      return await this.qualificationService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_qualification' })
  async findOne(@Payload() data: { qualificationId: number }) {
    try {
      return await this.qualificationService.findOne(data.qualificationId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_qualification' })
  async update(@Payload() data: any) {
    try {
      const { qualificationId, ...updateData } = data;
      return await this.qualificationService.update(qualificationId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_qualification' })
  async softDelete(@Payload() data: { qualificationId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.qualificationService.softDelete(
        data.qualificationId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_qualifications' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.qualificationService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
