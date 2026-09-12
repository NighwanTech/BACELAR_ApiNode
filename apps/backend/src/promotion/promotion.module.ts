import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PromotionController } from './promotion.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EXAM_RESULT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: Number(process.env.EXAM_RESULT_TCP_PORT ?? 4002),
        },
      },
    ]),
  ],
  controllers: [PromotionController],
})
export class PromotionModule {}
