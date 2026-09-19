import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateCommitteeDto } from './dto/create-committee.dto';
import { UpdateCommitteeDto } from './dto/update-committee.dto';

@ApiTags('Website - Committees')
@Controller('website/committees')
export class CommitteeController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new committee entry' })
  @ApiResponse({ status: 201, description: 'Committee entry created successfully' })
  create(@Body() createDto: CreateCommitteeDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_committee' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active committees (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all committee entries' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_committees' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get committee details by committeeId' })
  @ApiResponse({ status: 200, description: 'Return committee details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_committee' }, { committeeId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update committee details by committeeId' })
  @ApiResponse({ status: 200, description: 'Committee updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCommitteeDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_committee' },
      { committeeId: id, ...updateDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a committee entry by committeeId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete committee' })
  @ApiResponse({ status: 200, description: 'Committee soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_committee' },
      { committeeId: id, DeletedBy, DeletedRemarks },
    );
  }
}
