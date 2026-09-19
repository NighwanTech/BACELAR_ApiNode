import { Module } from '@nestjs/common';
import { EntrancePaperController } from './entrance-paper.controller';
import { EntrancePaperService } from './entrance-paper.service';

@Module({
  controllers: [EntrancePaperController],
  providers: [EntrancePaperService],
  exports: [EntrancePaperService],
})
export class EntrancePaperModule {}
