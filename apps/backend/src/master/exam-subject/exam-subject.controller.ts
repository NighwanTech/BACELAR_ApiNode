import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateExamSubjectDto } from './dto/create-exam-subject.dto';
import { UpdateExamSubjectDto } from './dto/update-exam-subject.dto';

@ApiTags('Master - Exam Subject')
@Controller('master/exam-subjects')
export class ExamSubjectController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new exam subject entry' })
  @ApiResponse({ status: 201, description: 'Exam subject created successfully' })
  create(@Body() createExamSubjectDto: CreateExamSubjectDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_exam_subject' }, createExamSubjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active exam subjects (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all exam subjects' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_exam_subjects' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exam subject by examSubId' })
  @ApiResponse({ status: 200, description: 'Return exam subject' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_exam_subject' }, { examSubId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update exam subject by examSubId' })
  @ApiResponse({ status: 200, description: 'Exam subject updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamSubjectDto: UpdateExamSubjectDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_exam_subject' },
      { examSubId: id, ...updateExamSubjectDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an exam subject by examSubId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Correction required' })
  @ApiResponse({ status: 200, description: 'Exam subject soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_exam_subject' },
      { examSubId: id, DeletedBy, DeletedRemarks },
    );
  }
}
