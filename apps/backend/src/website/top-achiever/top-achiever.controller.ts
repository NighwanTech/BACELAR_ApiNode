import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateTopAchieverDto } from './dto/create-top-achiever.dto';
import { UpdateTopAchieverDto } from './dto/update-top-achiever.dto';

@ApiTags('Website - Top Achievers')
@Controller('website/top-achievers')
export class TopAchieverController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new top achiever entry' })
  @ApiResponse({ status: 201, description: 'Top achiever entry created successfully' })
  create(@Body() createDto: CreateTopAchieverDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_top_achiever' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active top achievers (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all top achievers' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_top_achievers' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get top achiever details by topAchieverId' })
  @ApiResponse({ status: 200, description: 'Return top achiever details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_top_achiever' }, { topAchieverId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update top achiever details by topAchieverId' })
  @ApiResponse({ status: 200, description: 'Top achiever updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateTopAchieverDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_top_achiever' },
      { topAchieverId: id, ...updateDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a top achiever entry by topAchieverId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete entry' })
  @ApiResponse({ status: 200, description: 'Top achiever soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_top_achiever' },
      { topAchieverId: id, DeletedBy, DeletedRemarks },
    );
  }
}
