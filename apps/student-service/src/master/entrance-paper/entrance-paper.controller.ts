import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EntrancePaperService } from './entrance-paper.service';

@Controller()
export class EntrancePaperController {
  constructor(private readonly service: EntrancePaperService) {}

  @MessagePattern({ cmd: 'create_entrance_paper' })
  async create(@Payload() data: any) {
    try {
      return await this.service.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_entrance_papers' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.service.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_entrance_paper' })
  async findOne(@Payload() data: { entrancePaperId: number }) {
    try {
      return await this.service.findOne(data.entrancePaperId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_entrance_paper' })
  async update(@Payload() data: any) {
    try {
      const { entrancePaperId, ...updateData } = data;
      return await this.service.update(entrancePaperId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_entrance_paper' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.service.updateStatus(data.entrancePaperId, data.IsActive, data.UpdatedBy);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_entrance_paper' })
  async softDelete(@Payload() data: { entrancePaperId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.service.softDelete(data.entrancePaperId, data.DeletedBy, data.DeletedRemarks);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_entrance_papers' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.service.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
