import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateNoticeBoardDto } from './dto/create-notice-board.dto';
import { UpdateNoticeBoardDto } from './dto/update-notice-board.dto';

@ApiTags('Website - Notice Boards')
@Controller('website/notice-boards')
export class NoticeBoardController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notice board entry' })
  @ApiResponse({ status: 201, description: 'Notice board entry created successfully' })
  create(@Body() createDto: CreateNoticeBoardDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_notice_board' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active notice boards (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all notice board entries' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_notice_boards' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notice board details by noticeBoardId' })
  @ApiResponse({ status: 200, description: 'Return notice board details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_notice_board' }, { noticeBoardId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update notice board details by noticeBoardId' })
  @ApiResponse({ status: 200, description: 'Notice board updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateNoticeBoardDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_notice_board' },
      { noticeBoardId: id, ...updateDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a notice board entry by noticeBoardId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete notice' })
  @ApiResponse({ status: 200, description: 'Notice board soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_notice_board' },
      { noticeBoardId: id, DeletedBy, DeletedRemarks },
    );
  }
}
