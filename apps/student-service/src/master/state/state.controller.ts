import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StateService } from './state.service';

@Controller()
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @MessagePattern({ cmd: 'create_state' })
  async create(@Payload() data: any) {
    try {
      return await this.stateService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_states' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.stateService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_state' })
  async findOne(@Payload() data: { stateId: number }) {
    try {
      return await this.stateService.findOne(data.stateId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_state' })
  async update(@Payload() data: any) {
    try {
      const { stateId, ...updateData } = data;
      return await this.stateService.update(stateId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_state' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.stateService.updateStatus(
        data.stateId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_state' })
  async softDelete(@Payload() data: { stateId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.stateService.softDelete(
        data.stateId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
