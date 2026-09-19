import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Cities')
@Controller('master/cities')
export class CityController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new city master entry' })
  @ApiResponse({ status: 201, description: 'City created successfully' })
  create(@Body() createCityDto: CreateCityDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_city' }, createCityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active cities (optional filter by stateId)' })
  @ApiQuery({ name: 'stateId', required: false, example: 1, description: 'Filter cities by stateId' })
  @ApiResponse({ status: 200, description: 'Return all cities' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(
    @Query('stateId') stateId?: string,
    @Query('activeOnly') activeOnly?: string,
  ): Observable<any> {
    const payload: { stateId?: number; activeOnly?: boolean } = {
      activeOnly: parseActiveOnlyFlag(activeOnly),
    };
    if (stateId !== undefined && stateId !== null && String(stateId).trim() !== '') {
      payload.stateId = Number(stateId);
    }
    return this.studentClient.send({ cmd: 'find_all_cities' }, payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get city details by cityId' })
  @ApiResponse({ status: 200, description: 'Return city details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_city' }, { cityId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update city details by cityId' })
  @ApiResponse({ status: 200, description: 'City updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCityDto: UpdateCityDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_city' }, { cityId: id, ...updateCityDto });
  }

  
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_city' },
      { cityId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a city by cityId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'City soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_city' },
      { cityId: id, DeletedBy, DeletedRemarks },
    );
  }
}
