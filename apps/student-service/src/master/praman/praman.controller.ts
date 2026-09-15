import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PramanService } from './praman.service';

@Controller()
export class PramanController {
  constructor(private readonly pramanService: PramanService) {}

  @MessagePattern({ cmd: 'create_praman' })
  async create(@Payload() data: any) {
    try {
      return await this.pramanService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_pramans' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.pramanService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_praman' })
  async findOne(@Payload() data: { pramanId: number }) {
    try {
      return await this.pramanService.findOne(data.pramanId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_praman' })
  async update(@Payload() data: any) {
    try {
      const { pramanId, ...updateData } = data;
      return await this.pramanService.update(pramanId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_praman' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.pramanService.updateStatus(
        data.pramanId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_praman' })
  async softDelete(
    @Payload() data: { pramanId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.pramanService.softDelete(
        data.pramanId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_pramans' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.pramanService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
