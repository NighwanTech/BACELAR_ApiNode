import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { BulkDeleteDto } from './dto/bulk-delete.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AdminSetPasswordDto } from './dto/admin-set-password.dto';
import { UpdateStatusDto } from '../common/dto/update-status.dto';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post('check-availability')
  @ApiOperation({ summary: 'Check if email or mobile number already exists' })
  @ApiResponse({ status: 200, description: 'Availability status for email and mobile' })
  checkAvailability(@Body() body: { email?: string; mobileNo?: string }): Observable<any> {
    return this.studentClient.send({ cmd: 'check_student_availability' }, body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login student using registration number and password' })
  @ApiResponse({ status: 200, description: 'Student authenticated successfully, returns JWT token' })
  login(@Body() loginStudentDto: LoginStudentDto): Observable<any> {
    return this.studentClient.send({ cmd: 'login_student' }, loginStudentDto);
  }

  @Post('change-password')
  @ApiOperation({ summary: 'Change student password using current and new password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  changePassword(@Body() changePasswordDto: ChangePasswordDto): Observable<any> {
    return this.studentClient.send({ cmd: 'change_password_student' }, changePasswordDto);
  }

  @Post('admin-set-password')
  @ApiOperation({ summary: 'Admin set student login password by registration number (no current password)' })
  @ApiResponse({ status: 200, description: 'Password updated' })
  adminSetPassword(@Body() dto: AdminSetPasswordDto): Observable<any> {
    return this.studentClient.send({ cmd: 'admin_set_password_student' }, dto);
  }

  @Post(':id/reset-password')
  @ApiOperation({
    summary: 'Admin reset student password — returns new plainTextPassword once (original is not recoverable)',
  })
  @ApiResponse({ status: 200, description: 'Password reset; plainTextPassword returned once' })
  adminResetPassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() body?: { UpdatedBy?: string },
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'admin_reset_password_student' },
      { StudentRegistrationId: id, UpdatedBy: body?.UpdatedBy || 'Admin User' },
    );
  }

  @Post()
  @ApiOperation({ summary: 'Register/Create a new student' })
  @ApiResponse({ status: 201, description: 'Student registered successfully' })
  create(@Body() createStudentDto: CreateStudentDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_student' }, createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active students (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all active students' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_students' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single student details by StudentRegistrationId' })
  @ApiResponse({ status: 200, description: 'Return student details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_student' }, { StudentRegistrationId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update student details by StudentRegistrationId' })
  @ApiResponse({ status: 200, description: 'Student updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_student' },
      { StudentRegistrationId: id, ...updateStudentDto },
    );
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update student active/inactive status (also syncs loginMaster)' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_student' },
      { StudentRegistrationId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a student by StudentRegistrationId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Left college' })
  @ApiResponse({ status: 200, description: 'Student soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'soft_delete_student' },
      { StudentRegistrationId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple students' })
  @ApiResponse({ status: 200, description: 'Students bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_soft_delete_students' }, bulkDeleteDto);
  }
}
