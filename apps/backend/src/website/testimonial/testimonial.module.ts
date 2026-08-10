import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TestimonialController } from './testimonial.controller';

@Module({
  imports: [
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
  controllers: [TestimonialController],
})
export class TestimonialModule {}
