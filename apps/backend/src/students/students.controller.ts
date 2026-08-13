import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { BulkDeleteDto } from './dto/bulk-delete.dto';
import { ChangePasswordDto } from './dto/change-password.dto';


@ApiTags('Students') // Swagger Tag grouping
@Controller('students') // Base route: /api/v1/students
export class StudentsController {
  constructor(
    // Inject the TCP proxy client registered in AppModule
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login student using registration number and password' })
  @ApiResponse({ status: 200, description: 'Student authenticated successfully, returns JWT token' })
  login(@Body() loginStudentDto: LoginStudentDto): Observable<any> {
    // Send login request to student microservice via TCP
    return this.studentClient.send({ cmd: 'login_student' }, loginStudentDto);
  }

  @Post('change-password')
  @ApiOperation({ summary: 'Change student password using current and new password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  changePassword(@Body() changePasswordDto: ChangePasswordDto): Observable<any> {
    // Send change password request to student microservice via TCP
    return this.studentClient.send({ cmd: 'change_password_student' }, changePasswordDto);
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
    // Send register request to student microservice via TCP
    return this.studentClient.send({ cmd: 'create_student' }, createStudentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active students (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all active students' })
  findAll(): Observable<any> {
    // Request all students from student microservice
    return this.studentClient.send({ cmd: 'find_all_students' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single student details by StudentRegistrationId' })
  @ApiResponse({ status: 200, description: 'Return student details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    // Request single student by ID from microservice
    return this.studentClient.send({ cmd: 'find_one_student' }, { StudentRegistrationId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update student details by StudentRegistrationId' })
  @ApiResponse({ status: 200, description: 'Student updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Observable<any> {
    // Send update request to microservice
    return this.studentClient.send(
      { cmd: 'update_student' },
      { StudentRegistrationId: id, ...updateStudentDto },
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
    // Send soft delete request to microservice with audit info
    return this.studentClient.send(
      { cmd: 'soft_delete_student' },
      { StudentRegistrationId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple students' })
  @ApiResponse({ status: 200, description: 'Students bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteDto): Observable<any> {
    // Send bulk soft delete request to microservice
    return this.studentClient.send({ cmd: 'bulk_soft_delete_students' }, bulkDeleteDto);
  }
}
