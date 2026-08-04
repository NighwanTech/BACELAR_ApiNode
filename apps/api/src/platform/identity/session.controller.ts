import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SessionService } from './session.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('userId') userId?: string,
    @Query('status') status?: string,
  ) {
    const data = await this.sessionService.findAll(tenantId, {
      page,
      limit,
      userId,
      status,
    });
    return paginated(data, 'Sessions retrieved');
  }

  @Delete(':id')
  async revoke(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.sessionService.revoke(tenantId, id);
    return success(data, 'Session revoked successfully');
  }
}
