import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateAdmissionSessionDto } from './dto/create-admission-session.dto';
import { UpdateAdmissionSessionDto } from './dto/update-admission-session.dto';
import { BulkDeleteAdmissionSessionsDto } from './dto/bulk-delete-admission-sessions.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';

@ApiTags('Master - Admission Sessions')
@Controller('master/admission-sessions')
export class AdmissionSessionController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new admission session' })
  @ApiResponse({ status: 201, description: 'Admission session created successfully' })
  create(@Body() createDto: CreateAdmissionSessionDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_admission_session' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active admission sessions' })
  @ApiResponse({ status: 200, description: 'Return all sessions' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_admission_sessions' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get admission session details by ID' })
  @ApiResponse({ status: 200, description: 'Return admission session details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_one_admission_session' },
      { admissionSessionId: id },
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update admission session details by ID' })
  @ApiResponse({ status: 200, description: 'Admission session updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAdmissionSessionDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_admission_session' },
      { admissionSessionId: id, ...updateDto },
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
      { cmd: 'update_status_admission_session' },
      { admissionSessionId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete admission session by ID' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete session' })
  @ApiResponse({ status: 200, description: 'Admission session soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_admission_session' },
      { admissionSessionId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple admission sessions' })
  @ApiResponse({ status: 200, description: 'Admission sessions bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteAdmissionSessionsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_admission_sessions' }, bulkDeleteDto);
  }
}
