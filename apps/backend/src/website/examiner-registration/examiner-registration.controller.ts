import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Patch } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateStatusDto } from '../../common/dto/update-status.dto';
import { Observable } from 'rxjs';
import { CreateExaminerRegistrationDto } from './dto/create-examiner-registration.dto';
import { UpdateExaminerRegistrationDto } from './dto/update-examiner-registration.dto';

@ApiTags('Website - Examiner Registrations')
@Controller('website/examiner-registration')
export class ExaminerRegistrationController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Submit / Create a new examiner registration' })
  @ApiResponse({ status: 201, description: 'Examiner registration created successfully' })
  create(@Body() createDto: CreateExaminerRegistrationDto): Observable<any> {
    return this.studentClient.send({ cmd: 'create_examiner_registration' }, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active examiner registrations (where IsDeleted is false)' })
  @ApiResponse({ status: 200, description: 'Return all examiner registrations' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_examiner_registrations' }, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get examiner registration details by examinerId' })
  @ApiResponse({ status: 200, description: 'Return examiner registration details' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_examiner_registration' }, { examinerId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update examiner registration details by examinerId' })
  @ApiResponse({ status: 200, description: 'Examiner registration updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateExaminerRegistrationDto,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'update_examiner_registration' },
      { examinerId: id, ...updateDto },
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
      { cmd: 'update_status_examiner_registration' },
      { examinerId: id, ...statusDto },
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an examiner registration by examinerId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Duplicate entry' })
  @ApiResponse({ status: 200, description: 'Examiner registration soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_examiner_registration' },
      { examinerId: id, DeletedBy, DeletedRemarks },
    );
  }
}
