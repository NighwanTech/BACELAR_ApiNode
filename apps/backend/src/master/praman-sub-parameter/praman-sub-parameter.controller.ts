import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreatePramanSubParameterDto } from './dto/create-praman-sub-parameter.dto';
import { UpdatePramanSubParameterDto } from './dto/update-praman-sub-parameter.dto';
import { BulkDeletePramanSubParametersDto } from './dto/bulk-delete-praman-sub-parameters.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Praman Sub Parameters')
@Controller('master/praman-sub-parameters')
export class PramanSubParameterController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sub praman parameter entry' })
  @ApiResponse({ status: 201, description: 'Sub praman parameter created successfully' })
  create(@Body() createDto: CreatePramanSubParameterDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_praman_sub_parameter' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active sub praman parameters (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all sub praman parameters' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  @ApiQuery({ name: 'pramanId', required: false, example: 1, description: 'Filter by pramanId' })
  findAll(
    @Query('activeOnly') activeOnly?: string,
    @Query('pramanId') pramanId?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_all_praman_sub_parameters' },
      {
        activeOnly: parseActiveOnlyFlag(activeOnly),
        pramanId: pramanId ? parseInt(pramanId, 10) : undefined,
      },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sub praman parameter details by subPramanParameterId' })
  @ApiResponse({ status: 200, description: 'Return sub praman parameter details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_one_praman_sub_parameter' },
      { subPramanParameterId: id },
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update sub praman parameter details by subPramanParameterId' })
  @ApiResponse({ status: 200, description: 'Sub praman parameter updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdatePramanSubParameterDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_praman_sub_parameter' },
      { subPramanParameterId: id, ...updateDto },
    );
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_praman_sub_parameter' },
      { subPramanParameterId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a sub praman parameter by subPramanParameterId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete sub parameter' })
  @ApiResponse({ status: 200, description: 'Sub praman parameter soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_praman_sub_parameter' },
      { subPramanParameterId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple sub praman parameters' })
  @ApiResponse({ status: 200, description: 'Sub praman parameters bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeletePramanSubParametersDto): Observable<any> {
    return this.studentClient.send(
      { cmd: 'bulk_delete_praman_sub_parameters' },
      bulkDeleteDto,
    );
  }
}
