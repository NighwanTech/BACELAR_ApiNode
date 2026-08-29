import { Controller, Get, Inject, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@ApiTags('Student - Admit Cards')
@Controller('students-admit-cards')
export class ExamAdmitCardController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List students eligible for admit card / verification download' })
  @ApiQuery({ name: 'examinationDetailId', required: false })
  @ApiQuery({ name: 'sessionId', required: false, description: 'Academic session id' })
  @ApiQuery({ name: 'academicSessionId', required: false })
  @ApiQuery({ name: 'programCategoryId', required: false })
  @ApiQuery({ name: 'programId', required: false })
  @ApiQuery({ name: 'yearId', required: false })
  @ApiQuery({ name: 'semId', required: false })
  @ApiQuery({ name: 'examType', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'Return admit card list rows' })
  list(
    @Query('examinationDetailId') examinationDetailId?: string,
    @Query('sessionId') sessionId?: string,
    @Query('academicSessionId') academicSessionId?: string,
    @Query('programCategoryId') programCategoryId?: string,
    @Query('programId') programId?: string,
    @Query('yearId') yearId?: string,
    @Query('semId') semId?: string,
    @Query('examType') examType?: string,
    @Query('search') search?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'list_exam_admit_cards' },
      { examinationDetailId, sessionId, academicSessionId, programCategoryId, programId, yearId, semId, examType, search },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one student admit card payload' })
  @ApiResponse({ status: 200, description: 'Return admit card payload' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_exam_admit_card' }, { studentExamId: id });
  }
}
