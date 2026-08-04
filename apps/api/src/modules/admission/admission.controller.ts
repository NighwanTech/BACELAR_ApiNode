import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdmissionService } from './admission.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Admissions')
@Controller('admissions')
export class AdmissionController {
  constructor(private readonly admissionService: AdmissionService) {}

  @Post('apply')
  async apply(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.admissionService.apply(tenantId, dto);
    return success(data, 'Application submitted successfully');
  }

  @Get('applications')
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('programId') programId?: string,
  ) {
    const data = await this.admissionService.findAll(tenantId, {
      page,
      limit,
      search,
      status,
      programId,
    });
    return paginated(data, 'Applications retrieved');
  }

  @Get('stats')
  async getStats(@Tenant('id') tenantId: string) {
    const data = await this.admissionService.getStats(tenantId);
    return success(data, 'Admission statistics retrieved');
  }

  @Get('applications/:id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.admissionService.findById(tenantId, id);
    return success(data, 'Application retrieved');
  }

  @Patch('applications/:id/status')
  async updateStatus(
    @Tenant('id') tenantId: string,
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body('status') status: string,
    @Body('comment') comment?: string,
  ) {
    const data = await this.admissionService.updateStatus(tenantId, id, status, comment || '', userId);
    return success(data, 'Application status updated');
  }

  @Post('applications/:id/enroll')
  async enroll(
    @Tenant('id') tenantId: string,
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @Body() dto: any,
  ) {
    const data = await this.admissionService.enroll(tenantId, id, dto, userId);
    return success(data, 'Student enrolled successfully');
  }

  @Post('schedules')
  async createSchedule(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.admissionService.createSchedule(tenantId, dto);
    return success(data, 'Admission schedule created');
  }

  @Get('schedules')
  async getSchedules(
    @Tenant('id') tenantId: string,
    @Query('programId') programId?: string,
  ) {
    const data = await this.admissionService.getSchedules(tenantId, { programId });
    return success(data, 'Admission schedules retrieved');
  }
}
