import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentEnrollmentService } from './student-enrollment.service';

@Controller()
export class StudentEnrollmentController {
  constructor(private readonly enrollmentService: StudentEnrollmentService) {}

  @MessagePattern({ cmd: 'create_student_enrollment' })
  async create(@Payload() data: any) {
    try {
      return await this.enrollmentService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'confirm_student_enrollment' })
  async confirm(@Payload() data: any) {
    try {
      return await this.enrollmentService.confirm(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_student_enrollments' })
  async findAll() {
    try {
      return await this.enrollmentService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_student_enrollment' })
  async findOne(@Payload() data: { enrollmentId: number }) {
    try {
      return await this.enrollmentService.findOne(data.enrollmentId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_student_enrollments_by_student' })
  async findByStudent(@Payload() data: { studentId: number }) {
    try {
      return await this.enrollmentService.findByStudent(data.studentId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_student_enrollment' })
  async update(@Payload() data: any) {
    try {
      const { enrollmentId, ...updateData } = data;
      return await this.enrollmentService.update(enrollmentId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_student_enrollment' })
  async softDelete(@Payload() data: { enrollmentId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.enrollmentService.softDelete(
        data.enrollmentId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_student_enrollments' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.enrollmentService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
