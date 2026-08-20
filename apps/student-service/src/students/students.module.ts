import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@app/prisma';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { StudentProfileModule } from './student-profile/student-profile.module';
import { StudentAcademicModule } from './student-academic/student-academic.module';
import { StudentAcademicSubjectModule } from './student-academic-subject/student-academic-subject.module';
import { StudentProgramSubjectModule } from './student-program-subject/student-program-subject.module';
import { StudentPaymentModule } from './student-payment/student-payment.module';
import { StudentAttachmentModule } from './student-attachment/student-attachment.module';
import { StudentEnrollmentModule } from './student-enrollment/student-enrollment.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-jwt-key',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
    }),
    StudentProfileModule,
    StudentAcademicModule,
    StudentAcademicSubjectModule,
    StudentProgramSubjectModule,
    StudentPaymentModule,
    StudentAttachmentModule,
    StudentEnrollmentModule,
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
