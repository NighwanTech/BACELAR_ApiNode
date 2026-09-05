import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExamResultService } from './exam-result.service';

@Controller()
export class ExamResultController {
  constructor(private readonly examResultService: ExamResultService) {}

  @MessagePattern({ cmd: 'create_exam_result' })
  async create(@Payload() data: any) {
    try {
      return await this.examResultService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_exam_results' })
  async findAll(@Payload() data?: any) {
    try {
      return await this.examResultService.findAll(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_exam_result' })
  async findOne(@Payload() data: { examResultId: number }) {
    try {
      return await this.examResultService.findOne(data.examResultId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_exam_results_by_student' })
  async findByStudent(@Payload() data: { studentId: number } & Record<string, any>) {
    try {
      const { studentId, ...filters } = data;
      return await this.examResultService.findByStudent(studentId, filters);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_exam_result' })
  async update(@Payload() data: any) {
    try {
      const { examResultId, ...updateData } = data;
      return await this.examResultService.update(examResultId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_exam_result' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.examResultService.updateStatus(
        data.examResultId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_exam_result' })
  async softDelete(
    @Payload() data: { examResultId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.examResultService.softDelete(
        data.examResultId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_exam_results' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.examResultService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
