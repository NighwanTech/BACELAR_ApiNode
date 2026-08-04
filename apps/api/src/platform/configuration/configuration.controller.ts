import { Body, Controller, Get, Patch, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigurationService } from './configuration.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success } from '@universityos/common';

@ApiTags('Configuration')
@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get()
  async getConfig(@Tenant('id') tenantId: string) {
    const data = await this.configurationService.getConfig(tenantId);
    return success(data, 'Configuration retrieved');
  }

  @Put()
  async updateConfig(
    @Tenant('id') tenantId: string,
    @Body() config: Record<string, unknown>,
  ) {
    const data = await this.configurationService.updateConfig(tenantId, config);
    return success(data, 'Configuration updated successfully');
  }

  @Patch('theme')
  async updateTheme(
    @Tenant('id') tenantId: string,
    @Body() theme: Record<string, unknown>,
  ) {
    const data = await this.configurationService.updateTheme(tenantId, theme);
    return success(data, 'Theme updated successfully');
  }

  @Patch('academic-year')
  async updateAcademicYear(
    @Tenant('id') tenantId: string,
    @Body('academicYear') academicYear: string,
  ) {
    const data = await this.configurationService.updateAcademicYear(tenantId, academicYear);
    return success(data, 'Academic year updated successfully');
  }

  @Get('modules')
  async getModules(@Tenant('id') tenantId: string) {
    const data = await this.configurationService.getModules(tenantId);
    return success(data, 'Modules retrieved');
  }
}
