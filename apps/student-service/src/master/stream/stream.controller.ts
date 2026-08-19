import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StreamService } from './stream.service';

@Controller()
export class StreamController {
  constructor(private readonly streamService: StreamService) {}

  @MessagePattern({ cmd: 'create_stream' })
  async create(@Payload() data: any) {
    try {
      return await this.streamService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_streams' })
  async findAll(@Payload() data?: { programId?: number }) {
    try {
      return await this.streamService.findAll(data?.programId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_stream' })
  async findOne(@Payload() data: { streamId: number }) {
    try {
      return await this.streamService.findOne(data.streamId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_stream' })
  async update(@Payload() data: any) {
    try {
      const { streamId, ...updateData } = data;
      return await this.streamService.update(streamId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_stream' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.streamService.updateStatus(
        data.streamId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_stream' })
  async softDelete(
    @Payload() data: { streamId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.streamService.softDelete(
        data.streamId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
