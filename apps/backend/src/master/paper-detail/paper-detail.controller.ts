import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreatePaperDetailDto } from './dto/create-paper-detail.dto';
import { UpdatePaperDetailDto } from './dto/update-paper-detail.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Paper Details')
@Controller('master/paper-details')
export class PaperDetailController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new paper detail master entry' })
  @ApiResponse({ status: 201, description: 'Paper detail created successfully' })
  create(@Body() createPaperDetailDto: CreatePaperDetailDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_paper_detail' }, createPaperDetailDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active paper details (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all paper details' })
  @ApiQuery({ name: 'activeOnly', required: false, example: true, description: 'If true, return only IsActive records (dropdowns)' })
  findAll(@Query('activeOnly') activeOnly?: string): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_paper_details' }, { activeOnly: parseActiveOnlyFlag(activeOnly) });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get paper detail by paperId' })
  @ApiResponse({ status: 200, description: 'Return paper detail' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_paper_detail' }, { paperId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update paper detail by paperId' })
  @ApiResponse({ status: 200, description: 'Paper detail updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaperDetailDto: UpdatePaperDetailDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_paper_detail' },
      { paperId: id, ...updatePaperDetailDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a paper detail by paperId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Paper detail soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_paper_detail' },
      { paperId: id, DeletedBy, DeletedRemarks },
    );
  }
}
