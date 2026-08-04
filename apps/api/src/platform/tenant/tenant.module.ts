import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TenantDomainService } from './tenant-domain.service';

@Module({
  controllers: [TenantController],
  providers: [TenantService, TenantDomainService],
  exports: [TenantService, TenantDomainService],
})
export class TenantModule {}
