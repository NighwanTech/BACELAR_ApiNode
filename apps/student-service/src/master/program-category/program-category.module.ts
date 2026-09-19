import { Module } from '@nestjs/common';
import { ProgramCategoryService } from './program-category.service';
import { ProgramCategoryController } from './program-category.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [ProgramCategoryController],
  providers: [ProgramCategoryService],
  exports: [ProgramCategoryService],
})
export class ProgramCategoryModule {}
