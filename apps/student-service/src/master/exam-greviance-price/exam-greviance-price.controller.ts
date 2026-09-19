import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExamGreviancePriceMasterService } from './exam-greviance-price.service';

@Controller()
export class ExamGreviancePriceController {
  constructor(private readonly greviancePriceService: ExamGreviancePriceMasterService) {}

  @MessagePattern({ cmd: 'create_exam_greviance_price' })
  async create(@Payload() data: any) {
    try {
      return await this.greviancePriceService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_exam_greviance_prices' })
  async findAll(@Payload() data: { activeOnly?: boolean }) {
    try {
      return await this.greviancePriceService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_exam_greviance_price' })
  async findOne(@Payload() data: { examGreviancePriceMasterId: number }) {
    try {
      return await this.greviancePriceService.findOne(data.examGreviancePriceMasterId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_exam_greviance_price' })
  async update(@Payload() data: any) {
    try {
      const { examGreviancePriceMasterId, ...updateData } = data;
      return await this.greviancePriceService.update(examGreviancePriceMasterId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_exam_greviance_price' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.greviancePriceService.updateStatus(
        data.examGreviancePriceMasterId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_exam_greviance_price' })
  async softDelete(
    @Payload() data: { examGreviancePriceMasterId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.greviancePriceService.softDelete(
        data.examGreviancePriceMasterId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_exam_greviance_prices' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.greviancePriceService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
