import { Body, Controller, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { SaveAttendanceDto } from './dto/save-attendance.dto';

@ApiTags('Master - Exam Attendance')
@Controller('master/exam-attendances')
export class StudentAttendanceController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Get('scheme-dates')
  @ApiOperation({ summary: 'Get available exam dates, times, and shifts from exam scheme' })
  @ApiQuery({ name: 'academicSessionId', required: false })
  @ApiQuery({ name: 'examinationDetailId', required: false })
  @ApiQuery({ name: 'programId', required: false })
  @ApiResponse({ status: 200, description: 'List of exam scheme dates' })
  getSchemeDates(
    @Query('academicSessionId') academicSessionId?: string,
    @Query('examinationDetailId') examinationDetailId?: string,
    @Query('programId') programId?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'get_scheme_dates_attendance' },
      {
        academicSessionId: academicSessionId ? Number(academicSessionId) : undefined,
        examinationDetailId: examinationDetailId ? Number(examinationDetailId) : undefined,
        programId: programId ? Number(programId) : undefined,
      },
    );
  }

  @Get('paper-students')
  @ApiOperation({ summary: 'Get autofilled paper details and student attendance list' })
  @ApiQuery({ name: 'academicSessionId', required: true })
  @ApiQuery({ name: 'examinationDetailId', required: true })
  @ApiQuery({ name: 'programId', required: true })
  @ApiQuery({ name: 'examDate', required: true })
  @ApiQuery({ name: 'examTime', required: false })
  @ApiQuery({ name: 'shift', required: false })
  @ApiResponse({ status: 200, description: 'Paper details and student list' })
  getPaperDetailsAndStudents(
    @Query('academicSessionId') academicSessionId: string,
    @Query('examinationDetailId') examinationDetailId: string,
    @Query('programId') programId: string,
    @Query('examDate') examDate: string,
    @Query('examTime') examTime?: string,
    @Query('shift') shift?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'get_paper_students_attendance' },
      {
        academicSessionId: Number(academicSessionId),
        examinationDetailId: Number(examinationDetailId),
        programId: Number(programId),
        examDate,
        examTime,
        shift,
      },
    );
  }

  @Post('save')
  @ApiOperation({ summary: 'Save and lock exam attendance' })
  @ApiResponse({ status: 201, description: 'Attendance saved and locked' })
  saveAttendance(@Body() saveDto: SaveAttendanceDto): Observable<any> {
    return this.studentClient.send({ cmd: 'save_attendance' }, saveDto);
  }

  @Patch(':id/unlock')
  @ApiOperation({ summary: 'Unlock attendance for editing (Super Admin)' })
  @ApiQuery({ name: 'actor', required: false, example: 'Super Admin' })
  @ApiResponse({ status: 200, description: 'Attendance unlocked' })
  unlockAttendance(
    @Param('id', ParseIntPipe) id: number,
    @Query('actor') actor?: string,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'unlock_attendance' }, { attendanceId: id, actor });
  }
}
