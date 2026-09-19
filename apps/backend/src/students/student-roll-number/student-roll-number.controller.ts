import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { GenerateStudentRollNumberDto } from './dto/generate-student-roll-number.dto';
import { BulkDeleteStudentRollNumbersDto } from './dto/bulk-delete-student-roll-numbers.dto';

@ApiTags('Student - Roll Numbers')
@Controller('students-roll-numbers')
export class StudentRollNumberController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List enrolled students with roll numbers for filters' })
  @ApiQuery({ name: 'sessionId', required: false })
  @ApiQuery({ name: 'academicSessionId', required: false })
  @ApiQuery({ name: 'programCategoryId', required: false })
  @ApiQuery({ name: 'programId', required: false })
  @ApiQuery({ name: 'yearId', required: false })
  @ApiQuery({ name: 'semId', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'Return roll number list rows' })
  list(
    @Query('sessionId') sessionId?: string,
    @Query('academicSessionId') academicSessionId?: string,
    @Query('programCategoryId') programCategoryId?: string,
    @Query('programId') programId?: string,
    @Query('yearId') yearId?: string,
    @Query('semId') semId?: string,
    @Query('search') search?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'list_student_roll_numbers' },
      { sessionId, academicSessionId, programCategoryId, programId, yearId, semId, search },
    );
  }

  @Post('generate')
  @ApiOperation({
    summary:
      'Generate 12-digit roll numbers sorted by Student Name A-Z then Father Name A-Z (never duplicate; same year keeps same roll across semesters)',
  })
  @ApiResponse({ status: 201, description: 'Roll numbers generated' })
  generate(@Body() dto: GenerateStudentRollNumberDto): Observable<any> {
    return this.studentClient.send({ cmd: 'generate_student_roll_numbers' }, dto);
  }

  @Post('bulk-delete')
  @ApiOperation({ summary: 'Delete multiple generated roll numbers' })
  @ApiResponse({ status: 200, description: 'Roll numbers deleted' })
  bulkRemove(@Body() dto: BulkDeleteStudentRollNumbersDto): Observable<any> {
    return this.studentClient.send({ cmd: 'bulk_delete_student_roll_numbers' }, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a generated roll number by rollId' })
  @ApiQuery({ name: 'DeletedBy', required: true, example: 'Admin User' })
  @ApiQuery({ name: 'DeletedRemarks', required: false })
  @ApiResponse({ status: 200, description: 'Roll number deleted' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('DeletedBy') DeletedBy: string,
    @Query('DeletedRemarks') DeletedRemarks?: string,
  ): Observable<any> {
    return this.studentClient.send(
      { cmd: 'delete_student_roll_number' },
      { rollId: id, DeletedBy, DeletedRemarks },
    );
  }
}
