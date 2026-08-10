import { Module } from '@nestjs/common';
import { PrismaModule } from '@app/prisma';
import { CollegeController } from './college.controller';
import { CollegeService } from './college.service';

@Module({
  imports: [PrismaModule],
  controllers: [CollegeController],
  providers: [CollegeService],
  exports: [CollegeService],
})
export class CollegeModule {}
