import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable, catchError, map, throwError } from 'rxjs';
import { SavePromotionDto } from './dto/save-promotion.dto';
import { parseActiveOnlyFlag } from '../common/parse-active-only';

@ApiTags('Student Promotion')
@Controller('promotions')
export class PromotionController {
  constructor(
    @Inject('EXAM_RESULT_SERVICE') private readonly examResultClient: ClientProxy,
  ) {}

  private handleError(error: any) {
    let status = Number(error?.statusCode || error?.status);
    if (!status || Number.isNaN(status) || status < 100 || status > 599) {
      status = HttpStatus.BAD_REQUEST;
    }
    const rawMessage =
      error?.message || error?.response?.message || error?.error || 'Request failed';
    const message = Array.isArray(rawMessage) ? rawMessage.join(', ') : String(rawMessage);
    return throwError(() => new HttpException(message, status));
  }

  private unwrap<T = any>() {
    return map((res: any) => {
      if (res && typeof res === 'object' && res.status === 'error') {
        throw new HttpException(
          res.message || 'Request failed',
          Number(res.statusCode) || HttpStatus.BAD_REQUEST,
        );
      }
      return res as T;
    });
  }

  @Get('search')
  @ApiOperation({
    summary:
      'Search students for promotion from ExamResult (Promote From filters). Returns student-wise rows for UI table.',
  })
  @ApiQuery({ name: 'sessionIdFrom', required: true })
  @ApiQuery({ name: 'yearIdFrom', required: true })
  @ApiQuery({ name: 'semIdFrom', required: false })
  @ApiQuery({ name: 'courseCategoryIdFrom', required: true })
  @ApiQuery({ name: 'courseIdFrom', required: true })
  @ApiQuery({ name: 'subjectIdFrom', required: false })
  @ApiResponse({ status: 200, description: 'Return promotion candidates from exam result' })
  search(
    @Query('sessionIdFrom') sessionIdFrom?: string,
    @Query('yearIdFrom') yearIdFrom?: string,
    @Query('semIdFrom') semIdFrom?: string,
    @Query('courseCategoryIdFrom') courseCategoryIdFrom?: string,
    @Query('courseIdFrom') courseIdFrom?: string,
    @Query('subjectIdFrom') subjectIdFrom?: string,
  ): Observable<any> {
    const payload: Record<string, any> = {};
    for (const [key, value] of Object.entries({
      sessionIdFrom,
      yearIdFrom,
      semIdFrom,
      courseCategoryIdFrom,
      courseIdFrom,
      subjectIdFrom,
    })) {
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        payload[key] = Number(value);
      }
    }
    return this.examResultClient.send({ cmd: 'search_promotion_candidates' }, payload).pipe(
      this.unwrap(),
      catchError((error) => this.handleError(error)),
    );
  }

  @Post()
  @ApiOperation({
    summary:
      'Save promotion: create Promotion + PromotionDetail rows and update student year/sem/session/program.',
  })
  @ApiResponse({ status: 201, description: 'Students promoted successfully' })
  save(@Body() dto: SavePromotionDto): Observable<any> {
    return this.examResultClient.send({ cmd: 'save_promotion' }, dto).pipe(
      this.unwrap(),
      catchError((error) => this.handleError(error)),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List promotion batches' })
  @ApiQuery({ name: 'sessionIdFrom', required: false })
  @ApiQuery({ name: 'yearIdFrom', required: false })
  @ApiQuery({ name: 'semIdFrom', required: false })
  @ApiQuery({ name: 'courseIdFrom', required: false })
  @ApiQuery({ name: 'sessionIdTo', required: false })
  @ApiQuery({ name: 'activeOnly', required: false })
  findAll(
    @Query('sessionIdFrom') sessionIdFrom?: string,
    @Query('yearIdFrom') yearIdFrom?: string,
    @Query('semIdFrom') semIdFrom?: string,
    @Query('courseIdFrom') courseIdFrom?: string,
    @Query('sessionIdTo') sessionIdTo?: string,
    @Query('activeOnly') activeOnly?: string,
  ): Observable<any> {
    const payload: Record<string, any> = {
      activeOnly: parseActiveOnlyFlag(activeOnly),
    };
    for (const [key, value] of Object.entries({
      sessionIdFrom,
      yearIdFrom,
      semIdFrom,
      courseIdFrom,
      sessionIdTo,
    })) {
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        payload[key] = Number(value);
      }
    }
    return this.examResultClient.send({ cmd: 'find_all_promotions' }, payload).pipe(
      this.unwrap(),
      catchError((error) => this.handleError(error)),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one promotion batch with details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.examResultClient
      .send({ cmd: 'find_one_promotion' }, { promotionId: id })
      .pipe(this.unwrap(), catchError((error) => this.handleError(error)));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete promotion batch' })
  @ApiQuery({ name: 'DeletedBy', required: true })
  @ApiQuery({ name: 'DeletedRemarks', required: false })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.examResultClient
      .send(
        { cmd: 'delete_promotion' },
        { promotionId: id, DeletedBy, DeletedRemarks },
      )
      .pipe(this.unwrap(), catchError((error) => this.handleError(error)));
  }
}
