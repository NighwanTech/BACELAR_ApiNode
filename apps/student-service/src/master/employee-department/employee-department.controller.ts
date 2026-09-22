import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeeDepartmentService } from './employee-department.service';

@Controller()
export class EmployeeDepartmentController {
  constructor(private readonly employeeDepartmentService: EmployeeDepartmentService) {}

  @MessagePattern({ cmd: 'create_employee_department' })
  async create(@Payload() data: any) {
    try {
      return await this.employeeDepartmentService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_employee_departments' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.employeeDepartmentService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_employee_department' })
  async findOne(@Payload() data: { employeeDepartmentId: number }) {
    try {
      return await this.employeeDepartmentService.findOne(data.employeeDepartmentId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_employee_department' })
  async update(@Payload() data: any) {
    try {
      const { employeeDepartmentId, ...updateData } = data;
      return await this.employeeDepartmentService.update(employeeDepartmentId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_employee_department' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.employeeDepartmentService.updateStatus(
        data.employeeDepartmentId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_employee_department' })
  async softDelete(
    @Payload() data: { employeeDepartmentId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.employeeDepartmentService.softDelete(
        data.employeeDepartmentId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_employee_departments' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.employeeDepartmentService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
