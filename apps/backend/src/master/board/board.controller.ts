import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BulkDeleteBoardsDto } from './dto/bulk-delete-boards.dto';

@ApiTags('Master - Boards')
@Controller('master/boards')
export class BoardController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new board entry' })
  @ApiResponse({ status: 201, description: 'Board created successfully' })
  create(@Body() createDto: CreateBoardDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_board' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active boards (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all boards' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_boards' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get board details by boardId' })
  @ApiResponse({ status: 200, description: 'Return board details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_board' }, { boardId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update board details by boardId' })
  @ApiResponse({ status: 200, description: 'Board updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateBoardDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_board' }, { boardId: id, ...updateDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a board by boardId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Obsolete board' })
  @ApiResponse({ status: 200, description: 'Board soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_board' },
      { boardId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple boards' })
  @ApiResponse({ status: 200, description: 'Boards bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteBoardsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_boards' }, bulkDeleteDto);
  }
}
