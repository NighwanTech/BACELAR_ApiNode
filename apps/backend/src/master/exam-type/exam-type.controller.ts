import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateExamTypeDto } from './dto/create-exam-type.dto';
import { UpdateExamTypeDto } from './dto/update-exam-type.dto';

@ApiTags('Master - Exam Types')
@Controller('master/exam-types')
export class ExamTypeController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new exam type master entry' })
  @ApiResponse({ status: 201, description: 'Exam type created successfully' })
  create(@Body() createExamTypeDto: CreateExamTypeDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_exam_type' }, createExamTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active exam types (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all exam types' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_exam_types' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exam type details by examTypeId' })
  @ApiResponse({ status: 200, description: 'Return exam type details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_exam_type' }, { examTypeId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update exam type details by examTypeId' })
  @ApiResponse({ status: 200, description: 'Exam type updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExamTypeDto: UpdateExamTypeDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_exam_type' },
      { examTypeId: id, ...updateExamTypeDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an exam type by examTypeId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Exam type soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_exam_type' },
      { examTypeId: id, DeletedBy, DeletedRemarks },
    );
  }
}
