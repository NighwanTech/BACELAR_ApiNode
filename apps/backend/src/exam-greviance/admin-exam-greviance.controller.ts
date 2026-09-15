import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Observable, catchError, map, throwError } from 'rxjs';
import { parseActiveOnlyFlag } from '../common/parse-active-only';
import { UpdateExamGrevianceApplicationStatusDto } from './dto/update-exam-greviance-application-status.dto';

@ApiTags('Exam Greviances (Admin)')
@Controller('exam-greviances')
export class AdminExamGrevianceController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  private unwrap<T = any>() {
    return map((res: any) => {
      if (res && typeof res === 'object' && res.status === 'error') {
        throw new HttpException(
          res.message || 'Request failed',
          HttpStatus.BAD_REQUEST,
        );
      }
      return res as T;
    });
  }

  private handleError(fallback: string) {
    return catchError((error) => {
      if (error instanceof HttpException) return throwError(() => error);
      const message =
        (typeof error === 'string' && error) ||
        error?.message ||
        error?.error?.message ||
        (typeof error?.error === 'string' && error.error) ||
        fallback;
      return throwError(() => new HttpException(message, HttpStatus.BAD_REQUEST));
    });
  }

  @Get()
  @ApiOperation({ summary: 'List exam greviance applications (admin)' })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'grevianceTypeId', required: false })
  @ApiQuery({ name: 'rollNo', required: false })
  @ApiQuery({ name: 'programId', required: false })
  @ApiQuery({ name: 'examinationDetailId', required: false })
  @ApiQuery({ name: 'activeOnly', required: false, example: true })
  findAll(
    @Query('status') status?: string,
    @Query('grevianceTypeId') grevianceTypeId?: string,
    @Query('rollNo') rollNo?: string,
    @Query('programId') programId?: string,
    @Query('examinationDetailId') examinationDetailId?: string,
    @Query('activeOnly') activeOnly?: string,
  ): Observable<any> {
    const payload: Record<string, any> = {
      activeOnly: parseActiveOnlyFlag(activeOnly),
    };
    if (status) payload.status = status;
    if (rollNo) payload.rollNo = rollNo;
    if (grevianceTypeId) payload.grevianceTypeId = Number(grevianceTypeId);
    if (programId) payload.programId = Number(programId);
    if (examinationDetailId) {
      payload.examinationDetailId = Number(examinationDetailId);
    }

    return this.studentClient
      .send({ cmd: 'find_all_exam_greviances' }, payload)
      .pipe(this.unwrap(), this.handleError('Failed to list exam greviances'));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one exam greviance application' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient
      .send(
        { cmd: 'find_one_exam_greviance' },
        { examGrevianceApplicationId: id },
      )
      .pipe(this.unwrap(), this.handleError('Failed to get exam greviance'));
  }

  @Patch(':id/application-status')
  @ApiOperation({
    summary:
      'Update workflow status (SUBMITTED / PROCESSING / MAIL_SENT / NO_CHANGE / MARKS_INCREASED / RESULT_UPGRADED). Saves UpdatedBy + UpdatedOn.',
  })
  updateApplicationStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateExamGrevianceApplicationStatusDto,
  ): Observable<any> {
    return this.studentClient
      .send(
        { cmd: 'update_application_status_exam_greviance' },
        { examGrevianceApplicationId: id, ...dto },
      )
      .pipe(
        this.unwrap(),
        this.handleError('Failed to update application status'),
      );
  }
}
