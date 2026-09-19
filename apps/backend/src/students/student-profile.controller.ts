import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { BulkDeleteProfilesDto } from './dto/bulk-delete-profiles.dto';

@ApiTags('Students - Profiles')
@Controller('students/profiles')
export class StudentProfileController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new student profile entry' })
  @ApiResponse({ status: 201, description: 'Profile created successfully' })
  create(@Body() createDto: CreateStudentProfileDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_student_profile' }, createDto);
  }

  @Get(':studentId')
  @ApiOperation({ summary: 'Get student profile details by studentId' })
  @ApiResponse({ status: 200, description: 'Return profile details' })
  findOne(@Param('studentId', ParseIntPipe) studentId: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_student_profile' }, { studentId });
  }

  @Put(':studentId')
  @ApiOperation({ summary: 'Update student profile details by studentId' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  update(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Body() updateDto: UpdateStudentProfileDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_student_profile' }, { studentId, ...updateDto });
  }

  @Delete(':studentId')
  @ApiOperation({ summary: 'Soft delete student profile by studentId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Left institute' })
  @ApiResponse({ status: 200, description: 'Profile soft deleted successfully' })
  remove(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_student_profile' },
      { studentId, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple student profiles' })
  @ApiResponse({ status: 200, description: 'Profiles bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteProfilesDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_student_profiles' }, bulkDeleteDto);
  }
}
