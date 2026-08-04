import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { success, paginated } from '@universityos/common';

@ApiTags('Tenants')
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async create(@Body() dto: CreateTenantDto) {
    const data = await this.tenantService.create(dto);
    return success(data, 'Tenant created successfully');
  }

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    const data = await this.tenantService.findAll({ page, limit, search, status });
    return paginated(data, 'Tenants retrieved');
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const data = await this.tenantService.findById(id);
    return success(data, 'Tenant retrieved');
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    const data = await this.tenantService.update(id, dto);
    return success(data, 'Tenant updated successfully');
  }

  @Patch(':id/branding')
  async updateBranding(
    @Param('id') id: string,
    @Body() branding: Record<string, unknown>,
  ) {
    const data = await this.tenantService.updateBranding(id, branding);
    return success(data, 'Branding updated successfully');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.tenantService.remove(id);
    return success(data, 'Tenant removed successfully');
  }
}
