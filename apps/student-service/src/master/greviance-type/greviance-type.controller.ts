import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GrevianceTypeService } from './greviance-type.service';

@Controller()
export class GrevianceTypeController {
  constructor(private readonly grevianceTypeService: GrevianceTypeService) {}

  @MessagePattern({ cmd: 'create_greviance_type' })
  async create(@Payload() data: any) {
    try {
      return await this.grevianceTypeService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_greviance_types' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.grevianceTypeService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_greviance_type' })
  async findOne(@Payload() data: { grevianceTypeId: number }) {
    try {
      return await this.grevianceTypeService.findOne(data.grevianceTypeId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_greviance_type' })
  async update(@Payload() data: any) {
    try {
      const { grevianceTypeId, ...updateData } = data;
      return await this.grevianceTypeService.update(grevianceTypeId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_greviance_type' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.grevianceTypeService.updateStatus(
        data.grevianceTypeId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_greviance_type' })
  async softDelete(
    @Payload() data: { grevianceTypeId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.grevianceTypeService.softDelete(
        data.grevianceTypeId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_greviance_types' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.grevianceTypeService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
