import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateMarksTypeDto } from './dto/create-marks-type.dto';
import { UpdateMarksTypeDto } from './dto/update-marks-type.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Marks Types')
@Controller('master/marks-types')
export class MarksTypeController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new marks type master entry' })
  @ApiResponse({ status: 201, description: 'Marks type created successfully' })
  create(@Body() createMarksTypeDto: CreateMarksTypeDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_marks_type' }, createMarksTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active marks types (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all marks types' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_marks_types' }, { activeOnly: parseActiveOnlyFlag(activeOnly) });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get marks type details by marksTypeId' })
  @ApiResponse({ status: 200, description: 'Return marks type details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_marks_type' }, { marksTypeId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update marks type details by marksTypeId' })
  @ApiResponse({ status: 200, description: 'Marks type updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMarksTypeDto: UpdateMarksTypeDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_marks_type' },
      { marksTypeId: id, ...updateMarksTypeDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a marks type by marksTypeId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Marks type soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_marks_type' },
      { marksTypeId: id, DeletedBy, DeletedRemarks },
    );
  }
}
