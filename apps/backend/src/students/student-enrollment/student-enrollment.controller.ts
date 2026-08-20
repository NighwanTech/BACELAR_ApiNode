import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateStudentEnrollmentDto } from './dto/create-student-enrollment.dto';
import { ConfirmStudentEnrollmentDto } from './dto/confirm-student-enrollment.dto';
import { UpdateStudentEnrollmentDto } from './dto/update-student-enrollment.dto';
import { BulkDeleteStudentEnrollmentsDto } from './dto/bulk-delete-student-enrollments.dto';

@ApiTags('Student - Enrollments')
@Controller('students-enrollments')
export class StudentEnrollmentController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new student enrollment record' })
  @ApiResponse({ status: 201, description: 'Enrollment record created successfully' })
  create(@Body() createDto: CreateStudentEnrollmentDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_student_enrollment' }, createDto);
  }

  @Post('confirm')
  @ApiOperation({ summary: 'Confirm admission: snapshot student data and generate unique enrollment no' })
  @ApiResponse({ status: 201, description: 'Enrollment confirmed / already exists' })
  confirm(@Body() confirmDto: ConfirmStudentEnrollmentDto): Observable<any> {
    return this.studentClient.send({ cmd: 'confirm_student_enrollment' }, confirmDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all student enrollment records' })
  @ApiResponse({ status: 200, description: 'Return all enrollments' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_student_enrollments' }, {});
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Get all enrollment records for a specific Student Registration ID' })
  @ApiResponse({ status: 200, description: 'Return student enrollments' })
  findByStudent(@Param('studentId', ParseIntPipe) studentId: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_student_enrollments_by_student' }, { studentId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get enrollment details by ID' })
  @ApiResponse({ status: 200, description: 'Return enrollment details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_student_enrollment' }, { enrollmentId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update student enrollment record' })
  @ApiResponse({ status: 200, description: 'Enrollment record updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateStudentEnrollmentDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_student_enrollment' }, { enrollmentId: id, ...updateDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete enrollment record by ID' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Duplicate enrollment' })
  @ApiResponse({ status: 200, description: 'Enrollment record soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_student_enrollment' },
      { enrollmentId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple enrollment records' })
  @ApiResponse({ status: 200, description: 'Enrollment records bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteStudentEnrollmentsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_student_enrollments' }, bulkDeleteDto);
  }
}
