import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaperTypeService } from './paper-type.service';

@Controller()
export class PaperTypeController {
  constructor(private readonly paperTypeService: PaperTypeService) {}

  @MessagePattern({ cmd: 'create_paper_type' })
  async create(@Payload() data: any) {
    try {
      return await this.paperTypeService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_paper_types' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.paperTypeService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_paper_type' })
  async findOne(@Payload() data: { paperTypeId: number }) {
    try {
      return await this.paperTypeService.findOne(data.paperTypeId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_paper_type' })
  async update(@Payload() data: any) {
    try {
      const { paperTypeId, ...updateData } = data;
      return await this.paperTypeService.update(paperTypeId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_paper_type' })
  async softDelete(
    @Payload() data: { paperTypeId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.paperTypeService.softDelete(
        data.paperTypeId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
