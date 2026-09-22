import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeeCategoryService } from './employee-category.service';

@Controller()
export class EmployeeCategoryController {
  constructor(private readonly employeeCategoryService: EmployeeCategoryService) {}

  @MessagePattern({ cmd: 'create_employee_category' })
  async create(@Payload() data: any) {
    try {
      return await this.employeeCategoryService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_employee_categories' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.employeeCategoryService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_employee_category' })
  async findOne(@Payload() data: { employeeCategoryId: number }) {
    try {
      return await this.employeeCategoryService.findOne(data.employeeCategoryId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_employee_category' })
  async update(@Payload() data: any) {
    try {
      const { employeeCategoryId, ...updateData } = data;
      return await this.employeeCategoryService.update(employeeCategoryId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_employee_category' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.employeeCategoryService.updateStatus(
        data.employeeCategoryId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_employee_category' })
  async softDelete(
    @Payload() data: { employeeCategoryId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.employeeCategoryService.softDelete(
        data.employeeCategoryId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_employee_categories' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.employeeCategoryService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
