import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PramanSubParameterService } from './praman-sub-parameter.service';

@Controller()
export class PramanSubParameterController {
  constructor(private readonly pramanSubParameterService: PramanSubParameterService) {}

  @MessagePattern({ cmd: 'create_praman_sub_parameter' })
  async create(@Payload() data: any) {
    try {
      return await this.pramanSubParameterService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_praman_sub_parameters' })
  async findAll(@Payload() data?: { activeOnly?: boolean; pramanId?: number }) {
    try {
      return await this.pramanSubParameterService.findAll(data?.activeOnly, data?.pramanId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_praman_sub_parameter' })
  async findOne(@Payload() data: { subPramanParameterId: number }) {
    try {
      return await this.pramanSubParameterService.findOne(data.subPramanParameterId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_praman_sub_parameter' })
  async update(@Payload() data: any) {
    try {
      const { subPramanParameterId, ...updateData } = data;
      return await this.pramanSubParameterService.update(subPramanParameterId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_praman_sub_parameter' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.pramanSubParameterService.updateStatus(
        data.subPramanParameterId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_praman_sub_parameter' })
  async softDelete(
    @Payload() data: { subPramanParameterId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.pramanSubParameterService.softDelete(
        data.subPramanParameterId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_praman_sub_parameters' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.pramanSubParameterService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
