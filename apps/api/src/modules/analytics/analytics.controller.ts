import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success } from '@universityos/common';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  async getDashboardStats(@Tenant('id') tenantId: string) {
    const data = await this.analyticsService.getDashboardStats(tenantId);
    return success(data, 'Dashboard statistics retrieved');
  }

  @Get('students')
  async getStudentStats(@Tenant('id') tenantId: string) {
    const data = await this.analyticsService.getStudentStats(tenantId);
    return success(data, 'Student statistics retrieved');
  }

  @Get('admissions')
  async getAdmissionStats(@Tenant('id') tenantId: string, @Query('year') year?: number) {
    const data = await this.analyticsService.getAdmissionStats(tenantId, year);
    return success(data, 'Admission statistics retrieved');
  }

  @Get('finance')
  async getFinancialSummary(
    @Tenant('id') tenantId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    const data = await this.analyticsService.getFinancialSummary(tenantId, from, to);
    return success(data, 'Financial summary retrieved');
  }
}
