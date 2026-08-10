import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StatsCounterService } from './stats-counter.service';

@Controller()
export class StatsCounterController {
  constructor(private readonly statsCounterService: StatsCounterService) {}

  @MessagePattern({ cmd: 'create_stats_counter' })
  async create(@Payload() data: any) {
    try {
      return await this.statsCounterService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_stats_counters' })
  async findAll() {
    try {
      return await this.statsCounterService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_stats_counter' })
  async findOne(@Payload() data: { statsCounterId: number }) {
    try {
      return await this.statsCounterService.findOne(data.statsCounterId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_stats_counter' })
  async update(@Payload() data: any) {
    try {
      const { statsCounterId, ...updateData } = data;
      return await this.statsCounterService.update(statsCounterId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_stats_counter' })
  async softDelete(@Payload() data: { statsCounterId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.statsCounterService.softDelete(
        data.statsCounterId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
