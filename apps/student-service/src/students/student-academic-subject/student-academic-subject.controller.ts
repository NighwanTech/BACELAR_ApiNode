import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentAcademicSubjectService } from './student-academic-subject.service';

@Controller()
export class StudentAcademicSubjectController {
  constructor(private readonly subjectService: StudentAcademicSubjectService) {}

  @MessagePattern({ cmd: 'create_academic_subject' })
  async create(@Payload() data: any) {
    try {
      return await this.subjectService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_academic_subjects' })
  async findAll() {
    try {
      return await this.subjectService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_academic_subject' })
  async findOne(@Payload() data: { studentAcademicSubjectId: number }) {
    try {
      return await this.subjectService.findOne(data.studentAcademicSubjectId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_academic_subjects_by_detail' })
  async findByAcademicDetail(@Payload() data: { academicDetailId: number }) {
    try {
      return await this.subjectService.findByAcademicDetail(data.academicDetailId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_academic_subject' })
  async update(@Payload() data: any) {
    try {
      const { studentAcademicSubjectId, ...updateData } = data;
      return await this.subjectService.update(studentAcademicSubjectId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_academic_subject' })
  async softDelete(@Payload() data: { studentAcademicSubjectId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.subjectService.softDelete(
        data.studentAcademicSubjectId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_academic_subjects' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.subjectService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
