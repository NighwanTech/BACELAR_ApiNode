import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AdminLoginService } from './admin-login.service';

@Controller()
export class AdminLoginController {
  constructor(private readonly adminLoginService: AdminLoginService) {}

  @MessagePattern({ cmd: 'login_admin' })
  async login(@Payload() data: { login: string; password: string; IpAddress?: string; MACAddress?: string }) {
    try {
      return await this.adminLoginService.login(data.login, data.password, {
        IpAddress: data.IpAddress,
        MACAddress: data.MACAddress,
      });
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'create_admin_login' })
  async create(@Payload() data: any) {
    try {
      return await this.adminLoginService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_admin_logins' })
  async findAll() {
    try {
      return await this.adminLoginService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_admin_login' })
  async findOne(@Payload() data: { LoginId: number }) {
    try {
      return await this.adminLoginService.findOne(data.LoginId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_admin_login' })
  async update(@Payload() data: any) {
    try {
      const { LoginId, ...updateData } = data;
      return await this.adminLoginService.update(LoginId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_admin_login' })
  async updateStatus(@Payload() data: { LoginId: number; IsActive: boolean; ModifyBy: string }) {
    try {
      return await this.adminLoginService.updateStatus(data.LoginId, data.IsActive, data.ModifyBy);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'change_password_admin_login' })
  async changePassword(
    @Payload()
    data: {
      LoginId: number;
      currentPassword: string;
      newPassword: string;
      ModifyBy: string;
    },
  ) {
    try {
      return await this.adminLoginService.changePassword(
        data.LoginId,
        data.currentPassword,
        data.newPassword,
        data.ModifyBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_profile_admin_login' })
  async updateProfile(
    @Payload()
    data: {
      LoginId: number;
      LoginName?: string;
      ProfilePhoto?: string;
      ModifyBy: string;
    },
  ) {
    try {
      const { LoginId, ...rest } = data;
      return await this.adminLoginService.updateProfile(LoginId, rest);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_admin_login' })
  async softDelete(@Payload() data: { LoginId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.adminLoginService.softDelete(data.LoginId, data.DeletedBy, data.DeletedRemarks);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_admin_logins' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.adminLoginService.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
