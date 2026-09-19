import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Semesters')
@Controller('master/semesters')
export class SemesterController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new semester master entry' })
  @ApiResponse({ status: 201, description: 'Semester created successfully' })
  create(@Body() createSemesterDto: CreateSemesterDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_semester' }, createSemesterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active semesters (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all semesters' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_semesters' }, { activeOnly: parseActiveOnlyFlag(activeOnly) });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get semester details by semId' })
  @ApiResponse({ status: 200, description: 'Return semester details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_semester' }, { semId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update semester details by semId' })
  @ApiResponse({ status: 200, description: 'Semester updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSemesterDto: UpdateSemesterDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_semester' },
      { semId: id, ...updateSemesterDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a semester by semId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Semester soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_semester' },
      { semId: id, DeletedBy, DeletedRemarks },
    );
  }
}
