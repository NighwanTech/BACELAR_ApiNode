import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { TopAchieverController } from './top-achiever.controller';
import { TopAchieverService } from './top-achiever.service';

@Module({
  imports: [PrismaModule],
  controllers: [TopAchieverController],
  providers: [TopAchieverService],
  exports: [TopAchieverService],
})
export class TopAchieverModule {}
