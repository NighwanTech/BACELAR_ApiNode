import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentProfileService } from './student-profile.service';

@Controller()
export class StudentProfileController {
  constructor(private readonly studentProfileService: StudentProfileService) {}

  @MessagePattern({ cmd: 'create_student_profile' })
  async create(@Payload() data: any) {
    try {
      return await this.studentProfileService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_student_profile' })
  async findOne(@Payload() data: { studentId: number }) {
    try {
      return await this.studentProfileService.findOne(data.studentId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_student_profile' })
  async update(@Payload() data: any) {
    try {
      const { studentId, ...updateData } = data;
      return await this.studentProfileService.update(studentId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_student_profile' })
  async softDelete(@Payload() data: { studentId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.studentProfileService.softDelete(
        data.studentId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_student_profiles' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.studentProfileService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
