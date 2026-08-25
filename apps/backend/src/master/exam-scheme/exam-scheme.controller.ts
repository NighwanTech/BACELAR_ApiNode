import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { SaveExamSchemeDto } from './dto/save-exam-scheme.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';

@ApiTags('Master - Exam Scheme')
@Controller('master/exam-schemes')
export class ExamSchemeController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Get('preview')
  @ApiOperation({ summary: 'Preview exam scheme papers from paper master + saved dates' })
  @ApiQuery({ name: 'examinationDetailId', required: true, example: 1 })
  @ApiQuery({ name: 'programId', required: true, example: 1 })
  @ApiQuery({ name: 'yearId', required: true, example: 1 })
  @ApiQuery({ name: 'semId', required: false, example: 1 })
  @ApiResponse({ status: 200, description: 'Return exam scheme preview rows' })
  preview(
    @Query('examinationDetailId') examinationDetailId?: string,
    @Query('programId') programId?: string,
    @Query('yearId') yearId?: string,
    @Query('semId') semId?: string,
    @Query('academicSessionId') academicSessionId?: string,
    @Query('programCategoryId') programCategoryId?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'preview_exam_scheme' },
      {
        examinationDetailId: Number(examinationDetailId),
        programId: Number(programId),
        yearId: Number(yearId),
        semId: semId ? Number(semId) : undefined,
        academicSessionId: academicSessionId ? Number(academicSessionId) : undefined,
        programCategoryId: programCategoryId ? Number(programCategoryId) : undefined,
      },
    );
  }

  @Post('save')
  @ApiOperation({ summary: 'Create or update exam scheme with paper date/time/shift' })
  @ApiResponse({ status: 201, description: 'Exam scheme saved successfully' })
  save(@Body() saveDto: SaveExamSchemeDto): Observable<any> {
    return this.studentClient.send({ cmd: 'save_exam_scheme' }, saveDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exam schemes' })
  @ApiResponse({ status: 200, description: 'Return all exam schemes' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_exam_schemes' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exam scheme by id' })
  @ApiResponse({ status: 200, description: 'Return exam scheme' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_exam_scheme' }, { examSchemeId: id });
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_exam_scheme' },
      { examSchemeId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete exam scheme' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false })
  @ApiResponse({ status: 200, description: 'Exam scheme deleted' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_exam_scheme' },
      { examSchemeId: id, DeletedBy, DeletedRemarks },
    );
  }
}
