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

@Module({
  imports: [
    StateModule,
    CityModule,
    ProgramCategoryModule,
    SubjectModule,
    ProgramModule,
    BoardModule,
    QualificationModule,
    AcademicSessionModule,
    ProgramFeeConfigModule,
  ],
  exports: [
    StateModule,
    CityModule,
    ProgramCategoryModule,
    SubjectModule,
    ProgramModule,
    BoardModule,
    QualificationModule,
    AcademicSessionModule,
    ProgramFeeConfigModule,
  ],
})
export class MasterModule {}
