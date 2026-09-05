import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FeeTypeService } from './fee-type.service';

@Controller()
export class FeeTypeController {
  constructor(private readonly feeTypeService: FeeTypeService) {}

  @MessagePattern({ cmd: 'create_fee_type' })
  async create(@Payload() data: any) {
    try {
      return await this.feeTypeService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_fee_types' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.feeTypeService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_fee_type' })
  async findOne(@Payload() data: { feeTypeId: number }) {
    try {
      return await this.feeTypeService.findOne(data.feeTypeId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_fee_type' })
  async update(@Payload() data: any) {
    try {
      const { feeTypeId, ...updateData } = data;
      return await this.feeTypeService.update(feeTypeId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_fee_type' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.feeTypeService.updateStatus(
        data.feeTypeId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_fee_type' })
  async softDelete(@Payload() data: { feeTypeId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.feeTypeService.softDelete(
        data.feeTypeId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_fee_types' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.feeTypeService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
