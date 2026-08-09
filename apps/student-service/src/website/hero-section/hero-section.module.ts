import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { HeroSectionController } from './hero-section.controller';
import { HeroSectionService } from './hero-section.service';

@Module({
  imports: [PrismaModule],
  controllers: [HeroSectionController],
  providers: [HeroSectionService],
  exports: [HeroSectionService],
})
export class HeroSectionModule {}
