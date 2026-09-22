import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateEmployeeCategoryDto } from './dto/create-employee-category.dto';
import { UpdateEmployeeCategoryDto } from './dto/update-employee-category.dto';
import { BulkDeleteEmployeeCategoriesDto } from './dto/bulk-delete-employee-categories.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Employee Categories')
@Controller('master/employee-categories')
export class EmployeeCategoryController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee category entry' })
  @ApiResponse({ status: 201, description: 'Employee category created successfully' })
  create(@Body() createDto: CreateEmployeeCategoryDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_employee_category' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active employee categories (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all employee categories' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_all_employee_categories' },
      { activeOnly: parseActiveOnlyFlag(activeOnly) },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get employee category details by employeeCategoryId' })
  @ApiResponse({ status: 200, description: 'Return employee category details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_employee_category' }, { employeeCategoryId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update employee category details by employeeCategoryId' })
  @ApiResponse({ status: 200, description: 'Employee category updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateEmployeeCategoryDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_employee_category' },
      { employeeCategoryId: id, ...updateDto },
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
      { cmd: 'update_status_employee_category' },
      { employeeCategoryId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an employee category by employeeCategoryId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete employee category' })
  @ApiResponse({ status: 200, description: 'Employee category soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_employee_category' },
      { employeeCategoryId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple employee categories' })
  @ApiResponse({ status: 200, description: 'Employee categories bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteEmployeeCategoriesDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_employee_categories' }, bulkDeleteDto);
  }
}
