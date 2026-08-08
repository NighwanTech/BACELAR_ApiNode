import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateAcademicSessionDto } from './dto/create-academic-session.dto';
import { UpdateAcademicSessionDto } from './dto/update-academic-session.dto';
import { BulkDeleteAcademicSessionsDto } from './dto/bulk-delete-academic-sessions.dto';

@ApiTags('Master - Academic Sessions')
@Controller('master/academic-sessions')
export class AcademicSessionController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new academic session' })
  @ApiResponse({ status: 201, description: 'Academic session created successfully' })
  create(@Body() createDto: CreateAcademicSessionDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_academic_session' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active academic sessions' })
  @ApiResponse({ status: 200, description: 'Return all sessions' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_academic_sessions' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get academic session details by ID' })
  @ApiResponse({ status: 200, description: 'Return academic session details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_academic_session' }, { sessionId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update academic session details by ID' })
  @ApiResponse({ status: 200, description: 'Academic session updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAcademicSessionDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_academic_session' }, { sessionId: id, ...updateDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete academic session by ID' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete session' })
  @ApiResponse({ status: 200, description: 'Academic session soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_academic_session' },
      { sessionId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple academic sessions' })
  @ApiResponse({ status: 200, description: 'Academic sessions bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteAcademicSessionsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_academic_sessions' }, bulkDeleteDto);
  }
}
