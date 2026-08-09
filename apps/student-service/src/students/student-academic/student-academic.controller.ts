import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentAcademicService } from './student-academic.service';

@Controller()
export class StudentAcademicController {
  constructor(private readonly academicService: StudentAcademicService) {}

  @MessagePattern({ cmd: 'save_student_academic_details' })
  async save(
    @Payload()
    data: {
      studentId: number;
      qualifications: any[];
      CreatedBy: string;
      programId: number;
    },
  ) {
    try {
      return await this.academicService.save(
        data.studentId,
        data.qualifications,
        data.CreatedBy,
        data.programId,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_academic_details' })
  async findAll() {
    try {
      return await this.academicService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_academic_detail' })
  async findOne(@Payload() data: { academicDetailId: number }) {
    try {
      return await this.academicService.findOne(data.academicDetailId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_academic_details_by_student' })
  async findByStudent(@Payload() data: { studentId: number }) {
    try {
      return await this.academicService.findByStudent(data.studentId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_academic_detail' })
  async update(@Payload() data: any) {
    try {
      const { academicDetailId, ...updateData } = data;
      return await this.academicService.update(academicDetailId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_academic_detail' })
  async softDelete(@Payload() data: { academicDetailId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.academicService.softDelete(
        data.academicDetailId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_academic_details' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.academicService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
