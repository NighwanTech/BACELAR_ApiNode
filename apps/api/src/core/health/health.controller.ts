import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { PrismaService } from '../database/prisma.service';
import { RedisService } from '../redis/redis.service';
import { Public } from '../../common/decorators/public.decorator';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly prismaService: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  @Public()
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> => this.prismaCheck(),
      async (): Promise<HealthIndicatorResult> => this.redisCheck(),
    ]);
  }

  private async prismaCheck(): Promise<HealthIndicatorResult> {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return { database: { status: 'up' } };
    } catch (err) {
      return {
        database: { status: 'down', message: (err as Error).message },
      };
    }
  }

  private async redisCheck(): Promise<HealthIndicatorResult> {
    try {
      await this.redisService.getClient().ping();
      return { redis: { status: 'up' } };
    } catch (err) {
      return {
        redis: { status: 'down', message: (err as Error).message },
      };
    }
  }
}
