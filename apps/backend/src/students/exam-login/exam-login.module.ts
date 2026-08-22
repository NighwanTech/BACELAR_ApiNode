import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExamLoginController } from './exam-login.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'STUDENT_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('STUDENT_SERVICE_HOST', '127.0.0.1'),
            port: Number(configService.get<number>('TCP_PORT', 4001)),
          },
        }),
      },
    ]),
  ],
  controllers: [ExamLoginController],
})
export class ExamLoginModule {}
