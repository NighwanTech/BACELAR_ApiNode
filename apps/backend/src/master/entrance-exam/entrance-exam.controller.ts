import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { map, Observable } from 'rxjs';
import { CreateEntranceExamDto } from './dto/create-entrance-exam.dto';
import { UpdateEntranceExamDto } from './dto/update-entrance-exam.dto';
import {
  BulkDeleteEntranceExamsDto,
  GenerateEntranceRollsDto,
  SaveEntranceMarksDto,
} from './dto/generate-entrance-rolls.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Entrance Exams')
@Controller('master/entrance-exams')
export class EntranceExamController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  private unwrap<T = any>() {
    return map((res: any) => {
      if (res && typeof res === 'object' && res.status === 'error') {
        const message = res.message || 'Request failed';
        const isConflict = /already/i.test(String(message));
        const isNotFound = /not found/i.test(String(message));
        throw new HttpException(
          message,
          isNotFound ? HttpStatus.NOT_FOUND : isConflict ? HttpStatus.CONFLICT : HttpStatus.BAD_REQUEST,
        );
      }
      return res as T;
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create entrance exam paper mapping' })
  create(@Body() dto: CreateEntranceExamDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_entrance_exam' }, dto).pipe(this.unwrap());
  }

  @Get()
  @ApiQuery({ name: 'activeOnly', required: false })
  @ApiQuery({ name: 'academicSessionId', required: false })
  @ApiQuery({ name: 'programCategoryId', required: false })
  @ApiQuery({ name: 'programId', required: false })
  findAll(
    @Query('activeOnly') activeOnly?: string,
    @Query('academicSessionId') academicSessionId?: string,
    @Query('programCategoryId') programCategoryId?: string,
    @Query('programId') programId?: string,
  ): Observable<any> {
    return this.studentClient
      .send(
        { cmd: 'find_all_entrance_exams' },
        {
          activeOnly: parseActiveOnlyFlag(activeOnly),
          academicSessionId: academicSessionId ? Number(academicSessionId) : undefined,
          programCategoryId: programCategoryId ? Number(programCategoryId) : undefined,
          programId: programId ? Number(programId) : undefined,
        },
      )
      .pipe(this.unwrap());
  }

  @Get('admit-card')
  @ApiOperation({ summary: 'Get entrance admit card by roll number or studentId' })
  @ApiQuery({ name: 'entranceRollnumber', required: false })
  @ApiQuery({ name: 'studentId', required: false })
  getAdmitCard(
    @Query('entranceRollnumber') entranceRollnumber?: string,
    @Query('studentId') studentId?: string,
  ): Observable<any> {
    return this.studentClient
      .send(
        { cmd: 'get_entrance_admit_card' },
        {
          entranceRollnumber,
          studentId: studentId ? Number(studentId) : undefined,
        },
      )
      .pipe(this.unwrap());
  }

  @Post('generate-rolls')
  @ApiOperation({ summary: 'Bulk generate entrance roll numbers for a program' })
  generateRolls(@Body() dto: GenerateEntranceRollsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'generate_entrance_rolls' }, dto).pipe(this.unwrap());
  }

  @Get('students')
  @ApiOperation({ summary: 'List generated entrance students with paper marks' })
  @ApiQuery({ name: 'academicSessionId', required: true })
  @ApiQuery({ name: 'programCategoryId', required: true })
  @ApiQuery({ name: 'programId', required: true })
  listStudents(
    @Query('academicSessionId') academicSessionId?: string,
    @Query('programCategoryId') programCategoryId?: string,
    @Query('programId') programId?: string,
  ): Observable<any> {
    return this.studentClient
      .send(
        { cmd: 'list_entrance_students' },
        {
          academicSessionId: academicSessionId ? Number(academicSessionId) : undefined,
          programCategoryId: programCategoryId ? Number(programCategoryId) : undefined,
          programId: programId ? Number(programId) : undefined,
        },
      )
      .pipe(this.unwrap());
  }

  @Post('save-marks')
  @ApiOperation({ summary: 'Save entrance paper marks for students of a program' })
  saveMarks(@Body() dto: SaveEntranceMarksDto): Observable<any> {
    return this.studentClient.send({ cmd: 'save_entrance_marks' }, dto).pipe(this.unwrap());
  }

  @Post('bulk-delete')
  bulkRemove(@Body() dto: BulkDeleteEntranceExamsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_entrance_exams' }, dto).pipe(this.unwrap());
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_entrance_exam' }, { entranceExamId: id }).pipe(this.unwrap());
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEntranceExamDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_entrance_exam' }, { entranceExamId: id, ...dto }).pipe(this.unwrap());
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient
      .send({ cmd: 'update_status_entrance_exam' }, { entranceExamId: id, ...dto })
      .pipe(this.unwrap());
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient
      .send({ cmd: 'delete_entrance_exam' }, { entranceExamId: id, DeletedBy, DeletedRemarks })
      .pipe(this.unwrap());
  }
}
