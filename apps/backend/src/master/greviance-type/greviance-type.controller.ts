import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateGrevianceTypeDto } from './dto/create-greviance-type.dto';
import { UpdateGrevianceTypeDto } from './dto/update-greviance-type.dto';
import { BulkDeleteGrevianceTypesDto } from './dto/bulk-delete-greviance-types.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Greviance Types')
@Controller('master/greviance-types')
export class GrevianceTypeController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new greviance type' })
  @ApiResponse({ status: 201, description: 'Created successfully' })
  create(@Body() createDto: CreateGrevianceTypeDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_greviance_type' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'List greviance types. Master: omit activeOnly. Dropdowns: activeOnly=true.' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true })
  @ApiResponse({ status: 200, description: 'Return list' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_all_greviance_types' },
      { activeOnly: parseActiveOnlyFlag(activeOnly) },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get greviance type by ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_greviance_type' }, { grevianceTypeId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update greviance type' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateGrevianceTypeDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_greviance_type' },
      { grevianceTypeId: id, ...updateDto },
    );
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_greviance_type' },
      { grevianceTypeId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete greviance type' })
  @ApiQuery({ name: 'DeletedBy', required: true })
  @ApiQuery({ name: 'DeletedRemarks', required: false })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_greviance_type' },
      { grevianceTypeId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete greviance types' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteGrevianceTypesDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_greviance_types' }, bulkDeleteDto);
  }
}
