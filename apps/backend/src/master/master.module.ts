import { Module } from '@nestjs/common';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { ProgramCategoryModule } from './program-category/program-category.module';
import { SubjectModule } from './subject/subject.module';
import { ProgramModule } from './program/program.module';
import { BoardModule } from './board/board.module';
import { QualificationModule } from './qualification/qualification.module';
import { AcademicSessionModule } from './academic-session/academic-session.module';
import { ProgramFeeConfigModule } from './program-fee-config/program-fee-config.module';
import { CollegeModule } from './college/college.module';
import { ZipcodeModule } from './zipcode/zipcode.module';
import { ProgramEligibilityModule } from './program-eligibility/program-eligibility.module';
import { StreamModule } from './stream/stream.module';

@Module({
  imports: [
    StateModule,
    CityModule,
    ZipcodeModule,
    ProgramCategoryModule,
    SubjectModule,
    ProgramModule,
    StreamModule,
    ProgramEligibilityModule,
    BoardModule,
    QualificationModule,
    AcademicSessionModule,
    ProgramFeeConfigModule,
    CollegeModule,
  ],
  exports: [
    StateModule,
    CityModule,
    ZipcodeModule,
    ProgramCategoryModule,
    SubjectModule,
    ProgramModule,
    StreamModule,
    ProgramEligibilityModule,
    BoardModule,
    QualificationModule,
    AcademicSessionModule,
    ProgramFeeConfigModule,
    CollegeModule,
  ],
})
export class MasterModule {}

