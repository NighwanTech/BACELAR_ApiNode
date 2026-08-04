import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib';
import { RABBITMQ_EXCHANGE, RabbitQueues } from './rabbit.constants';

@Injectable()
export class RabbitService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitService.name);
  private connection: Connection;
  private channel: Channel;
  private readonly queues = Object.values(RabbitQueues);

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const url = this.config.get<string>('RABBITMQ_URL', 'amqp://localhost:5672');
    try {
      this.connection = await amqp.connect(url);
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(RABBITMQ_EXCHANGE, 'topic', {
        durable: true,
      });
      for (const queue of this.queues) {
        await this.channel.assertQueue(queue, { durable: true });
        await this.channel.bindQueue(queue, RABBITMQ_EXCHANGE, `${queue}.*`);
        await this.channel.bindQueue(queue, RABBITMQ_EXCHANGE, `*.${queue}`);
      }
      this.logger.log('RabbitMQ connected');
    } catch (err) {
      this.logger.error(`RabbitMQ connection failed: ${err.message}`);
    }
  }

  async onModuleDestroy() {
    try {
      await this.channel?.close();
      await this.connection?.close();
    } catch {
      // ignore
    }
  }

  async publish(routingKey: string, payload: unknown): Promise<void> {
    if (!this.channel) {
      this.logger.warn('RabbitMQ channel not available, skipping publish');
      return;
    }
    this.channel.publish(
      RABBITMQ_EXCHANGE,
      routingKey,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true },
    );
  }

  async consume(
    queue: string,
    handler: (message: unknown, raw: ConsumeMessage) => Promise<void>,
  ): Promise<void> {
    if (!this.channel) return;
    await this.channel.consume(queue, async (msg) => {
      if (!msg) return;
      try {
        const content = JSON.parse(msg.content.toString());
        await handler(content, msg);
        this.channel.ack(msg);
      } catch (err) {
        this.logger.error(`Queue consumer error: ${err.message}`);
        this.channel.nack(msg, false, true);
      }
    });
  }

  getChannel(): Channel {
    return this.channel;
  }
}
