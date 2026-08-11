import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateHeaderButtonDto } from './dto/create-header-button.dto';
import { UpdateHeaderButtonDto } from './dto/update-header-button.dto';

@ApiTags('Website - Header Buttons')
@Controller('website/header-buttons')
export class HeaderButtonController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new header button entry' })
  @ApiResponse({ status: 201, description: 'Header button created successfully' })
  create(@Body() createDto: CreateHeaderButtonDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_header_button' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active header buttons (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all header buttons' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_header_buttons' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get header button details by headerButtonId' })
  @ApiResponse({ status: 200, description: 'Return header button details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_header_button' }, { headerButtonId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update header button details by headerButtonId' })
  @ApiResponse({ status: 200, description: 'Header button updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateHeaderButtonDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_header_button' },
      { headerButtonId: id, ...updateDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a header button by headerButtonId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete button' })
  @ApiResponse({ status: 200, description: 'Header button soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_header_button' },
      { headerButtonId: id, DeletedBy, DeletedRemarks },
    );
  }
}
