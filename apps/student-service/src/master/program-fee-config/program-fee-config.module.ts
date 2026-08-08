import { Module } from '@nestjs/common';
import { ProgramFeeConfigController } from './program-fee-config.controller';
import { ProgramFeeConfigService } from './program-fee-config.service';

@Module({
  controllers: [ProgramFeeConfigController],
  providers: [ProgramFeeConfigService],
})
export class ProgramFeeConfigModule {}
