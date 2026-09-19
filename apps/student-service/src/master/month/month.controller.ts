import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MonthService } from './month.service';

@Controller()
export class MonthController {
  constructor(private readonly monthService: MonthService) {}

  @MessagePattern({ cmd: 'create_month' })
  async create(@Payload() data: any) {
    try {
      return await this.monthService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_months' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.monthService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_month' })
  async findOne(@Payload() data: { monthId: number }) {
    try {
      return await this.monthService.findOne(data.monthId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_month' })
  async update(@Payload() data: any) {
    try {
      const { monthId, ...updateData } = data;
      return await this.monthService.update(monthId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_month' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.monthService.updateStatus(
        data.monthId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_month' })
  async softDelete(
    @Payload() data: { monthId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.monthService.softDelete(
        data.monthId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_months' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.monthService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
