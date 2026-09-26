import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { ErrorLogController } from './error-log.controller';
import { ErrorLogService } from './error-log.service';

@Module({
  imports: [PrismaModule],
  controllers: [ErrorLogController],
  providers: [ErrorLogService],
  exports: [ErrorLogService],
})
export class ErrorLogModule {}
