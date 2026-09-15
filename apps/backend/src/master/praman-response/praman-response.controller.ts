import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreatePramanResponseDto } from './dto/create-praman-response.dto';
import { UpdatePramanResponseDto } from './dto/update-praman-response.dto';
import { BulkDeletePramanResponsesDto } from './dto/bulk-delete-praman-responses.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Praman Responses')
@Controller('master/praman-responses')
export class PramanResponseController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new praman response entry' })
  @ApiResponse({ status: 201, description: 'Praman response created successfully' })
  create(@Body() createDto: CreatePramanResponseDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_praman_response' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active praman responses (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all praman responses' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_all_praman_responses' },
      { activeOnly: parseActiveOnlyFlag(activeOnly) },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get praman response details by pramanResponseId' })
  @ApiResponse({ status: 200, description: 'Return praman response details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_one_praman_response' },
      { pramanResponseId: id },
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update praman response details by pramanResponseId' })
  @ApiResponse({ status: 200, description: 'Praman response updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdatePramanResponseDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_praman_response' },
      { pramanResponseId: id, ...updateDto },
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
      { cmd: 'update_status_praman_response' },
      { pramanResponseId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a praman response by pramanResponseId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete praman response' })
  @ApiResponse({ status: 200, description: 'Praman response soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_praman_response' },
      { pramanResponseId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple praman responses' })
  @ApiResponse({ status: 200, description: 'Praman responses bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeletePramanResponsesDto): Observable<any> {
    return this.studentClient.send(
      { cmd: 'bulk_delete_praman_responses' },
      bulkDeleteDto,
    );
  }
}
