import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const { method, url } = req;
    const start = Date.now();
    res.raw.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.log(`${method} ${url} ${res.statusCode} ${duration}ms`);
    });
    next();
  }
}
