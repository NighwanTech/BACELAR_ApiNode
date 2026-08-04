import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PlacementService } from './placement.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Placement')
@Controller('placement')
export class PlacementController {
  constructor(private readonly placementService: PlacementService) {}

  @Post('drives')
  async createDrive(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.placementService.createDrive(tenantId, dto);
    return success(data, 'Placement drive created successfully');
  }

  @Get('drives')
  async findAllDrives(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    const data = await this.placementService.findAllDrives(tenantId, { page, limit, search });
    return paginated(data, 'Placement drives retrieved');
  }

  @Get('drives/:id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.placementService.findById(tenantId, id);
    return success(data, 'Placement drive retrieved');
  }

  @Delete('drives/:id')
  async removeDrive(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.placementService.removeDrive(tenantId, id);
    return success(data, 'Placement drive removed successfully');
  }

  @Post('drives/:id/apply')
  async apply(
    @Tenant('id') tenantId: string,
    @Param('id') id: string,
    @Body('studentId') studentId: string,
    @Body('resume') resume?: string,
  ) {
    const data = await this.placementService.apply(tenantId, id, studentId, resume || '');
    return success(data, 'Application submitted successfully');
  }

  @Get('applications')
  async findAllApplications(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('driveId') driveId?: string,
    @Query('studentId') studentId?: string,
    @Query('status') status?: string,
  ) {
    const data = await this.placementService.findAllApplications(tenantId, { page, limit, driveId, studentId, status });
    return paginated(data, 'Applications retrieved');
  }

  @Patch('applications/:id/status')
  async updateStatus(
    @Tenant('id') tenantId: string,
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('offerDetails') offerDetails?: any,
    @Body('roundResults') roundResults?: any,
  ) {
    const data = await this.placementService.updateStatus(tenantId, id, status, offerDetails, roundResults);
    return success(data, 'Application status updated successfully');
  }

  @Get('stats')
  async getStats(@Tenant('id') tenantId: string) {
    const data = await this.placementService.getStats(tenantId);
    return success(data, 'Placement statistics retrieved');
  }
}
