import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { SaveAcademicDetailsDto } from './dto/save-academic-details.dto';
import { UpdateAcademicDetailDto } from './dto/update-academic-detail.dto';
import { BulkDeleteAcademicDetailsDto } from './dto/bulk-delete-academic-details.dto';

@ApiTags('Students - Academic Details')
@Controller('students-academic')
export class StudentAcademicController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Save or update student academic details and subjects (Wizard Step 2)' })
  @ApiResponse({ status: 200, description: 'Academic qualifications and subjects saved successfully' })
  save(@Body() saveDto: SaveAcademicDetailsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'save_student_academic_details' }, saveDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all qualification detail entries' })
  @ApiResponse({ status: 200, description: 'Return all academic details' })
  findAll(): Observable<any> {
    return this.studentClient.send({ cmd: 'find_all_academic_details' }, {});
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Get all qualification detail entries for a specific student' })
  @ApiResponse({ status: 200, description: 'Return student qualification list' })
  findByStudent(@Param('studentId', ParseIntPipe) studentId: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_academic_details_by_student' }, { studentId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific qualification detail by ID' })
  @ApiResponse({ status: 200, description: 'Return qualification details and its subjects' })
  findOne(@Param('id', ParseIntPipe) id: number): Observable<any> {
    return this.studentClient.send({ cmd: 'find_one_academic_detail' }, { academicDetailId: id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a specific qualification detail by ID' })
  @ApiResponse({ status: 200, description: 'Qualification detail updated successfully' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAcademicDetailDto,
  ): Observable<any> {
    return this.studentClient.send({ cmd: 'update_academic_detail' }, { academicDetailId: id, ...updateDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete qualification detail by ID' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false, example: 'Mistake entry' })
  @ApiResponse({ status: 200, description: 'Qualification detail soft deleted successfully' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_academic_detail' },
      { academicDetailId: id, DeletedBy, DeletedRemarks },
    );
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk soft delete multiple qualification details' })
  @ApiResponse({ status: 200, description: 'Qualifications bulk soft deleted successfully' })
  bulkRemove(@Body() bulkDeleteDto: BulkDeleteAcademicDetailsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_academic_details' }, bulkDeleteDto);
  }
}
