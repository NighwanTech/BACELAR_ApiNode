import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateAcademicSessionDto } from './dto/create-academic-session.dto';
import { UpdateAcademicSessionDto } from './dto/update-academic-session.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';

@ApiTags('Master - Academic Sessions')
@Controller('master/academic-sessions')
export class AcademicSessionController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new academic session master entry' })
  @ApiResponse({ status: 201, description: 'Academic session created successfully' })
  create(@Body() createDto: CreateAcademicSessionDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_academic_session' }, createDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'List academic sessions. Master table: omit activeOnly. Dropdowns: activeOnly=true (hides inactive).',
  })
  @ApiQuery({ name: 'collegeId', required: false, example: 1 })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    example: true,
    description: 'If true, return only IsActive sessions (use this for dropdowns)',
  })
  @ApiResponse({ status: 200, description: 'Return academic sessions' })
  findAll(
    @Query('collegeId') collegeId?: string,
    @Query('activeOnly') activeOnly?: string,
  ): Observable<any> {
    const payload: { collegeId?: number; activeOnly?: boolean } = {};
    if (collegeId !== undefined && collegeId !== null && String(collegeId).trim() !== '') {
      payload.collegeId = Number(collegeId);
    }
    const flag = String(activeOnly ?? '').trim().toLowerCase();
    if (flag === 'true' || flag === '1' || flag === 'yes') {
      payload.activeOnly = true;
    }
    return this.studentClient.send({ cmd: 'find_all_academic_sessions' }, payload);
  }

  @Get('current')
  @ApiOperation({ summary: 'Get the current academic session used for student registration' })
  @ApiResponse({ status: 200, description: 'Return current academic session' })
  findCurrent(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_current_academic_session' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get academic session details by academicSessionId' })
  @ApiResponse({ status: 200, description: 'Return academic session details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_one_academic_session' },
      { academicSessionId: id },
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update academic session details by academicSessionId' })
  @ApiResponse({ status: 200, description: 'Academic session updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAcademicSessionDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_academic_session' },
      { academicSessionId: id, ...updateDto },
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
      { cmd: 'update_status_academic_session' },
      { academicSessionId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an academic session by academicSessionId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Academic session soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_academic_session' },
      { academicSessionId: id, DeletedBy, DeletedRemarks },
    );
  }
}
