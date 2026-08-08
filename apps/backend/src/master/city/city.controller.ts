import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

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
  @ApiOperation({ summary: 'Get all active cities (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all cities' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_cities' }, {});
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
