import { Module } from '@nestjs/common';
import { LmsService } from './lms.service';
import { LmsController } from './lms.controller';

@Module({
  controllers: [LmsController],
  providers: [LmsService],
  exports: [LmsService],
})
export class LmsModule {}
