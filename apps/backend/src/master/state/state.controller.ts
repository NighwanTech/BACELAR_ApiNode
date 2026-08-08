import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';

@ApiTags('Master - States')
@Controller('master/states')
export class StateController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new state master entry' })
  @ApiResponse({ status: 201, description: 'State created successfully' })
  create(@Body() createStateDto: CreateStateDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_state' }, createStateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active states (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all states' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_states' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get state details by stateId' })
  @ApiResponse({ status: 200, description: 'Return state details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_state' }, { stateId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update state details by stateId' })
  @ApiResponse({ status: 200, description: 'State updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStateDto: UpdateStateDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_state' }, { stateId: id, ...updateStateDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a state by stateId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'State soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_state' },
      { stateId: id, DeletedBy, DeletedRemarks },
    );
  }
}
