import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable, map } from 'rxjs';
import { CreateExamGreviancePriceDto } from './dto/create-exam-greviance-price.dto';
import { UpdateExamGreviancePriceDto } from './dto/update-exam-greviance-price.dto';
import { BulkDeleteExamGreviancePricesDto } from './dto/bulk-delete-exam-greviance-prices.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Exam Grievance Price')
@Controller('master/exam-greviance-prices')
export class ExamGreviancePriceController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  private unwrap<T = any>() {
    return map((res: any) => {
      if (res && typeof res === 'object' && res.status === 'error') {
        const message = res.message || 'Request failed';
        const isConflict = /already exists/i.test(String(message));
        throw new HttpException(
          message,
          isConflict ? HttpStatus.CONFLICT : HttpStatus.BAD_REQUEST,
        );
      }
      return res as T;
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create exam grievance price (finalPrice auto-calculated from price + PG + GST)' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() createDto: CreateExamGreviancePriceDto): Observable<any> {
    return this.studentClient
      .send({ cmd: 'create_exam_greviance_price' }, createDto)
      .pipe(this.unwrap());
  }

  @Get()
  @ApiOperation({ summary: 'List exam grievance prices. Master table: omit activeOnly. Dropdowns: activeOnly=true.' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true })
  @ApiResponse({ status: 200, description: 'Return list' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_all_exam_greviance_prices' },
      { activeOnly: parseActiveOnlyFlag(activeOnly) },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exam grievance price by ID' })
  @ApiResponse({ status: 200, description: 'Return details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_one_exam_greviance_price' },
      { examGreviancePriceMasterId: id },
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update exam grievance price (recalculates finalPrice)' })
  @ApiResponse({ status: 200, description: 'Updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateExamGreviancePriceDto,
  ): Observable<any> {
    return this.studentClient
      .send(
        { cmd: 'update_exam_greviance_price' },
        { examGreviancePriceMasterId: id, ...updateDto },
      )
      .pipe(this.unwrap());
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_exam_greviance_price' },
      { examGreviancePriceMasterId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete exam grievance price' })
  @ApiQuery({ name: 'DeletedBy', required: true })
  @ApiQuery({ name: 'DeletedRemarks', required: false })
  @ApiResponse({ status: 200, description: 'Soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_exam_greviance_price' },
      { examGreviancePriceMasterId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete exam grievance prices' })
  @ApiResponse({ status: 200, description: 'Bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteExamGreviancePricesDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_exam_greviance_prices' }, bulkDeleteDto);
  }
}
