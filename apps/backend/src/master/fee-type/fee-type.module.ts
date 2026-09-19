import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FeeTypeController } from './fee-type.controller';

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
  controllers: [FeeTypeController],
})
export class FeeTypeModule {}
