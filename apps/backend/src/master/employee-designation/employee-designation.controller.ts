import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateEmployeeDesignationDto } from './dto/create-employee-designation.dto';
import { UpdateEmployeeDesignationDto } from './dto/update-employee-designation.dto';
import { BulkDeleteEmployeeDesignationsDto } from './dto/bulk-delete-employee-designations.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Employee Designations')
@Controller('master/employee-designations')
export class EmployeeDesignationController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee designation entry' })
  @ApiResponse({ status: 201, description: 'Employee designation created successfully' })
  create(@Body() createDto: CreateEmployeeDesignationDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_employee_designation' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active employee designations (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all employee designations' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_all_employee_designations' },
      { activeOnly: parseActiveOnlyFlag(activeOnly) },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employee designation details by employeeDesignationId' })
  @ApiResponse({ status: 200, description: 'Return employee designation details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_employee_designation' }, { employeeDesignationId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update employee designation details by employeeDesignationId' })
  @ApiResponse({ status: 200, description: 'Employee designation updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateEmployeeDesignationDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_employee_designation' },
      { employeeDesignationId: id, ...updateDto },
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
      { cmd: 'update_status_employee_designation' },
      { employeeDesignationId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an employee designation by employeeDesignationId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete employee designation' })
  @ApiResponse({ status: 200, description: 'Employee designation soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_employee_designation' },
      { employeeDesignationId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple employee designations' })
  @ApiResponse({ status: 200, description: 'Employee designations bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteEmployeeDesignationsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_employee_designations' }, bulkDeleteDto);
  }
}
