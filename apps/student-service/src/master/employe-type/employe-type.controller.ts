import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeTypeService } from './employe-type.service';

@Controller()
export class EmployeTypeController {
  constructor(private readonly employeTypeService: EmployeTypeService) {}

  @MessagePattern({ cmd: 'create_employe_type' })
  async create(@Payload() data: any) {
    try {
      return await this.employeTypeService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_employe_types' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.employeTypeService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_employe_type' })
  async findOne(@Payload() data: { employeTypeId: number }) {
    try {
      return await this.employeTypeService.findOne(data.employeTypeId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_employe_type' })
  async update(@Payload() data: any) {
    try {
      const { employeTypeId, ...updateData } = data;
      return await this.employeTypeService.update(employeTypeId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_employe_type' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.employeTypeService.updateStatus(
        data.employeTypeId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_employe_type' })
  async softDelete(
    @Payload() data: { employeTypeId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.employeTypeService.softDelete(
        data.employeTypeId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_employe_types' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.employeTypeService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
