import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreatePramanDto } from './dto/create-praman.dto';
import { UpdatePramanDto } from './dto/update-praman.dto';
import { BulkDeletePramansDto } from './dto/bulk-delete-pramans.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Pramans')
@Controller('master/pramans')
export class PramanController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new praman entry' })
  @ApiResponse({ status: 201, description: 'Praman created successfully' })
  create(@Body() createDto: CreatePramanDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_praman' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active pramans (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all pramans' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_pramans' }, { activeOnly: parseActiveOnlyFlag(activeOnly) });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get praman details by pramanId' })
  @ApiResponse({ status: 200, description: 'Return praman details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_praman' }, { pramanId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update praman details by pramanId' })
  @ApiResponse({ status: 200, description: 'Praman updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdatePramanDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_praman' }, { pramanId: id, ...updateDto });
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_praman' },
      { pramanId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a praman by pramanId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete praman' })
  @ApiResponse({ status: 200, description: 'Praman soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_praman' },
      { pramanId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple pramans' })
  @ApiResponse({ status: 200, description: 'Pramans bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeletePramansDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_pramans' }, bulkDeleteDto);
  }
}
