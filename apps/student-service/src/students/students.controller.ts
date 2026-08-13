import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentsService } from './students.service';

@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @MessagePattern({ cmd: 'login_student' })
  async login(@Payload() data: any) {
    try {
      return await this.studentsService.login(data.registrationNo, data.password);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'change_password_student' })
  async changePassword(@Payload() data: any) {
    try {
      return await this.studentsService.changePassword(data.registrationNo, data.currentPassword, data.newPassword);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'admin_reset_password_student' })
  async adminResetPassword(@Payload() data: { StudentRegistrationId: number; UpdatedBy?: string }) {
    try {
      return await this.studentsService.adminResetPassword(
        data.StudentRegistrationId,
        data.UpdatedBy || 'Admin User',
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'create_student' })
  async create(@Payload() data: any) {
    try {
      return await this.studentsService.create(data);
    } catch (error: any) {
      // Return serializable error object to the gateway client
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_students' })
  async findAll() {
    try {
      return await this.studentsService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_student' })
  async findOne(@Payload() data: { StudentRegistrationId: number }) {
    try {
      return await this.studentsService.findOne(data.StudentRegistrationId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_student' })
  async update(@Payload() data: any) {
    try {
      const { StudentRegistrationId, ...updateData } = data;
      return await this.studentsService.update(StudentRegistrationId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'soft_delete_student' })
  async softDelete(@Payload() data: { StudentRegistrationId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.studentsService.softDelete(
        data.StudentRegistrationId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_soft_delete_students' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.studentsService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
