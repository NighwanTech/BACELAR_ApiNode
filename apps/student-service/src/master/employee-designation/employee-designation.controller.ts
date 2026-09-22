import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmployeeDesignationService } from './employee-designation.service';

@Controller()
export class EmployeeDesignationController {
  constructor(private readonly employeeDesignationService: EmployeeDesignationService) {}

  @MessagePattern({ cmd: 'create_employee_designation' })
  async create(@Payload() data: any) {
    try {
      return await this.employeeDesignationService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_employee_designations' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.employeeDesignationService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_employee_designation' })
  async findOne(@Payload() data: { employeeDesignationId: number }) {
    try {
      return await this.employeeDesignationService.findOne(data.employeeDesignationId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_employee_designation' })
  async update(@Payload() data: any) {
    try {
      const { employeeDesignationId, ...updateData } = data;
      return await this.employeeDesignationService.update(employeeDesignationId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_employee_designation' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.employeeDesignationService.updateStatus(
        data.employeeDesignationId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_employee_designation' })
  async softDelete(
    @Payload() data: { employeeDesignationId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.employeeDesignationService.softDelete(
        data.employeeDesignationId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_employee_designations' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.employeeDesignationService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
