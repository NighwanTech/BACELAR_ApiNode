import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { map, Observable } from 'rxjs';
import { CreateEntrancePaperDto } from './dto/create-entrance-paper.dto';
import { UpdateEntrancePaperDto } from './dto/update-entrance-paper.dto';
import { BulkDeleteEntrancePapersDto } from './dto/bulk-delete-entrance-papers.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Entrance Papers')
@Controller('master/entrance-papers')
export class EntrancePaperController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  private unwrap<T = any>() {
    return map((res: any) => {
      if (res && typeof res === 'object' && res.status === 'error') {
        const message = res.message || 'Request failed';
        const isConflict = /already exists/i.test(String(message));
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
  @ApiOperation({ summary: 'Create entrance paper' })
  create(@Body() dto: CreateEntrancePaperDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_entrance_paper' }, dto).pipe(this.unwrap());
  }

  @Get()
  @ApiQuery({ name: 'activeOnly', required: false })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient
      .send({ cmd: 'find_all_entrance_papers' }, { activeOnly: parseActiveOnlyFlag(activeOnly) })
      .pipe(this.unwrap());
  }

  @Post('bulk-delete')
  bulkRemove(@Body() dto: BulkDeleteEntrancePapersDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_entrance_papers' }, dto).pipe(this.unwrap());
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient
      .send({ cmd: 'find_one_entrance_paper' }, { entrancePaperId: id })
      .pipe(this.unwrap());
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEntrancePaperDto,
  ): Observable<any> {
    return this.studentClient
      .send({ cmd: 'update_entrance_paper' }, { entrancePaperId: id, ...dto })
      .pipe(this.unwrap());
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient
      .send({ cmd: 'update_status_entrance_paper' }, { entrancePaperId: id, ...dto })
      .pipe(this.unwrap());
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient
      .send({ cmd: 'delete_entrance_paper' }, { entrancePaperId: id, DeletedBy, DeletedRemarks })
      .pipe(this.unwrap());
  }
}
