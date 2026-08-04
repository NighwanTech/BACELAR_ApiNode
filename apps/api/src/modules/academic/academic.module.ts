import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SemesterService } from './semester.service';
import { SemesterController } from './semester.controller';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { BatchService } from './batch.service';
import { BatchController } from './batch.controller';

@Module({
  controllers: [
    InstitutionController,
    ProgramController,
    CourseController,
    SemesterController,
    DepartmentController,
    SubjectController,
    BatchController,
  ],
  providers: [
    InstitutionService,
    ProgramService,
    CourseService,
    SemesterService,
    DepartmentService,
    SubjectService,
    BatchService,
  ],
  exports: [
    InstitutionService,
    ProgramService,
    CourseService,
    SemesterService,
    DepartmentService,
    SubjectService,
    BatchService,
  ],
})
export class AcademicModule {}
