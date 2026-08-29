import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExamAdmitCardService } from './exam-admit-card.service';

@Controller()
export class ExamAdmitCardController {
  constructor(private readonly admitCardService: ExamAdmitCardService) {}

  @MessagePattern({ cmd: 'list_exam_admit_cards' })
  async list(@Payload() data: any) {
    try {
      return await this.admitCardService.list(data || {});
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_exam_admit_card' })
  async findOne(@Payload() data: { studentExamId: number }) {
    try {
      return await this.admitCardService.findOne(Number(data.studentExamId));
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
