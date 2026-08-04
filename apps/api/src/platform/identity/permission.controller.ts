import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: CreatePermissionDto) {
    const data = await this.permissionService.create(tenantId, dto);
    return success(data, 'Permission created successfully');
  }

  @Post('bulk')
  async createMany(
    @Tenant('id') tenantId: string,
    @Body() dto: CreatePermissionDto[],
  ) {
    const data = await this.permissionService.createMany(tenantId, dto);
    return success(data, 'Permissions created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('module') module?: string,
    @Query('resource') resource?: string,
    @Query('search') search?: string,
  ) {
    const data = await this.permissionService.findAll(tenantId, {
      page,
      limit,
      module,
      resource,
      search,
    });
    return paginated(data, 'Permissions retrieved');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.permissionService.remove(tenantId, id);
    return success(data, 'Permission removed successfully');
  }
}
