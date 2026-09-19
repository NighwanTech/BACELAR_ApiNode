import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateProgramSubjectDto } from './dto/create-program-subject.dto';
import { UpdateProgramSubjectDto } from './dto/update-program-subject.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Program Subjects')
@Controller('master/program-subjects')
export class ProgramSubjectController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new program subject master entry' })
  @ApiResponse({ status: 201, description: 'Program subject created successfully' })
  create(@Body() createProgramSubjectDto: CreateProgramSubjectDto): Observable<any> {
    return this.studentClient.send(
      { cmd: 'create_program_subject' },
      createProgramSubjectDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all active program subjects (optional filter by programId)' })
  @ApiQuery({ name: 'programId', required: false, example: 5 })
  @ApiResponse({ status: 200, description: 'Return all program subjects' })
  findAll(
    @Query('programId') programId?: string,
    @Query('activeOnly') activeOnly?: string,
  ): Observable<any> {
    const payload: { programId?: number; activeOnly?: boolean } = {
      activeOnly: parseActiveOnlyFlag(activeOnly),
    };
    if (programId !== undefined && programId !== null && String(programId).trim() !== '') {
      payload.programId = Number(programId);
    }
    return this.studentClient.send({ cmd: 'find_all_program_subjects' }, payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get program subject details by programSubjectId' })
  @ApiResponse({ status: 200, description: 'Return program subject details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_one_program_subject' },
      { programSubjectId: id },
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update program subject details by programSubjectId' })
  @ApiResponse({ status: 200, description: 'Program subject updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProgramSubjectDto: UpdateProgramSubjectDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_program_subject' },
      { programSubjectId: id, ...updateProgramSubjectDto },
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
      { cmd: 'update_status_program_subject' },
      { programSubjectId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a program subject by programSubjectId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Program subject soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_program_subject' },
      { programSubjectId: id, DeletedBy, DeletedRemarks },
    );
  }
}
