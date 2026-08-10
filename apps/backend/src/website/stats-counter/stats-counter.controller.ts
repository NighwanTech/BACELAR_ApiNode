import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateStatsCounterDto } from './dto/create-stats-counter.dto';
import { UpdateStatsCounterDto } from './dto/update-stats-counter.dto';

@ApiTags('Website - Stats Counters')
@Controller('website/stats-counters')
export class StatsCounterController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new stats counter entry' })
  @ApiResponse({ status: 201, description: 'Stats counter created successfully' })
  create(@Body() createDto: CreateStatsCounterDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_stats_counter' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active stats counters (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all stats counters' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_stats_counters' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get stats counter details by statsCounterId' })
  @ApiResponse({ status: 200, description: 'Return stats counter details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_stats_counter' }, { statsCounterId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update stats counter details by statsCounterId' })
  @ApiResponse({ status: 200, description: 'Stats counter updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateStatsCounterDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_stats_counter' },
      { statsCounterId: id, ...updateDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a stats counter entry by statsCounterId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete stats entry' })
  @ApiResponse({ status: 200, description: 'Stats counter soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_stats_counter' },
      { statsCounterId: id, DeletedBy, DeletedRemarks },
    );
  }
}
