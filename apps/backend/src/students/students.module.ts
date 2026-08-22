import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentsController } from './students.controller';
import { StudentProfileController } from './student-profile.controller';
import { StudentAcademicModule } from './student-academic/student-academic.module';
import { StudentAcademicSubjectModule } from './student-academic-subject/student-academic-subject.module';
import { StudentProgramSubjectModule } from './student-program-subject/student-program-subject.module';
import { StudentPaymentModule } from './student-payment/student-payment.module';
import { StudentAttachmentModule } from './student-attachment/student-attachment.module';
import { StudentEnrollmentModule } from './student-enrollment/student-enrollment.module';
import { ExamLoginModule } from './exam-login/exam-login.module';

@Module({
  imports: [
    // Register the TCP client inside the StudentsModule for self-containment
    ClientsModule.register([
      {
        name: 'STUDENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: Number(process.env.TCP_PORT ?? 4001),
        },
      },
    ]),
    StudentAcademicModule,
    StudentAcademicSubjectModule,
    StudentProgramSubjectModule,
    StudentPaymentModule,
    StudentAttachmentModule,
    StudentEnrollmentModule,
    ExamLoginModule,
  ],
  controllers: [StudentsController, StudentProfileController],
})
export class StudentsModule {}
