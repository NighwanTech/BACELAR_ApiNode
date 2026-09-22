import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateEmployeTypeDto } from './dto/create-employe-type.dto';
import { UpdateEmployeTypeDto } from './dto/update-employe-type.dto';
import { BulkDeleteEmployeTypesDto } from './dto/bulk-delete-employe-types.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Employee Types')
@Controller('master/employe-types')
export class EmployeTypeController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee type entry' })
  @ApiResponse({ status: 201, description: 'Employee type created successfully' })
  create(@Body() createDto: CreateEmployeTypeDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_employe_type' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active employee types (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all employee types' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_all_employe_types' },
      { activeOnly: parseActiveOnlyFlag(activeOnly) },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employee type details by employeTypeId' })
  @ApiResponse({ status: 200, description: 'Return employee type details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_employe_type' }, { employeTypeId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update employee type details by employeTypeId' })
  @ApiResponse({ status: 200, description: 'Employee type updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateEmployeTypeDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_employe_type' },
      { employeTypeId: id, ...updateDto },
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
      { cmd: 'update_status_employe_type' },
      { employeTypeId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an employee type by employeTypeId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete employee type' })
  @ApiResponse({ status: 200, description: 'Employee type soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_employe_type' },
      { employeTypeId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple employee types' })
  @ApiResponse({ status: 200, description: 'Employee types bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteEmployeTypesDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_employe_types' }, bulkDeleteDto);
  }
}
