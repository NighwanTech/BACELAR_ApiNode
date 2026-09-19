import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateYearDto } from './dto/create-year.dto';
import { UpdateYearDto } from './dto/update-year.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Years')
@Controller('master/years')
export class YearController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new year master entry' })
  @ApiResponse({ status: 201, description: 'Year created successfully' })
  create(@Body() createYearDto: CreateYearDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_year' }, createYearDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active years (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all years' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_years' }, { activeOnly: parseActiveOnlyFlag(activeOnly) });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get year details by yearId' })
  @ApiResponse({ status: 200, description: 'Return year details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_year' }, { yearId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update year details by yearId' })
  @ApiResponse({ status: 200, description: 'Year updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateYearDto: UpdateYearDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_year' },
      { yearId: id, ...updateYearDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a year by yearId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Year soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_year' },
      { yearId: id, DeletedBy, DeletedRemarks },
    );
  }
}
