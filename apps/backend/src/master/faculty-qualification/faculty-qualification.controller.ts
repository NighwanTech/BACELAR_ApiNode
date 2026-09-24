import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateFacultyQualificationDto } from './dto/create-faculty-qualification.dto';
import { UpdateFacultyQualificationDto } from './dto/update-faculty-qualification.dto';
import { BulkDeleteFacultyQualificationsDto } from './dto/bulk-delete-faculty-qualifications.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Faculty Qualifications')
@Controller('master/faculty-qualifications')
export class FacultyQualificationController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new faculty qualification entry' })
  @ApiResponse({ status: 201, description: 'Faculty Qualification created successfully' })
  create(@Body() createDto: CreateFacultyQualificationDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_faculty_qualification' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active faculty qualifications (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all faculty qualifications' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_all_faculty_qualifications' },
      { activeOnly: parseActiveOnlyFlag(activeOnly) },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get faculty qualification details by facultyQualificationId' })
  @ApiResponse({ status: 200, description: 'Return faculty qualification details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_faculty_qualification' }, { facultyQualificationId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update faculty qualification details by facultyQualificationId' })
  @ApiResponse({ status: 200, description: 'Faculty Qualification updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateFacultyQualificationDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_faculty_qualification' },
      { facultyQualificationId: id, ...updateDto },
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
      { cmd: 'update_status_faculty_qualification' },
      { facultyQualificationId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an faculty qualification by facultyQualificationId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete faculty qualification' })
  @ApiResponse({ status: 200, description: 'Faculty Qualification soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_faculty_qualification' },
      { facultyQualificationId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple faculty qualifications' })
  @ApiResponse({ status: 200, description: 'Faculty Qualifications bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteFacultyQualificationsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_faculty_qualifications' }, bulkDeleteDto);
  }
}
