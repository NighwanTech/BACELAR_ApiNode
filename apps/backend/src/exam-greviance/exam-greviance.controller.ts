import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CreateExamGrevianceDto } from './dto/create-exam-greviance.dto';

@ApiTags('Public - Exam Greviance')
@Controller('public/exam-greviances')
export class ExamGrevianceController {
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

  @Get('lookup')
  @ApiOperation({ summary: 'Lookup student + exam papers by roll number for greviance' })
  @ApiQuery({ name: 'rollNo', required: true })
  lookup(@Query('rollNo') rollNo?: string): Observable<any> {
    return this.studentClient
      .send({ cmd: 'lookup_exam_greviance_by_roll' }, { rollNo })
      .pipe(
        this.unwrap(),
        catchError((error) => {
          if (error instanceof HttpException) return throwError(() => error);
          const message =
            (typeof error === 'string' && error) ||
            error?.message ||
            error?.error?.message ||
            (typeof error?.error === 'string' && error.error) ||
            'Lookup failed';
          return throwError(() => new HttpException(message, HttpStatus.BAD_REQUEST));
        }),
      );
  }

  @Get('track')
  @ApiOperation({ summary: 'Track exam greviance application by track number' })
  @ApiQuery({ name: 'trackNo', required: true })
  track(@Query('trackNo') trackNo?: string): Observable<any> {
    return this.studentClient
      .send({ cmd: 'track_exam_greviance_by_no' }, { trackNo })
      .pipe(
        this.unwrap(),
        catchError((error) => {
          if (error instanceof HttpException) return throwError(() => error);
          const message =
            (typeof error === 'string' && error) ||
            error?.message ||
            error?.error?.message ||
            (typeof error?.error === 'string' && error.error) ||
            'Track failed';
          return throwError(() => new HttpException(message, HttpStatus.BAD_REQUEST));
        }),
      );
  }

  @Post()
  @ApiOperation({ summary: 'Submit exam greviance application' })
  create(@Body() dto: CreateExamGrevianceDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_exam_greviance' }, dto).pipe(
      this.unwrap(),
      catchError((error) => {
        if (error instanceof HttpException) return throwError(() => error);
        return throwError(
          () =>
            new HttpException(
              error?.message || 'Create failed',
              HttpStatus.BAD_REQUEST,
            ),
        );
      }),
    );
  }
}
