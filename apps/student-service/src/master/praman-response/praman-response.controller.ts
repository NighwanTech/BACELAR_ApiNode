import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PramanResponseService } from './praman-response.service';

@Controller()
export class PramanResponseController {
  constructor(private readonly pramanResponseService: PramanResponseService) {}

  @MessagePattern({ cmd: 'create_praman_response' })
  async create(@Payload() data: any) {
    try {
      return await this.pramanResponseService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_praman_responses' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.pramanResponseService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_praman_response' })
  async findOne(@Payload() data: { pramanResponseId: number }) {
    try {
      return await this.pramanResponseService.findOne(data.pramanResponseId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_praman_response' })
  async update(@Payload() data: any) {
    try {
      const { pramanResponseId, ...updateData } = data;
      return await this.pramanResponseService.update(pramanResponseId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_praman_response' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.pramanResponseService.updateStatus(
        data.pramanResponseId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_praman_response' })
  async softDelete(
    @Payload() data: { pramanResponseId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.pramanResponseService.softDelete(
        data.pramanResponseId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_praman_responses' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.pramanResponseService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
