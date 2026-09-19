import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RoleService } from './role.service';

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern({ cmd: 'create_role' })
  async create(@Payload() data: any) {
    try {
      return await this.roleService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_roles' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.roleService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_role' })
  async findOne(@Payload() data: { roleId: number }) {
    try {
      return await this.roleService.findOne(data.roleId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_role' })
  async update(@Payload() data: any) {
    try {
      const { roleId, ...updateData } = data;
      return await this.roleService.update(roleId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_role' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.roleService.updateStatus(data.roleId, data.IsActive, data.UpdatedBy);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_role' })
  async softDelete(@Payload() data: { roleId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.roleService.softDelete(data.roleId, data.DeletedBy, data.DeletedRemarks);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_roles' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.roleService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
