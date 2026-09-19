import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExaminationDetailsService } from './examination-details.service';

@Controller()
export class ExaminationDetailsController {
  constructor(
    private readonly examinationDetailsService: ExaminationDetailsService,
  ) {}

  @MessagePattern({ cmd: 'create_examination_details' })
  async create(@Payload() data: any) {
    try {
      return await this.examinationDetailsService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_examination_details' })
  async findAll(@Payload() data?: { academicId?: number; activeOnly?: boolean }) {
    try {
      return await this.examinationDetailsService.findAll(data?.academicId, data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_examination_details' })
  async findOne(@Payload() data: { examinationId: number }) {
    try {
      return await this.examinationDetailsService.findOne(data.examinationId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_examination_details' })
  async update(@Payload() data: any) {
    try {
      const { examinationId, ...updateData } = data;
      return await this.examinationDetailsService.update(
        examinationId,
        updateData,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_examination_details' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.examinationDetailsService.updateStatus(
        data.examinationId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_examination_details' })
  async softDelete(
    @Payload()
    data: {
      examinationId: number;
      DeletedBy: string;
      DeletedRemarks?: string;
    },
  ) {
    try {
      return await this.examinationDetailsService.softDelete(
        data.examinationId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
