import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MarksTypeService } from './marks-type.service';

@Controller()
export class MarksTypeController {
  constructor(private readonly marksTypeService: MarksTypeService) {}

  @MessagePattern({ cmd: 'create_marks_type' })
  async create(@Payload() data: any) {
    try {
      return await this.marksTypeService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_marks_types' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.marksTypeService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_marks_type' })
  async findOne(@Payload() data: { marksTypeId: number }) {
    try {
      return await this.marksTypeService.findOne(data.marksTypeId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_marks_type' })
  async update(@Payload() data: any) {
    try {
      const { marksTypeId, ...updateData } = data;
      return await this.marksTypeService.update(marksTypeId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_marks_type' })
  async softDelete(
    @Payload() data: { marksTypeId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.marksTypeService.softDelete(
        data.marksTypeId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
