import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ExamGrevianceController } from './exam-greviance.controller';
import { AdminExamGrevianceController } from './admin-exam-greviance.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STUDENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: Number(process.env.TCP_PORT) || 4001,
        },
      },
    ]),
  ],
  controllers: [ExamGrevianceController, AdminExamGrevianceController],
})
export class ExamGrevianceModule {}
