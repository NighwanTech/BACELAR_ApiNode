import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LatestUpdateService } from './latest-update.service';

@Controller()
export class LatestUpdateController {
  constructor(private readonly latestUpdateService: LatestUpdateService) {}

  @MessagePattern({ cmd: 'create_latest_update' })
  async create(@Payload() data: any) {
    try {
      return await this.latestUpdateService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_latest_updates' })
  async findAll() {
    try {
      return await this.latestUpdateService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_latest_update' })
  async findOne(@Payload() data: { latestUpdateId: number }) {
    try {
      return await this.latestUpdateService.findOne(data.latestUpdateId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_latest_update' })
  async update(@Payload() data: any) {
    try {
      const { latestUpdateId, ...updateData } = data;
      return await this.latestUpdateService.update(latestUpdateId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_latest_update' })
  async softDelete(
    @Payload() data: { latestUpdateId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.latestUpdateService.softDelete(
        data.latestUpdateId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
