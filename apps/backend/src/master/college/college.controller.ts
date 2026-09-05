import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateCollegeDto } from './dto/create-college.dto';
import { UpdateCollegeDto } from './dto/update-college.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Colleges')
@Controller('master/colleges')
export class CollegeController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new college master entry' })
  @ApiResponse({ status: 201, description: 'College created successfully' })
  create(@Body() createCollegeDto: CreateCollegeDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_college' }, createCollegeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active colleges (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all colleges' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_colleges' }, { activeOnly: parseActiveOnlyFlag(activeOnly) });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get college details by collegeId' })
  @ApiResponse({ status: 200, description: 'Return college details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_college' }, { collegeId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update college details by collegeId' })
  @ApiResponse({ status: 200, description: 'College updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCollegeDto: UpdateCollegeDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_college' }, { collegeId: id, ...updateCollegeDto });
  }

  
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_college' },
      { collegeId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a college by collegeId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'College soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_college' },
      { collegeId: id, DeletedBy, DeletedRemarks },
    );
  }
}
