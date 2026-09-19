import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ExamResultServiceModule } from './exam-result-service.module';

async function bootstrap() {
  const port = Number(process.env.EXAM_RESULT_TCP_PORT ?? 4002);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ExamResultServiceModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: port,
      },
    },
  );
  await app.listen();
  console.log(`Exam Result Microservice is listening on port ${port} via TCP`);
}
bootstrap();
