import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateExaminationDetailsDto } from './dto/create-examination-details.dto';
import { UpdateExaminationDetailsDto } from './dto/update-examination-details.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Examination Details')
@Controller('master/examination-details')
export class ExaminationDetailsController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new examination details master entry' })
  @ApiResponse({ status: 201, description: 'Examination details created successfully' })
  create(@Body() createExaminationDetailsDto: CreateExaminationDetailsDto): Observable<any> {
    return this.studentClient.send(
      { cmd: 'create_examination_details' },
      createExaminationDetailsDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all active examination details (optional filter by academicId)' })
  @ApiQuery({ name: 'academicId', required: false, example: 1 })
  @ApiResponse({ status: 200, description: 'Return all examination details' })
  findAll(
    @Query('academicId') academicId?: string,
    @Query('activeOnly') activeOnly?: string,
  ): Observable<any> {
    const payload: { academicId?: number; activeOnly?: boolean } = {
      activeOnly: parseActiveOnlyFlag(activeOnly),
    };
    if (academicId !== undefined && academicId !== null && String(academicId).trim() !== '') {
      payload.academicId = Number(academicId);
    }
    return this.studentClient.send({ cmd: 'find_all_examination_details' }, payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get examination details by examinationId' })
  @ApiResponse({ status: 200, description: 'Return examination details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_one_examination_details' },
      { examinationId: id },
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update examination details by examinationId' })
  @ApiResponse({ status: 200, description: 'Examination details updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExaminationDetailsDto: UpdateExaminationDetailsDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_examination_details' },
      { examinationId: id, ...updateExaminationDetailsDto },
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
      { cmd: 'update_status_examination_details' },
      { examinationId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete examination details by examinationId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Examination details soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_examination_details' },
      { examinationId: id, DeletedBy, DeletedRemarks },
    );
  }
}
