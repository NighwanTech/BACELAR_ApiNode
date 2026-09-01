import { Body, Controller, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { SaveMarksDto } from './dto/save-marks.dto';

@ApiTags('Master - Exam Marks')
@Controller('master/exam-marks')
export class StudentMarksController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Get('papers')
  @ApiOperation({ summary: 'Get list of papers for selected criteria with Enter/Update status' })
  @ApiQuery({ name: 'academicSessionId', required: false })
  @ApiQuery({ name: 'examinationDetailId', required: false })
  @ApiQuery({ name: 'programId', required: true })
  @ApiQuery({ name: 'yearId', required: true })
  @ApiQuery({ name: 'semId', required: false })
  @ApiQuery({ name: 'marksTypeId', required: false })
  @ApiQuery({ name: 'marksType', required: false, example: 'THEORY' })
  @ApiResponse({ status: 200, description: 'List of papers with marks status' })
  getPapersList(
    @Query('academicSessionId') academicSessionId?: string,
    @Query('examinationDetailId') examinationDetailId?: string,
    @Query('programId') programId?: string,
    @Query('yearId') yearId?: string,
    @Query('semId') semId?: string,
    @Query('marksTypeId') marksTypeId?: string,
    @Query('marksType') marksType?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'get_papers_list_marks' },
      {
        academicSessionId: academicSessionId ? Number(academicSessionId) : undefined,
        examinationDetailId: examinationDetailId ? Number(examinationDetailId) : undefined,
        programId: Number(programId),
        yearId: Number(yearId),
        semId: semId ? Number(semId) : undefined,
        marksTypeId: marksTypeId ? Number(marksTypeId) : undefined,
        marksType,
      },
    );
  }

  @Get('students')
  @ApiOperation({ summary: 'Get student list and paper info for marks entry' })
  @ApiQuery({ name: 'academicSessionId', required: true })
  @ApiQuery({ name: 'examinationDetailId', required: true })
  @ApiQuery({ name: 'programId', required: true })
  @ApiQuery({ name: 'yearId', required: true })
  @ApiQuery({ name: 'semId', required: false })
  @ApiQuery({ name: 'paperId', required: true })
  @ApiQuery({ name: 'marksTypeId', required: false })
  @ApiQuery({ name: 'marksType', required: false, example: 'THEORY' })
  @ApiResponse({ status: 200, description: 'Student list and paper details' })
  getPaperStudents(
    @Query('academicSessionId') academicSessionId: string,
    @Query('examinationDetailId') examinationDetailId: string,
    @Query('programId') programId: string,
    @Query('yearId') yearId: string,
    @Query('paperId') paperId: string,
    @Query('semId') semId?: string,
    @Query('marksTypeId') marksTypeId?: string,
    @Query('marksType') marksType?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'get_paper_students_marks' },
      {
        academicSessionId: Number(academicSessionId),
        examinationDetailId: Number(examinationDetailId),
        programId: Number(programId),
        yearId: Number(yearId),
        paperId: Number(paperId),
        semId: semId ? Number(semId) : undefined,
        marksTypeId: marksTypeId ? Number(marksTypeId) : undefined,
        marksType,
      },
    );
  }

  @Post('save')
  @ApiOperation({ summary: 'Save student marks and lock entry' })
  @ApiResponse({ status: 201, description: 'Marks saved successfully' })
  saveMarks(@Body() saveDto: SaveMarksDto): Observable<any> {
    return this.studentClient.send({ cmd: 'save_marks' }, saveDto);
  }

  @Patch(':id/unlock')
  @ApiOperation({ summary: 'Unlock marks entry (Super Admin)' })
  @ApiQuery({ name: 'actor', required: false, example: 'Super Admin' })
  @ApiResponse({ status: 200, description: 'Marks entry unlocked' })
  unlockMarks(
    @Param('id', ParseIntPipe) id: number,
    @Query('actor') actor?: string,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'unlock_marks' }, { marksId: id, actor });
  }
}
