import {Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { Observable } from 'rxjs';
import { CreateAccreditationSliderDto } from './dto/create-accreditation-slider.dto';
import { UpdateAccreditationSliderDto } from './dto/update-accreditation-slider.dto';

@ApiTags('Website - Accreditation Sliders')
@Controller('website/accreditation-sliders')
export class AccreditationSliderController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new accreditation slider entry' })
  @ApiResponse({ status: 201, description: 'Accreditation slider entry created successfully' })
  create(@Body() createDto: CreateAccreditationSliderDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_accreditation_slider' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active accreditation sliders (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all accreditation slider entries' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_accreditation_sliders' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get accreditation slider details by accreditationSliderId' })
  @ApiResponse({ status: 200, description: 'Return accreditation slider details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_accreditation_slider' }, { accreditationSliderId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update accreditation slider details by accreditationSliderId' })
  @ApiResponse({ status: 200, description: 'Accreditation slider updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAccreditationSliderDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_accreditation_slider' },
      { accreditationSliderId: id, ...updateDto },
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
      { cmd: 'update_status_accreditation_slider' },
      { accreditationSliderId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an accreditation slider entry by accreditationSliderId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete partner logo' })
  @ApiResponse({ status: 200, description: 'Accreditation slider soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_accreditation_slider' },
      { accreditationSliderId: id, DeletedBy, DeletedRemarks },
    );
  }
}
