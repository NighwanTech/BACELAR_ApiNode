import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateProgramCategoryDto } from './dto/create-program-category.dto';
import { UpdateProgramCategoryDto } from './dto/update-program-category.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';

@ApiTags('Master - Program Categories')
@Controller('master/program-categories')
export class ProgramCategoryController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new program category entry' })
  @ApiResponse({ status: 201, description: 'Program category created successfully' })
  create(@Body() createDto: CreateProgramCategoryDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_program_category' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active program categories (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all program categories' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_program_categories' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get program category details by programCategoryId' })
  @ApiResponse({ status: 200, description: 'Return program category details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_program_category' }, { programCategoryId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update program category details by programCategoryId' })
  @ApiResponse({ status: 200, description: 'Program category updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProgramCategoryDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_program_category' }, { programCategoryId: id, ...updateDto });
  }

  
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_program_category' },
      { programCategoryId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a program category by programCategoryId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Program category soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_program_category' },
      { programCategoryId: id, DeletedBy, DeletedRemarks },
    );
  }
}
