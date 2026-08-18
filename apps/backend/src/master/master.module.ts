import { Module } from '@nestjs/common';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { ProgramCategoryModule } from './program-category/program-category.module';
import { SubjectModule } from './subject/subject.module';
import { ProgramModule } from './program/program.module';
import { BoardModule } from './board/board.module';
import { QualificationModule } from './qualification/qualification.module';
import { AdmissionSessionModule } from './admission-session/admission-session.module';
import { AcademicSessionModule } from './academic-session/academic-session.module';
import { ProgramFeeConfigModule } from './program-fee-config/program-fee-config.module';
import { CollegeModule } from './college/college.module';
import { ZipcodeModule } from './zipcode/zipcode.module';
import { ProgramEligibilityModule } from './program-eligibility/program-eligibility.module';
import { StreamModule } from './stream/stream.module';
import { ProgramSubjectModule } from './program-subject/program-subject.module';
import { ExaminationDetailsModule } from './examination-details/examination-details.module';
import { PaperTypeModule } from './paper-type/paper-type.module';
import { ExamTypeModule } from './exam-type/exam-type.module';
import { YearModule } from './year/year.module';
import { SemesterModule } from './semester/semester.module';
import { PaperDetailModule } from './paper-detail/paper-detail.module';

@Module({
  imports: [
    StateModule,
    CityModule,
    ZipcodeModule,
    ProgramCategoryModule,
    SubjectModule,
    ProgramModule,
    StreamModule,
    ProgramSubjectModule,
    ProgramEligibilityModule,
    BoardModule,
    QualificationModule,
    AdmissionSessionModule,
    AcademicSessionModule,
    ExaminationDetailsModule,
    ProgramFeeConfigModule,
    CollegeModule,
    PaperTypeModule,
    ExamTypeModule,
    YearModule,
    SemesterModule,
    PaperDetailModule,
  ],
  exports: [
    StateModule,
    CityModule,
    ZipcodeModule,
    ProgramCategoryModule,
    SubjectModule,
    ProgramModule,
    StreamModule,
    ProgramSubjectModule,
    ProgramEligibilityModule,
    BoardModule,
    QualificationModule,
    AdmissionSessionModule,
    AcademicSessionModule,
    ExaminationDetailsModule,
    ProgramFeeConfigModule,
    CollegeModule,
    PaperTypeModule,
    ExamTypeModule,
    YearModule,
    SemesterModule,
    PaperDetailModule,
  ],
})
export class MasterModule {}







