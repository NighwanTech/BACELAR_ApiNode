import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { NoticeBoardController } from './notice-board.controller';
import { NoticeBoardService } from './notice-board.service';

@Module({
  imports: [PrismaModule],
  controllers: [NoticeBoardController],
  providers: [NoticeBoardService],
  exports: [NoticeBoardService],
})
export class NoticeBoardModule {}
