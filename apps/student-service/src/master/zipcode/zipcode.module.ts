import { Module } from '@nestjs/common';
import { ZipcodeService } from './zipcode.service';
import { ZipcodeController } from './zipcode.controller';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [ZipcodeController],
  providers: [ZipcodeService],
  exports: [ZipcodeService],
})
export class ZipcodeModule {}
