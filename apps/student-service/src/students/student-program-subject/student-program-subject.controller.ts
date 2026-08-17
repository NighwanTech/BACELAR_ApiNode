import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentProgramSubjectService } from './student-program-subject.service';

@Controller()
export class StudentProgramSubjectController {
  constructor(private readonly programSubjectService: StudentProgramSubjectService) {}

  @MessagePattern({ cmd: 'save_student_program_subjects' })
  async save(
    @Payload()
    data: {
      studentId: number;
      programSubjectIds: number[];
      CreatedBy: string;
    },
  ) {
    try {
      return await this.programSubjectService.saveForStudent(
        data.studentId,
        data.programSubjectIds,
        data.CreatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_student_program_subjects_by_student' })
  async findByStudent(@Payload() data: { studentId: number }) {
    try {
      return await this.programSubjectService.findByStudent(data.studentId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
