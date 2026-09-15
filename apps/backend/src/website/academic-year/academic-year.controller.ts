import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { BulkDeleteAcademicYearsDto } from './dto/bulk-delete-academic-years.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Website - Academic Years')
@Controller('website/academic-years')
export class AcademicYearController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new academic year entry' })
  @ApiResponse({ status: 201, description: 'Academic year created successfully' })
  create(@Body() createDto: CreateAcademicYearDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_academic_year' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active academic years (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all academic years' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_all_academic_years' },
      { activeOnly: parseActiveOnlyFlag(activeOnly) },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get academic year details by academicYearId' })
  @ApiResponse({ status: 200, description: 'Return academic year details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_one_academic_year' },
      { academicYearId: id },
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update academic year details by academicYearId' })
  @ApiResponse({ status: 200, description: 'Academic year updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAcademicYearDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_academic_year' },
      { academicYearId: id, ...updateDto },
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
      { cmd: 'update_status_academic_year' },
      { academicYearId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an academic year by academicYearId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete academic year' })
  @ApiResponse({ status: 200, description: 'Academic year soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_academic_year' },
      { academicYearId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple academic years' })
  @ApiResponse({ status: 200, description: 'Academic years bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteAcademicYearsDto): Observable<any> {
    return this.studentClient.send(
      { cmd: 'bulk_delete_academic_years' },
      bulkDeleteDto,
    );
  }
}
