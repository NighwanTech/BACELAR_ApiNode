import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { Observable } from 'rxjs';
import { CreateCampusQuickLinkDto } from './dto/create-campus-quick-link.dto';
import { UpdateCampusQuickLinkDto } from './dto/update-campus-quick-link.dto';

@ApiTags('Website - Campus Quick Links')
@Controller('website/campus-quick-links')
export class CampusQuickLinkController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new campus quick link entry' })
  @ApiResponse({ status: 201, description: 'Campus quick link created successfully' })
  create(@Body() createDto: CreateCampusQuickLinkDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_campus_quick_link' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active campus quick links (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all campus quick links' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_campus_quick_links' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get campus quick link details by quickLinkId' })
  @ApiResponse({ status: 200, description: 'Return campus quick link details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_campus_quick_link' }, { quickLinkId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update campus quick link details by quickLinkId' })
  @ApiResponse({ status: 200, description: 'Campus quick link updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCampusQuickLinkDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_campus_quick_link' },
      { quickLinkId: id, ...updateDto },
    );
  }

  
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update active/inactive status' })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateStatusDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_status_campus_quick_link' },
      { quickLinkId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a campus quick link by quickLinkId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete link' })
  @ApiResponse({ status: 200, description: 'Campus quick link soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_campus_quick_link' },
      { quickLinkId: id, DeletedBy, DeletedRemarks },
    );
  }
}
