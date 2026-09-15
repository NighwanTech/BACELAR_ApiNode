import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExamGrevianceService } from './exam-greviance.service';

@Controller()
export class ExamGrevianceController {
  constructor(private readonly examGrevianceService: ExamGrevianceService) {}

  @MessagePattern({ cmd: 'lookup_exam_greviance_by_roll' })
  async lookup(@Payload() data: { rollNo?: string }) {
    try {
      return await this.examGrevianceService.lookupByRoll(data?.rollNo || '');
    } catch (error: any) {
      return { status: 'error', message: error?.message || 'Lookup failed' };
    }
  }

  @MessagePattern({ cmd: 'create_exam_greviance' })
  async create(@Payload() data: any) {
    try {
      return await this.examGrevianceService.create(data || {});
    } catch (error: any) {
      return { status: 'error', message: error?.message || 'Create failed' };
    }
  }

  @MessagePattern({ cmd: 'find_all_exam_greviances' })
  async findAll(@Payload() data: any) {
    try {
      return await this.examGrevianceService.findAll(data || {});
    } catch (error: any) {
      return { status: 'error', message: error?.message || 'Find all failed' };
    }
  }

  @MessagePattern({ cmd: 'find_one_exam_greviance' })
  async findOne(@Payload() data: { examGrevianceApplicationId: number }) {
    try {
      return await this.examGrevianceService.findOne(
        Number(data.examGrevianceApplicationId),
      );
    } catch (error: any) {
      return { status: 'error', message: error?.message || 'Find one failed' };
    }
  }

  @MessagePattern({ cmd: 'update_application_status_exam_greviance' })
  async updateApplicationStatus(
    @Payload()
    data: {
      examGrevianceApplicationId: number;
      status: string;
      UpdatedBy: string;
      Remarks?: string;
    },
  ) {
    try {
      return await this.examGrevianceService.updateApplicationStatus(
        Number(data.examGrevianceApplicationId),
        data.status,
        data.UpdatedBy,
        data.Remarks,
      );
    } catch (error: any) {
      return {
        status: 'error',
        message: error?.message || 'Update application status failed',
      };
    }
  }
}
