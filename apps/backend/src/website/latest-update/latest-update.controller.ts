import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { Observable } from 'rxjs';
import { CreateLatestUpdateDto } from './dto/create-latest-update.dto';
import { UpdateLatestUpdateDto } from './dto/update-latest-update.dto';

@ApiTags('Website - Latest Updates')
@Controller('website/latest-updates')
export class LatestUpdateController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new latest update entry' })
  @ApiResponse({ status: 201, description: 'Latest update created successfully' })
  create(@Body() createDto: CreateLatestUpdateDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_latest_update' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active latest updates (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all latest updates' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_latest_updates' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get latest update details by latestUpdateId' })
  @ApiResponse({ status: 200, description: 'Return latest update details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_latest_update' }, { latestUpdateId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update latest update details by latestUpdateId' })
  @ApiResponse({ status: 200, description: 'Latest update updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateLatestUpdateDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_latest_update' },
      { latestUpdateId: id, ...updateDto },
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
      { cmd: 'update_status_latest_update' },
      { latestUpdateId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a latest update entry by latestUpdateId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete update' })
  @ApiResponse({ status: 200, description: 'Latest update soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_latest_update' },
      { latestUpdateId: id, DeletedBy, DeletedRemarks },
    );
  }
}
