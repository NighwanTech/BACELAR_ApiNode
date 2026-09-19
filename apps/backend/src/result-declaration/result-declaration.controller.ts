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
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { DeclareResultDto } from './dto/declare-result.dto';
import { parseActiveOnlyFlag } from '../common/parse-active-only';
import { StorageService } from '../shared/storage/storage.service';

@ApiTags('Result Declarations')
@Controller()
export class ResultDeclarationController {
  constructor(
    @Inject('EXAM_RESULT_SERVICE') private readonly examResultClient: ClientProxy,
    private readonly storageService: StorageService,
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

  // ─── Admin ───────────────────────────────────────────────

  @Post('result-declarations/declare')
  @ApiOperation({
    summary:
      'Declare result as CURRENT. Same Program+Year+Sem previous CURRENT auto-moves to PREVIOUS.',
  })
  @ApiResponse({ status: 201, description: 'Result declared successfully' })
  declare(@Body() dto: DeclareResultDto): Observable<any> {
    return this.examResultClient.send({ cmd: 'declare_result_declaration' }, dto).pipe(
      this.unwrap(),
      catchError((error) => this.handleError(error)),
    );
  }

  @Get('result-declarations')
  @ApiOperation({ summary: 'List result declarations (admin)' })
  @ApiQuery({ name: 'status', required: false, example: 'CURRENT' })
  @ApiQuery({ name: 'academicSessionId', required: false })
  @ApiQuery({ name: 'programId', required: false })
  @ApiQuery({ name: 'yearId', required: false })
  @ApiQuery({ name: 'semId', required: false })
  @ApiQuery({ name: 'activeOnly', required: false })
  findAll(
    @Query('status') status?: string,
    @Query('academicSessionId') academicSessionId?: string,
    @Query('examinationDetailId') examinationDetailId?: string,
    @Query('programId') programId?: string,
    @Query('yearId') yearId?: string,
    @Query('semId') semId?: string,
    @Query('activeOnly') activeOnly?: string,
  ): Observable<any> {
    const payload: Record<string, any> = {
      activeOnly: parseActiveOnlyFlag(activeOnly),
    };
    if (status) payload.status = status;
    for (const [key, value] of Object.entries({
      academicSessionId,
      examinationDetailId,
      programId,
      yearId,
      semId,
    })) {
      if (value !== undefined && value !== null && String(value).trim() !== '') {
        payload[key] = Number(value);
      }
    }
    return this.examResultClient.send({ cmd: 'find_all_result_declarations' }, payload).pipe(
      this.unwrap(),
      catchError((error) => this.handleError(error)),
    );
  }

  @Get('result-declarations/:id')
  @ApiOperation({ summary: 'Get one result declaration' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.examResultClient
      .send({ cmd: 'find_one_result_declaration' }, { resultDeclarationId: id })
      .pipe(this.unwrap(), catchError((error) => this.handleError(error)));
  }

  @Post('result-declarations/:id/archive')
  @ApiOperation({ summary: 'Move CURRENT declaration to PREVIOUS' })
  archive(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { UpdatedBy?: string },
  ): Observable<any> {
    return this.examResultClient
      .send(
        { cmd: 'archive_result_declaration' },
        { resultDeclarationId: id, UpdatedBy: body?.UpdatedBy },
      )
      .pipe(this.unwrap(), catchError((error) => this.handleError(error)));
  }

  @Delete('result-declarations/:id')
  @ApiOperation({ summary: 'Soft delete result declaration' })
  @ApiQuery({ name: 'DeletedBy', required: true })
  @ApiQuery({ name: 'DeletedRemarks', required: false })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.examResultClient
      .send(
        { cmd: 'delete_result_declaration' },
        { resultDeclarationId: id, DeletedBy, DeletedRemarks },
      )
      .pipe(this.unwrap(), catchError((error) => this.handleError(error)));
  }

  // ─── Public (website) ────────────────────────────────────

  @Get('public/result-declarations/current')
  @ApiOperation({ summary: 'Website Current Results course dropdown' })
  listCurrentPublic(): Observable<any> {
    return this.examResultClient
      .send({ cmd: 'list_current_result_declarations_public' }, {})
      .pipe(this.unwrap(), catchError((error) => this.handleError(error)));
  }

  @Get('public/result-declarations/sessions')
  @ApiOperation({ summary: 'Website Previous Results session dropdown' })
  listPreviousSessionsPublic(): Observable<any> {
    return this.examResultClient
      .send({ cmd: 'list_previous_result_sessions_public' }, {})
      .pipe(this.unwrap(), catchError((error) => this.handleError(error)));
  }

  @Get('public/result-declarations')
  @ApiOperation({ summary: 'Website Previous Results course dropdown for a session' })
  @ApiQuery({ name: 'academicSessionId', required: true })
  listPreviousBySessionPublic(
    @Query('academicSessionId') academicSessionId: string,
  ): Observable<any> {
    return this.examResultClient
      .send(
        { cmd: 'list_previous_result_declarations_public' },
        { academicSessionId: Number(academicSessionId) },
      )
      .pipe(this.unwrap(), catchError((error) => this.handleError(error)));
  }

  @Get('public/results/marksheet')
  @ApiOperation({
    summary: 'Fast public marksheet by Roll No + declared course (resultDeclarationId)',
  })
  @ApiQuery({ name: 'rollNo', required: true })
  @ApiQuery({ name: 'resultDeclarationId', required: true })
  getPublicMarksheet(
    @Query('rollNo') rollNo: string,
    @Query('resultDeclarationId') resultDeclarationId: string,
  ): Observable<any> {
    return this.examResultClient
      .send(
        { cmd: 'get_public_result_marksheet' },
        {
          rollNo,
          resultDeclarationId: Number(resultDeclarationId),
        },
      )
      .pipe(
        this.unwrap(),
        switchMap((marksheet: any) =>
          from(this.attachPresignedPhoto(marksheet)),
        ),
        catchError((error) => this.handleError(error)),
      );
  }

  /** Private S3: return time-limited signed URL so the browser can load the photo. */
  private async attachPresignedPhoto(marksheet: any) {
    const photoUrl = marksheet?.student?.photoUrl;
    if (!photoUrl || !marksheet?.student) return marksheet;

    const signed = await this.storageService.getPresignedGetUrl(
      String(photoUrl),
      60 * 60,
    );
    if (signed) {
      marksheet.student.photoUrl = signed;
    }
    return marksheet;
  }
}
