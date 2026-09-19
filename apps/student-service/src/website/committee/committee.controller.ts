import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommitteeService } from './committee.service';

@Controller()
export class CommitteeController {
  constructor(private readonly committeeService: CommitteeService) {}

  @MessagePattern({ cmd: 'create_committee' })
  async create(@Payload() data: any) {
    try {
      return await this.committeeService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_committees' })
  async findAll() {
    try {
      return await this.committeeService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_committee' })
  async findOne(@Payload() data: { committeeId: number }) {
    try {
      return await this.committeeService.findOne(data.committeeId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_committee' })
  async update(@Payload() data: any) {
    try {
      const { committeeId, ...updateData } = data;
      return await this.committeeService.update(committeeId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_committee' })
  async softDelete(
    @Payload() data: { committeeId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.committeeService.softDelete(
        data.committeeId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
