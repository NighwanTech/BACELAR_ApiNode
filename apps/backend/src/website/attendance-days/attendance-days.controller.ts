import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateAttendanceDaysDto } from './dto/create-attendance-days.dto';
import { UpdateAttendanceDaysDto } from './dto/update-attendance-days.dto';
import { BulkDeleteAttendanceDaysDto } from './dto/bulk-delete-attendance-days.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Website - Attendance Days')
@Controller('website/attendance-days')
export class AttendanceDaysController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new attendance days record' })
  @ApiResponse({ status: 201, description: 'Attendance days record created successfully' })
  create(@Body() createDto: CreateAttendanceDaysDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_attendance_days' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all attendance days records (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all attendance days records' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records' })
  @ApiQuery({ name: 'studentId', required: false, example: 1, description: 'Filter by studentId' })
  @ApiQuery({ name: 'studentEnrollmentId', required: false, example: 1, description: 'Filter by studentEnrollmentId' })
  @ApiQuery({ name: 'enrollmentId', required: false, example: 1, description: 'Filter by enrollmentId (alias)' })
  @ApiQuery({ name: 'academicSessionId', required: false, example: 1, description: 'Filter by academicSessionId' })
  @ApiQuery({ name: 'sessionId', required: false, example: 1, description: 'Filter by sessionId (Legacy alias)' })
  @ApiQuery({ name: 'programCategoryId', required: false, example: 1, description: 'Filter by programCategoryId' })
  @ApiQuery({ name: 'programId', required: false, example: 1, description: 'Filter by programId' })
  @ApiQuery({ name: 'yearId', required: false, example: 1, description: 'Filter by yearId' })
  @ApiQuery({ name: 'semId', required: false, example: 1, description: 'Filter by semId' })
  @ApiQuery({ name: 'monthId', required: false, example: 4, description: 'Filter by monthId' })
  @ApiQuery({ name: 'academicYearId', required: false, example: 1, description: 'Filter by academicYearId' })
  findAll(
    @Query('activeOnly') activeOnly?: string,
    @Query('studentId') studentId?: string,
    @Query('studentEnrollmentId') studentEnrollmentId?: string,
    @Query('enrollmentId') enrollmentId?: string,
    @Query('academicSessionId') academicSessionId?: string,
    @Query('sessionId') sessionId?: string,
    @Query('programCategoryId') programCategoryId?: string,
    @Query('programId') programId?: string,
    @Query('yearId') yearId?: string,
    @Query('semId') semId?: string,
    @Query('monthId') monthId?: string,
    @Query('academicYearId') academicYearId?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_all_attendance_days' },
      {
        activeOnly: parseActiveOnlyFlag(activeOnly),
        studentId: studentId ? parseInt(studentId, 10) : undefined,
        studentEnrollmentId: studentEnrollmentId ? parseInt(studentEnrollmentId, 10) : (enrollmentId ? parseInt(enrollmentId, 10) : undefined),
        enrollmentId: enrollmentId ? parseInt(enrollmentId, 10) : undefined,
        academicSessionId: academicSessionId ? parseInt(academicSessionId, 10) : (sessionId ? parseInt(sessionId, 10) : undefined),
        sessionId: sessionId ? parseInt(sessionId, 10) : undefined,
        programCategoryId: programCategoryId ? parseInt(programCategoryId, 10) : undefined,
        programId: programId ? parseInt(programId, 10) : undefined,
        yearId: yearId ? parseInt(yearId, 10) : undefined,
        semId: semId ? parseInt(semId, 10) : undefined,
        monthId: monthId ? parseInt(monthId, 10) : undefined,
        academicYearId: academicYearId ? parseInt(academicYearId, 10) : undefined,
      },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get attendance days details by attendanceDaysId' })
  @ApiResponse({ status: 200, description: 'Return attendance days details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_one_attendance_days' },
      { attendanceDaysId: id },
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update attendance days details by attendanceDaysId' })
  @ApiResponse({ status: 200, description: 'Attendance days updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAttendanceDaysDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_attendance_days' },
      { attendanceDaysId: id, ...updateDto },
    );
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_attendance_days' },
      { attendanceDaysId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete attendance days record by attendanceDaysId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete record' })
  @ApiResponse({ status: 200, description: 'Attendance days soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_attendance_days' },
      { attendanceDaysId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple attendance days records' })
  @ApiResponse({ status: 200, description: 'Attendance days records bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteAttendanceDaysDto): Observable<any> {
    return this.studentClient.send(
      { cmd: 'bulk_delete_attendance_days' },
      bulkDeleteDto,
    );
  }
}
