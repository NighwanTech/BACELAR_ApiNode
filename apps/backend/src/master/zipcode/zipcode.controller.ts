import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateZipcodeDto } from './dto/create-zipcode.dto';
import { UpdateZipcodeDto } from './dto/update-zipcode.dto';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { parseActiveOnlyFlag } from '../../common/parse-active-only';

@ApiTags('Master - Zipcodes')
@Controller('master/zipcodes')
export class ZipcodeController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new zipcode master entry' })
  @ApiResponse({ status: 201, description: 'Zipcode created successfully' })
  create(@Body() createZipcodeDto: CreateZipcodeDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_zipcode' }, createZipcodeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active zipcodes (optional filters)' })
  @ApiQuery({ name: 'stateId', required: false, example: 1 })
  @ApiQuery({ name: 'cityId', required: false, example: 1 })
  @ApiQuery({ name: 'zipCode', required: false, example: '226001' })
  @ApiResponse({ status: 200, description: 'Return all zipcodes' })
  findAll(
    @Query('stateId') stateId?: string,
    @Query('cityId') cityId?: string,
    @Query('zipCode') zipCode?: string,
    @Query('activeOnly') activeOnly?: string,
  ): Observable<any> {
    const payload: { stateId?: number; cityId?: number; zipCode?: string; activeOnly?: boolean } = {
      activeOnly: parseActiveOnlyFlag(activeOnly),
    };
    if (stateId !== undefined && stateId !== null && String(stateId).trim() !== '') {
      payload.stateId = Number(stateId);
    }
    if (cityId !== undefined && cityId !== null && String(cityId).trim() !== '') {
      payload.cityId = Number(cityId);
    }
    if (zipCode !== undefined && zipCode !== null && String(zipCode).trim() !== '') {
      payload.zipCode = String(zipCode).trim();
    }
    return this.studentClient.send({ cmd: 'find_all_zipcodes' }, payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get zipcode details by zipcodeId' })
  @ApiResponse({ status: 200, description: 'Return zipcode details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_zipcode' }, { zipcodeId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update zipcode details by zipcodeId' })
  @ApiResponse({ status: 200, description: 'Zipcode updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateZipcodeDto: UpdateZipcodeDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_zipcode' },
      { zipcodeId: id, ...updateZipcodeDto },
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
      { cmd: 'update_status_zipcode' },
      { zipcodeId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a zipcode by zipcodeId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Zipcode soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_zipcode' },
      { zipcodeId: id, DeletedBy, DeletedRemarks },
    );
  }
}
