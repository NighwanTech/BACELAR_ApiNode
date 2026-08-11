import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateStreamDto } from './dto/create-stream.dto';
import { UpdateStreamDto } from './dto/update-stream.dto';

@ApiTags('Master - Streams')
@Controller('master/streams')
export class StreamController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new stream master entry' })
  @ApiResponse({ status: 201, description: 'Stream created successfully' })
  create(@Body() createStreamDto: CreateStreamDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_stream' }, createStreamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active streams (optional filter by programId)' })
  @ApiQuery({ name: 'programId', required: false, example: 5 })
  @ApiResponse({ status: 200, description: 'Return all streams' })
  findAll(@Query('programId') programId?: string): Observable<any> {
    const payload =
      programId !== undefined && programId !== null && String(programId).trim() !== ''
        ? { programId: Number(programId) }
        : {};
    return this.studentClient.send({ cmd: 'find_all_streams' }, payload);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get stream details by streamId' })
  @ApiResponse({ status: 200, description: 'Return stream details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_stream' }, { streamId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update stream details by streamId' })
  @ApiResponse({ status: 200, description: 'Stream updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStreamDto: UpdateStreamDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_stream' },
      { streamId: id, ...updateStreamDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a stream by streamId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Stream soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_stream' },
      { streamId: id, DeletedBy, DeletedRemarks },
    );
  }
}
