import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentMarksService } from './student-marks.service';

@Controller()
export class StudentMarksController {
  constructor(private readonly marksService: StudentMarksService) {}

  @MessagePattern({ cmd: 'get_papers_list_marks' })
  getPapersList(
    @Payload()
    data: {
      academicSessionId?: number;
      examinationDetailId?: number;
      programId: number;
      yearId: number;
      semId?: number;
      marksType?: string;
    },
  ) {
    return this.marksService.getPapersList(data);
  }

  @MessagePattern({ cmd: 'get_paper_students_marks' })
  getPaperStudents(
    @Payload()
    data: {
      academicSessionId: number;
      examinationDetailId: number;
      programId: number;
      yearId: number;
      semId?: number;
      paperId: number;
      marksType?: string;
    },
  ) {
    return this.marksService.getPaperStudents(data);
  }

  @MessagePattern({ cmd: 'save_marks' })
  saveMarks(@Payload() data: any) {
    return this.marksService.saveMarks(data);
  }

  @MessagePattern({ cmd: 'unlock_marks' })
  unlockMarks(@Payload() data: { marksId: number; actor?: string }) {
    return this.marksService.unlockMarks(data.marksId, data.actor);
  }
}
