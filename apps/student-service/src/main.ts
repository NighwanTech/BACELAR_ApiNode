import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { StudentServiceModule } from './student-service.module';

async function bootstrap() {
  const port = Number(process.env.TCP_PORT ?? 3001);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StudentServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: port,
      },
    },
  );
  await app.listen();
  console.log(`Student Microservice is listening on port ${port} via TCP`);
}
bootstrap();
