import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success } from '@universityos/common';

@ApiTags('Reports')
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @CurrentUser('id') userId: string, @Body() dto: any) {
    const data = await this.reportService.create(tenantId, dto, userId);
    return success(data, 'Report created successfully');
  }

  @Get()
  async findAll(@Tenant('id') tenantId: string, @Query('category') category?: string) {
    const data = await this.reportService.findAll(tenantId, { category });
    return success(data, 'Reports retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.reportService.findById(tenantId, id);
    return success(data, 'Report retrieved');
  }

  @Post(':id/execute')
  async execute(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() params: any) {
    const data = await this.reportService.execute(tenantId, id, params);
    return success(data, 'Report executed successfully');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.reportService.update(tenantId, id, dto);
    return success(data, 'Report updated successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.reportService.remove(tenantId, id);
    return success(data, 'Report removed successfully');
  }
}
