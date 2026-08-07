import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StudentsController } from './students.controller';

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
  ],
  controllers: [StudentsController],
})
export class StudentsModule {}
