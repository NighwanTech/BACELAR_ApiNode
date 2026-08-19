import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { BulkDeleteProgramsDto } from './dto/bulk-delete-programs.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';

@ApiTags('Master - Programs')
@Controller('master/programs')
export class ProgramController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new program entry' })
  @ApiResponse({ status: 201, description: 'Program created successfully' })
  create(@Body() createDto: CreateProgramDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_program' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active programs (filterable by categoryId)' })
  @ApiQuery({ name: 'categoryId', required: false, type: Number, description: 'Filter by ProgramCategory ID' })
  @ApiResponse({ status: 200, description: 'Return all programs' })
  findAll(@Query('categoryId') categoryId?: string): Observable<any> {
    const filter: any = {};
    if (categoryId) {
      filter.categoryId = Number(categoryId);
    }
    return this.studentClient.send({ cmd: 'find_all_programs' }, filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get program details by programId' })
  @ApiResponse({ status: 200, description: 'Return program details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_program' }, { programId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update program details by programId' })
  @ApiResponse({ status: 200, description: 'Program updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProgramDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_program' }, { programId: id, ...updateDto });
  }

  
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_program' },
      { programId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a program by programId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete course' })
  @ApiResponse({ status: 200, description: 'Program soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_program' },
      { programId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple programs' })
  @ApiResponse({ status: 200, description: 'Programs bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteProgramsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_programs' }, bulkDeleteDto);
  }
}
