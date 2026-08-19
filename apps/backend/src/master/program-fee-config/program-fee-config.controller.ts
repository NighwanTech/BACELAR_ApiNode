import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateProgramFeeConfigDto } from './dto/create-program-fee-config.dto';
import { UpdateProgramFeeConfigDto } from './dto/update-program-fee-config.dto';
import { BulkDeleteProgramFeeConfigsDto } from './dto/bulk-delete-program-fee-configs.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';

@ApiTags('Master - Program Fee Configurations')
@Controller('master/program-fee-configs')
export class ProgramFeeConfigController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new program fee configuration (PG + GST calculations done automatically)' })
  @ApiResponse({ status: 201, description: 'Fee configuration created successfully' })
  create(@Body() createDto: CreateProgramFeeConfigDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_program_fee_config' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active program fee configurations' })
  @ApiResponse({ status: 200, description: 'Return all fee configs' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_program_fee_configs' }, {});
  }

  @Get('program/:programId/admission-session/:admissionSessionId')
  @ApiOperation({ summary: 'Find fee configuration for a specific Program ID and Admission Session ID' })
  @ApiResponse({ status: 200, description: 'Return active fee configuration' })
  findByProgramAndSession(
    @Param('programId', ParseIntPipe) programId: number,
    @Param('admissionSessionId', ParseIntPipe) admissionSessionId: number,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_program_fee_config_by_program_and_session' },
      { programId, admissionSessionId },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get program fee configuration details by ID' })
  @ApiResponse({ status: 200, description: 'Return fee config details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_program_fee_config' }, { feeConfigId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update program fee configuration by ID (automatically recalculates final amounts)' })
  @ApiResponse({ status: 200, description: 'Fee configuration updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProgramFeeConfigDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_program_fee_config' }, { feeConfigId: id, ...updateDto });
  }

  
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_program_fee_config' },
      { feeConfigId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete program fee configuration by ID' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Correction entry' })
  @ApiResponse({ status: 200, description: 'Fee configuration soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_program_fee_config' },
      { feeConfigId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple program fee configurations' })
  @ApiResponse({ status: 200, description: 'Configurations bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteProgramFeeConfigsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_program_fee_configs' }, bulkDeleteDto);
  }
}
