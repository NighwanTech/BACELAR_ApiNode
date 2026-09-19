import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { SaveStudentProgramSubjectsDto } from './dto/save-student-program-subjects.dto';

@ApiTags('Students - Program Subjects')
@Controller('students-program-subjects')
export class StudentProgramSubjectController {
  constructor(
    @Inject('STUDENT_SERVICE') private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Save chosen program subjects for a student (overwrite)' })
  @ApiResponse({ status: 200, description: 'Student program subjects saved successfully' })
  save(@Body() saveDto: SaveStudentProgramSubjectsDto): Observable<any> {
    return this.studentClient.send({ cmd: 'save_student_program_subjects' }, saveDto);
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Get chosen program subjects for a student' })
  @ApiResponse({ status: 200, description: 'Return student program subject list' })
  findByStudent(@Param('studentId', ParseIntPipe) studentId: number): Observable<any> {
    return this.studentClient.send(
      { cmd: 'find_student_program_subjects_by_student' },
      { studentId },
    );
  }
}
