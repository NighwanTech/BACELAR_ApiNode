import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateFeeTypeDto } from './dto/create-fee-type.dto';
import { UpdateFeeTypeDto } from './dto/update-fee-type.dto';
import { BulkDeleteFeeTypesDto } from './dto/bulk-delete-fee-types.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';

@ApiTags('Master - Fee Types')
@Controller('master/fee-types')
export class FeeTypeController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new fee type entry' })
  @ApiResponse({ status: 201, description: 'Fee type created successfully' })
  create(@Body() createDto: CreateFeeTypeDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_fee_type' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active fee types (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all fee types' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_fee_types' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get fee type details by feeTypeId' })
  @ApiResponse({ status: 200, description: 'Return fee type details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_fee_type' }, { feeTypeId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update fee type details by feeTypeId' })
  @ApiResponse({ status: 200, description: 'Fee type updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateFeeTypeDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_fee_type' }, { feeTypeId: id, ...updateDto });
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_fee_type' },
      { feeTypeId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a fee type by feeTypeId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete fee type' })
  @ApiResponse({ status: 200, description: 'Fee type soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_fee_type' },
      { feeTypeId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple fee types' })
  @ApiResponse({ status: 200, description: 'Fee types bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteFeeTypesDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_fee_types' }, bulkDeleteDto);
  }
}
