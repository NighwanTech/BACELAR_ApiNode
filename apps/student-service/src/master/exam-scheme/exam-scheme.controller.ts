import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExamSchemeService } from './exam-scheme.service';

@Controller()
export class ExamSchemeController {
  constructor(private readonly examSchemeService: ExamSchemeService) {}

  @MessagePattern({ cmd: 'preview_exam_scheme' })
  async preview(@Payload() data: any) {
    try {
      return await this.examSchemeService.preview(data || {});
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'save_exam_scheme' })
  async save(@Payload() data: any) {
    try {
      return await this.examSchemeService.save(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_exam_schemes' })
  async findAll() {
    try {
      return await this.examSchemeService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_exam_scheme' })
  async findOne(@Payload() data: { examSchemeId: number }) {
    try {
      return await this.examSchemeService.findOne(data.examSchemeId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_exam_scheme' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.examSchemeService.updateStatus(
        data.examSchemeId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_exam_scheme' })
  async remove(
    @Payload() data: { examSchemeId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.examSchemeService.remove(
        data.examSchemeId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
