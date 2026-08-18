import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateCommitteeSubmenuDto } from './dto/create-committee-submenu.dto';
import { UpdateCommitteeSubmenuDto } from './dto/update-committee-submenu.dto';

@ApiTags('Website - Committee Submenus')
@Controller('website/committee-submenus')
export class CommitteeSubmenuController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new committee submenu entry' })
  @ApiResponse({ status: 201, description: 'Committee submenu created successfully' })
  create(@Body() createDto: CreateCommitteeSubmenuDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_committee_submenu' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active committee submenus' })
  @ApiQuery({ name: 'committeeId', required: false, type: Number, description: 'Filter by committeeId' })
  @ApiResponse({ status: 200, description: 'Return all committee submenu entries' })
  findAll(@Query('committeeId') committeeId?: string): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_all_committee_submenus' },
      { committeeId: committeeId ? parseInt(committeeId, 10) : undefined },
    );
  }

  @Get('by-committee/:committeeId')
  @ApiOperation({ summary: 'Get active committee submenus for a specific committeeId' })
  @ApiResponse({ status: 200, description: 'Return committee submenus for given committeeId' })
  findByCommittee(@Param('committeeId', ParseIntPipe) committeeId: number): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_committee_submenus_by_committee' },
      { committeeId },
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get committee submenu details by committeeSubmenuId' })
  @ApiResponse({ status: 200, description: 'Return committee submenu details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_committee_submenu' }, { committeeSubmenuId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update committee submenu details by committeeSubmenuId' })
  @ApiResponse({ status: 200, description: 'Committee submenu updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCommitteeSubmenuDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_committee_submenu' },
      { committeeSubmenuId: id, ...updateDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a committee submenu by committeeSubmenuId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete submenu' })
  @ApiResponse({ status: 200, description: 'Committee submenu soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_committee_submenu' },
      { committeeSubmenuId: id, DeletedBy, DeletedRemarks },
    );
  }
}
