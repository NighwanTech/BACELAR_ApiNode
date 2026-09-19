import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PramanDetailsService } from './praman-details.service';

@Controller()
export class PramanDetailsController {
  constructor(private readonly pramanDetailsService: PramanDetailsService) {}

  @MessagePattern({ cmd: 'create_praman_details' })
  async create(@Payload() data: any) {
    try {
      return await this.pramanDetailsService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_praman_details' })
  async findAll(@Payload() data?: {
    activeOnly?: boolean;
    pramanId?: number;
    subParameterId?: number;
    academicYearId?: number;
    monthId?: number;
    pramanResId?: number;
  }) {
    try {
      return await this.pramanDetailsService.findAll(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_praman_details' })
  async findOne(@Payload() data: { pramanDetailsId: number }) {
    try {
      return await this.pramanDetailsService.findOne(data.pramanDetailsId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_praman_details' })
  async update(@Payload() data: any) {
    try {
      const { pramanDetailsId, ...updateData } = data;
      return await this.pramanDetailsService.update(pramanDetailsId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_praman_details' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.pramanDetailsService.updateStatus(
        data.pramanDetailsId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_praman_details' })
  async softDelete(
    @Payload() data: { pramanDetailsId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.pramanDetailsService.softDelete(
        data.pramanDetailsId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_praman_details' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.pramanDetailsService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
