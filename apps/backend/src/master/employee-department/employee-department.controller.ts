import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateEmployeeDepartmentDto } from './dto/create-employee-department.dto';
import { UpdateEmployeeDepartmentDto } from './dto/update-employee-department.dto';
import { BulkDeleteEmployeeDepartmentsDto } from './dto/bulk-delete-employee-departments.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Employee Departments')
@Controller('master/employee-departments')
export class EmployeeDepartmentController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee department entry' })
  @ApiResponse({ status: 201, description: 'Employee department created successfully' })
  create(@Body() createDto: CreateEmployeeDepartmentDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_employee_department' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active employee departments (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all employee departments' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_all_employee_departments' },
      { activeOnly: parseActiveOnlyFlag(activeOnly) },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employee department details by employeeDepartmentId' })
  @ApiResponse({ status: 200, description: 'Return employee department details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_employee_department' }, { employeeDepartmentId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update employee department details by employeeDepartmentId' })
  @ApiResponse({ status: 200, description: 'Employee department updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateEmployeeDepartmentDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_employee_department' },
      { employeeDepartmentId: id, ...updateDto },
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
      { cmd: 'update_status_employee_department' },
      { employeeDepartmentId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an employee department by employeeDepartmentId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete employee department' })
  @ApiResponse({ status: 200, description: 'Employee department soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_employee_department' },
      { employeeDepartmentId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple employee departments' })
  @ApiResponse({ status: 200, description: 'Employee departments bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteEmployeeDepartmentsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_employee_departments' }, bulkDeleteDto);
  }
}
