import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateQualificationDto } from './dto/create-qualification.dto';
import { UpdateQualificationDto } from './dto/update-qualification.dto';
import { BulkDeleteQualificationsDto } from './dto/bulk-delete-qualifications.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Qualifications')
@Controller('master/qualifications')
export class QualificationController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new qualification entry' })
  @ApiResponse({ status: 201, description: 'Qualification created successfully' })
  create(@Body() createDto: CreateQualificationDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_qualification' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active qualifications (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all qualifications' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_qualifications' }, { activeOnly: parseActiveOnlyFlag(activeOnly) });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get qualification details by qualificationId' })
  @ApiResponse({ status: 200, description: 'Return qualification details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_qualification' }, { qualificationId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update qualification details by qualificationId' })
  @ApiResponse({ status: 200, description: 'Qualification updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateQualificationDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_qualification' }, { qualificationId: id, ...updateDto });
  }

  
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_qualification' },
      { qualificationId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a qualification by qualificationId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete qualification' })
  @ApiResponse({ status: 200, description: 'Qualification soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_qualification' },
      { qualificationId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple qualifications' })
  @ApiResponse({ status: 200, description: 'Qualifications bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteQualificationsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_qualifications' }, bulkDeleteDto);
  }
}
