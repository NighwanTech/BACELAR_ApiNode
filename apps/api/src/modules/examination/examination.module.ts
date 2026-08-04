import { Module } from '@nestjs/common';
import { ExaminationService } from './examination.service';
import { ExaminationController } from './examination.controller';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';

@Module({
  controllers: [ExaminationController, ResultController, CertificateController],
  providers: [ExaminationService, ResultService, CertificateService],
  exports: [ExaminationService, ResultService, CertificateService],
})
export class ExaminationModule {}
