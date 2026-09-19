import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExamLoginService } from './exam-login.service';

@Controller()
export class ExamLoginController {
  constructor(private readonly examLoginService: ExamLoginService) {}

  @MessagePattern({ cmd: 'verify_exam_enrollment' })
  verifyEnrollment(@Payload() payload: { enrollmentNo: string; dateOfBirth: string }) {
    return this.examLoginService.verifyEnrollment(payload);
  }

  @MessagePattern({ cmd: 'create_exam_password' })
  createPassword(@Payload() payload: { studentId: number; enrollmentId?: number; enrollmentNo: string; password: string }) {
    return this.examLoginService.createPassword(payload);
  }

  @MessagePattern({ cmd: 'exam_login' })
  login(@Payload() payload: { enrollmentNo: string; password: string }) {
    return this.examLoginService.login(payload);
  }

  @MessagePattern({ cmd: 'get_exam_dashboard_data' })
  getDashboardData(@Payload() payload: { studentId: number }) {
    return this.examLoginService.getDashboardData(payload.studentId);
  }

  @MessagePattern({ cmd: 'update_exam_profile' })
  updateProfile(@Payload() payload: { studentId: number; emailId?: string; mobileNo?: string; address?: string }) {
    return this.examLoginService.updateProfile(payload.studentId, payload);
  }

  @MessagePattern({ cmd: 'submit_exam_form' })
  submitForm(@Payload() payload: { studentId: number; selectedPapers: number[]; declarationAccepted: boolean }) {
    return this.examLoginService.submitForm(payload.studentId, payload);
  }
}
