import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InstitutionService } from './institution.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Institutions')
@Controller('institutions')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post()
  async create(
    @Tenant('id') tenantId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: any,
  ) {
    const data = await this.institutionService.create(tenantId, dto, userId);
    return success(data, 'Institution created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    const data = await this.institutionService.findAll(tenantId, { page, limit, search });
    return paginated(data, 'Institutions retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.institutionService.findById(tenantId, id);
    return success(data, 'Institution retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.institutionService.update(tenantId, id, dto);
    return success(data, 'Institution updated successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.institutionService.remove(tenantId, id);
    return success(data, 'Institution removed successfully');
  }
}
