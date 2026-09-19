import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreatePaperTypeDto } from './dto/create-paper-type.dto';
import { UpdatePaperTypeDto } from './dto/update-paper-type.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Paper Types')
@Controller('master/paper-types')
export class PaperTypeController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new paper type master entry' })
  @ApiResponse({ status: 201, description: 'Paper type created successfully' })
  create(@Body() createPaperTypeDto: CreatePaperTypeDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_paper_type' }, createPaperTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active paper types (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all paper types' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_paper_types' }, { activeOnly: parseActiveOnlyFlag(activeOnly) });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get paper type details by paperTypeId' })
  @ApiResponse({ status: 200, description: 'Return paper type details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_paper_type' }, { paperTypeId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update paper type details by paperTypeId' })
  @ApiResponse({ status: 200, description: 'Paper type updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaperTypeDto: UpdatePaperTypeDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_paper_type' },
      { paperTypeId: id, ...updatePaperTypeDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a paper type by paperTypeId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Paper type soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_paper_type' },
      { paperTypeId: id, DeletedBy, DeletedRemarks },
    );
  }
}
