import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentAttendanceService } from './student-attendance.service';

@Controller()
export class StudentAttendanceController {
  constructor(private readonly attendanceService: StudentAttendanceService) {}

  @MessagePattern({ cmd: 'get_scheme_dates_attendance' })
  getSchemeDates(@Payload() data: { academicSessionId?: number; examinationDetailId?: number; programId?: number }) {
    return this.attendanceService.getSchemeDates(data);
  }

  @MessagePattern({ cmd: 'get_paper_students_attendance' })
  getPaperDetailsAndStudents(
    @Payload()
    data: {
      academicSessionId: number;
      examinationDetailId: number;
      programId: number;
      examDate: string;
      examTime?: string;
      shift?: string;
    },
  ) {
    return this.attendanceService.getPaperDetailsAndStudents(data);
  }

  @MessagePattern({ cmd: 'save_attendance' })
  saveAttendance(@Payload() data: any) {
    return this.attendanceService.saveAttendance(data);
  }

  @MessagePattern({ cmd: 'unlock_attendance' })
  unlockAttendance(@Payload() data: { attendanceId: number; actor?: string }) {
    return this.attendanceService.unlockAttendance(data.attendanceId, data.actor);
  }
}
