import { Module } from '@nestjs/common';
import { PramanSubParameterController } from './praman-sub-parameter.controller';
import { PramanSubParameterService } from './praman-sub-parameter.service';

@Module({
  controllers: [PramanSubParameterController],
  providers: [PramanSubParameterService],
  exports: [PramanSubParameterService],
})
export class PramanSubParameterModule {}
