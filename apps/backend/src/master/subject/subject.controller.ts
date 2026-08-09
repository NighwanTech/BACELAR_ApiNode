import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@ApiTags('Master - Subjects')
@Controller('master/subjects')
export class SubjectController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subject master entry' })
  @ApiResponse({ status: 201, description: 'Subject created successfully' })
  create(@Body() createSubjectDto: CreateSubjectDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_subject' }, createSubjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active subjects with optional filters' })
  @ApiQuery({ name: 'classType', required: false, example: '12th' })
  @ApiQuery({ name: 'stream', required: false, example: 'COMMERCE' })
  @ApiResponse({ status: 200, description: 'Return all subjects' })
  findAll(
    @Query('classType') classType?: string,
    @Query('stream') stream?: string,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_subjects' }, { classType, stream });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subject details by subjectId' })
  @ApiResponse({ status: 200, description: 'Return subject details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_subject' }, { subjectId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update subject details by subjectId' })
  @ApiResponse({ status: 200, description: 'Subject updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_subject' }, { subjectId: id, ...updateSubjectDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a subject by subjectId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Subject soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_subject' },
      { subjectId: id, DeletedBy, DeletedRemarks },
    );
  }
}
