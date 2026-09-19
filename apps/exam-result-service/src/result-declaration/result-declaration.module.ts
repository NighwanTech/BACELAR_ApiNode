import { Module } from '@nestjs/common';
import { ResultDeclarationController } from './result-declaration.controller';
import { ResultDeclarationService } from './result-declaration.service';

@Module({
  controllers: [ResultDeclarationController],
  providers: [ResultDeclarationService],
  exports: [ResultDeclarationService],
})
export class ResultDeclarationModule {}
