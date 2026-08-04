import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResearchService } from './research.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Research')
@Controller('research')
export class ResearchController {
  constructor(private readonly researchService: ResearchService) {}

  @Post('projects')
  async createProject(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.researchService.createProject(tenantId, dto);
    return success(data, 'Research project created successfully');
  }

  @Get('projects')
  async findAllProjects(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('type') type?: string,
  ) {
    const data = await this.researchService.findAllProjects(tenantId, { page, limit, search, type });
    return paginated(data, 'Research projects retrieved');
  }

  @Get('projects/:id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.researchService.findById(tenantId, id);
    return success(data, 'Research project retrieved');
  }

  @Patch('projects/:id')
  async updateProject(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.researchService.updateProject(tenantId, id, dto);
    return success(data, 'Research project updated successfully');
  }

  @Delete('projects/:id')
  async removeProject(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.researchService.removeProject(tenantId, id);
    return success(data, 'Research project removed successfully');
  }

  @Post('projects/:id/publications')
  async addPublication(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.researchService.addPublication(tenantId, id, dto);
    return success(data, 'Publication added successfully');
  }

  @Get('publications')
  async findAllPublications(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('researchProjectId') researchProjectId?: string,
    @Query('type') type?: string,
  ) {
    const data = await this.researchService.findAllPublications(tenantId, { page, limit, researchProjectId, type });
    return paginated(data, 'Publications retrieved');
  }
}
