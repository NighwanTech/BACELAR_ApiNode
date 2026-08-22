import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable, catchError, throwError } from 'rxjs';

import { VerifyEnrollmentDto } from './dto/verify-enrollment.dto';
import { CreateExamPasswordDto } from './dto/create-exam-password.dto';
import { ExamLoginDto } from './dto/exam-login.dto';
import { UpdateExamProfileDto } from './dto/update-exam-profile.dto';
import { SubmitExamFormDto } from './dto/submit-exam-form.dto';

@ApiTags('Student - Exam Portal & Login')
@Controller('students-exam-login')
export class ExamLoginController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  private handleError(error: any) {
    let status = Number(error?.statusCode || error?.status);
    if (!status || Number.isNaN(status) || status < 100 || status > 599) {
      status = HttpStatus.BAD_REQUEST;
    }
    const rawMessage = error?.message || error?.response?.message || error?.error || 'Request failed';
    const message = Array.isArray(rawMessage) ? rawMessage.join(', ') : String(rawMessage);
    return throwError(() => new HttpException(message, status));
  }

  @Post('verify-enrollment')
  @ApiOperation({ summary: 'Verify Enrollment No & Date of Birth for Registration Pop-up' })
  @ApiResponse({ status: 200, description: 'Return student snapshot details if verified' })
  verifyEnrollment(@Body() verifyDto: VerifyEnrollmentDto): Observable<any> {
    return this.studentClient.send({ cmd: 'verify_exam_enrollment' }, verifyDto).pipe(
      catchError((error) => this.handleError(error)),
    );
  }

  @Post('create-password')
  @ApiOperation({ summary: 'Create or Set password for Exam Portal Login' })
  @ApiResponse({ status: 201, description: 'Password created successfully' })
  createPassword(@Body() createPasswordDto: CreateExamPasswordDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_exam_password' }, createPasswordDto).pipe(
      catchError((error) => this.handleError(error)),
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Student Exam Portal Login' })
  @ApiResponse({ status: 200, description: 'Login successful, return token & student info' })
  login(@Body() loginDto: ExamLoginDto): Observable<any> {
    return this.studentClient.send({ cmd: 'exam_login' }, loginDto).pipe(
      catchError((error) => this.handleError(error)),
    );
  }

  @Get('dashboard/:studentId')
  @ApiOperation({ summary: 'Get Student Dashboard Data (Personal Info + Paper Details Table)' })
  @ApiResponse({ status: 200, description: 'Return student details and matching course papers table' })
  getDashboardData(@Param('studentId', ParseIntPipe) studentId: number): Observable<any> {
    return this.studentClient.send({ cmd: 'get_exam_dashboard_data' }, { studentId }).pipe(
      catchError((error) => this.handleError(error)),
    );
  }

  @Put('update-profile/:studentId')
  @ApiOperation({ summary: 'Update Student Profile (Email, Mobile, Address)' })
  @ApiResponse({ status: 200, description: 'Profile details updated successfully' })
  updateProfile(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Body() updateProfileDto: UpdateExamProfileDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_exam_profile' }, { studentId, ...updateProfileDto }).pipe(
      catchError((error) => this.handleError(error)),
    );
  }

  @Post('submit-form/:studentId')
  @ApiOperation({ summary: 'Submit Examination Form & Save Selected Papers' })
  @ApiResponse({ status: 200, description: 'Examination form submitted successfully' })
  submitForm(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Body() submitFormDto: SubmitExamFormDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'submit_exam_form' }, { studentId, ...submitFormDto }).pipe(
      catchError((error) => this.handleError(error)),
    );
  }
}
