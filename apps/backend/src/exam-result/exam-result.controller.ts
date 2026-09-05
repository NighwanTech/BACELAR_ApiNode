import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateExamResultDto } from './dto/create-exam-result.dto';
import { UpdateExamResultDto } from './dto/update-exam-result.dto';
import { BulkDeleteExamResultsDto } from './dto/bulk-delete-exam-results.dto';
import { UpdateStatusDto } from '../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../common/parse-active-only';

@ApiTags('Exam Results')
@Controller('exam-results')
export class ExamResultController {
  constructor(
    @Inject('EXAM_RESULT_SERVICE') private readonly examResultClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new exam result row (student + paper)' })
  @ApiResponse({ status: 201, description: 'Exam result created successfully' })
  create(@Body() createDto: CreateExamResultDto): Observable<any> {
    return this.examResultClient.send({ cmd: 'create_exam_result' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'List exam results. Master table: omit activeOnly. Dropdowns: activeOnly=true.' })
  @ApiQuery({ name: 'academicSessionId', required: false })
  @ApiQuery({ name: 'examinationDetailId', required: false })
  @ApiQuery({ name: 'programId', required: false })
  @ApiQuery({ name: 'programCategoryId', required: false })
  @ApiQuery({ name: 'yearId', required: false })
  @ApiQuery({ name: 'semId', required: false })
  @ApiQuery({ name: 'examTypeId', required: false })
  @ApiQuery({ name: 'studentId', required: false })
  @ApiQuery({ name: 'paperId', required: false })
  @ApiQuery({ name: 'enrolmentNo', required: false })
  @ApiQuery({ name: 'rollNo', required: false })
  @ApiQuery({ name: 'activeOnly', required: false, example: true })
  @ApiResponse({ status: 200, description: 'Return exam results' })
  findAll(
    @Query('academicSessionId') academicSessionId?: string,
    @Query('examinationDetailId') examinationDetailId?: string,
    @Query('programId') programId?: string,
    @Query('programCategoryId') programCategoryId?: string,
    @Query('yearId') yearId?: string,
    @Query('semId') semId?: string,
    @Query('examTypeId') examTypeId?: string,
    @Query('studentId') studentId?: string,
    @Query('paperId') paperId?: string,
    @Query('enrolmentNo') enrolmentNo?: string,
    @Query('rollNo') rollNo?: string,
    @Query('activeOnly') activeOnly?: string,
  ): Observable<any> {
    const payload: Record<string, any> = {
      activeOnly: parseActiveOnlyFlag(activeOnly),
    };
    const ids: Record<string, string | undefined> = {
      academicSessionId,
      examinationDetailId,
      programId,
      programCategoryId,
      yearId,
      semId,
      examTypeId,
      studentId,
      paperId,
    };
    for (const [key, value] of Object.entries(ids)) {
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        payload[key] = Number(value);
      }
    }
    if (enrolmentNo) payload.enrolmentNo = enrolmentNo;
    if (rollNo) payload.rollNo = rollNo;
    return this.examResultClient.send({ cmd: 'find_all_exam_results' }, payload);
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete exam results' })
  @ApiResponse({ status: 200, description: 'Exam results bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteExamResultsDto): Observable<any> {
    return this.examResultClient.send({ cmd: 'bulk_delete_exam_results' }, bulkDeleteDto);
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Get all exam result rows for a particular student' })
  @ApiQuery({ name: 'academicSessionId', required: false })
  @ApiQuery({ name: 'examinationDetailId', required: false })
  @ApiQuery({ name: 'programId', required: false })
  @ApiQuery({ name: 'yearId', required: false })
  @ApiQuery({ name: 'semId', required: false })
  @ApiResponse({ status: 200, description: 'Return student exam results' })
  findByStudent(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Query('academicSessionId') academicSessionId?: string,
    @Query('examinationDetailId') examinationDetailId?: string,
    @Query('programId') programId?: string,
    @Query('yearId') yearId?: string,
    @Query('semId') semId?: string,
  ): Observable<any> {
    const payload: Record<string, any> = { studentId };
    const ids: Record<string, string | undefined> = {
      academicSessionId,
      examinationDetailId,
      programId,
      yearId,
      semId,
    };
    for (const [key, value] of Object.entries(ids)) {
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        payload[key] = Number(value);
      }
    }
    return this.examResultClient.send({ cmd: 'find_exam_results_by_student' }, payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exam result by examResultId' })
  @ApiResponse({ status: 200, description: 'Return exam result details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.examResultClient.send({ cmd: 'find_one_exam_result' }, { examResultId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update exam result by examResultId' })
  @ApiResponse({ status: 200, description: 'Exam result updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateExamResultDto,
  ): Observable<any> {
    return this.examResultClient.send(
      { cmd: 'update_exam_result' },
      { examResultId: id, ...updateDto },
    );
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.examResultClient.send(
      { cmd: 'update_status_exam_result' },
      { examResultId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete exam result by examResultId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Exam result soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.examResultClient.send(
      { cmd: 'delete_exam_result' },
      { examResultId: id, DeletedBy, DeletedRemarks },
    );
  }
}
