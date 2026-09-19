import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateAcademicSubjectDto } from './dto/create-academic-subject.dto';
import { UpdateAcademicSubjectDto } from './dto/update-academic-subject.dto';
import { BulkDeleteAcademicSubjectsDto } from './dto/bulk-delete-academic-subjects.dto';

@ApiTags('Students - Academic Subject Marks')
@Controller('students-academic-subjects')
export class StudentAcademicSubjectController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a new subject mark entry' })
  @ApiResponse({ status: 201, description: 'Subject mark entry created successfully' })
  create(@Body() createDto: CreateAcademicSubjectDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_academic_subject' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subject mark entries' })
  @ApiResponse({ status: 200, description: 'Return all subject marks' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_academic_subjects' }, {});
  }

  @Get('detail/:academicDetailId')
  @ApiOperation({ summary: 'Get all subject mark entries for a specific qualification detail ID' })
  @ApiResponse({ status: 200, description: 'Return subject marks list' })
  findByAcademicDetail(@Param('academicDetailId', ParseIntPipe) academicDetailId: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_academic_subjects_by_detail' }, { academicDetailId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific subject mark details by ID' })
  @ApiResponse({ status: 200, description: 'Return subject mark details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_academic_subject' }, { studentAcademicSubjectId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific subject mark entry by ID' })
  @ApiResponse({ status: 200, description: 'Subject mark entry updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAcademicSubjectDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_academic_subject' }, { studentAcademicSubjectId: id, ...updateDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete subject mark entry by ID' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Correction entry' })
  @ApiResponse({ status: 200, description: 'Subject mark soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_academic_subject' },
      { studentAcademicSubjectId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple subject mark entries' })
  @ApiResponse({ status: 200, description: 'Subject marks bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteAcademicSubjectsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_academic_subjects' }, bulkDeleteDto);
  }
}
