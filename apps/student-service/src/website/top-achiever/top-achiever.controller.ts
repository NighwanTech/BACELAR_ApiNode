import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TopAchieverService } from './top-achiever.service';

@Controller()
export class TopAchieverController {
  constructor(private readonly topAchieverService: TopAchieverService) {}

  @MessagePattern({ cmd: 'create_top_achiever' })
  async create(@Payload() data: any) {
    try {
      return await this.topAchieverService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_top_achievers' })
  async findAll() {
    try {
      return await this.topAchieverService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_top_achiever' })
  async findOne(@Payload() data: { topAchieverId: number }) {
    try {
      return await this.topAchieverService.findOne(data.topAchieverId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_top_achiever' })
  async update(@Payload() data: any) {
    try {
      const { topAchieverId, ...updateData } = data;
      return await this.topAchieverService.update(topAchieverId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_top_achiever' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.topAchieverService.updateStatus(
        data.topAchieverId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_top_achiever' })
  async softDelete(
    @Payload() data: { topAchieverId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.topAchieverService.softDelete(
        data.topAchieverId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
