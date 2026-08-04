import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FeatureFlagService } from './feature-flag.service';
import { SetFeatureFlagDto } from './dto/set-feature-flag.dto';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Feature Flags')
@Controller('feature-flags')
export class FeatureFlagController {
  constructor(private readonly featureFlagService: FeatureFlagService) {}

  @Post()
  async set(@Tenant('id') tenantId: string, @Body() dto: SetFeatureFlagDto) {
    const data = await this.featureFlagService.set(tenantId, dto);
    return success(data, 'Feature flag set successfully');
  }

  @Post('bulk')
  async bulkSet(@Tenant('id') tenantId: string, @Body() flags: SetFeatureFlagDto[]) {
    const data = await this.featureFlagService.bulkSet(tenantId, flags);
    return success(data, 'Feature flags set successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('module') module?: string,
  ) {
    const data = await this.featureFlagService.findAll(tenantId, { page, limit, module });
    return paginated(data, 'Feature flags retrieved');
  }

  @Get('all')
  async getAll(@Tenant('id') tenantId: string) {
    const data = await this.featureFlagService.getAllAsMap(tenantId);
    return success(data, 'Feature flags retrieved');
  }

  @Delete(':key')
  async remove(@Tenant('id') tenantId: string, @Param('key') key: string) {
    const data = await this.featureFlagService.remove(tenantId, key);
    return success(data, 'Feature flag removed successfully');
  }
}
