import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExamSubjectService } from './exam-subject.service';

@Controller()
export class ExamSubjectController {
  constructor(private readonly examSubjectService: ExamSubjectService) {}

  @MessagePattern({ cmd: 'create_exam_subject' })
  async create(@Payload() data: any) {
    try {
      return await this.examSubjectService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_exam_subjects' })
  async findAll() {
    try {
      return await this.examSubjectService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_exam_subject' })
  async findOne(@Payload() data: { examSubId: number }) {
    try {
      return await this.examSubjectService.findOne(data.examSubId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_exam_subject' })
  async update(@Payload() data: any) {
    try {
      const { examSubId, ...updateData } = data;
      return await this.examSubjectService.update(examSubId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_exam_subject' })
  async softDelete(
    @Payload() data: { examSubId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.examSubjectService.softDelete(
        data.examSubId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
