import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Audit')
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('logs')
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('module') module?: string,
    @Query('resource') resource?: string,
    @Query('resourceId') resourceId?: string,
    @Query('userId') userId?: string,
    @Query('action') action?: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const data = await this.auditService.findAll(tenantId, {
      page,
      limit,
      module,
      resource,
      resourceId,
      userId,
      action,
      from,
      to,
    });
    return paginated(data, 'Audit logs retrieved');
  }

  @Get('resource/:resource/:resourceId')
  async getByResource(
    @Tenant('id') tenantId: string,
    @Param('resource') resource: string,
    @Param('resourceId') resourceId: string,
  ) {
    const data = await this.auditService.getByResource(tenantId, resource, resourceId);
    return success(data, 'Audit history retrieved');
  }
}
