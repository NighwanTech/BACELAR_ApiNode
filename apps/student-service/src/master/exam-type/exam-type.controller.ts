import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExamTypeService } from './exam-type.service';

@Controller()
export class ExamTypeController {
  constructor(private readonly examTypeService: ExamTypeService) {}

  @MessagePattern({ cmd: 'create_exam_type' })
  async create(@Payload() data: any) {
    try {
      return await this.examTypeService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_exam_types' })
  async findAll() {
    try {
      return await this.examTypeService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_exam_type' })
  async findOne(@Payload() data: { examTypeId: number }) {
    try {
      return await this.examTypeService.findOne(data.examTypeId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_exam_type' })
  async update(@Payload() data: any) {
    try {
      const { examTypeId, ...updateData } = data;
      return await this.examTypeService.update(examTypeId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_exam_type' })
  async softDelete(
    @Payload() data: { examTypeId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.examTypeService.softDelete(
        data.examTypeId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
