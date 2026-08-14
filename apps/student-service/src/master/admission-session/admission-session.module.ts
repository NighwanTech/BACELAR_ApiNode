import { Module } from '@nestjs/common';
import { AdmissionSessionController } from './admission-session.controller';
import { AdmissionSessionService } from './admission-session.service';

@Module({
  controllers: [AdmissionSessionController],
  providers: [AdmissionSessionService],
})
export class AdmissionSessionModule {}
