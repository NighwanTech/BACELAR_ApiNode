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
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: CreateRoleDto) {
    const data = await this.roleService.create(tenantId, dto);
    return success(data, 'Role created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    const data = await this.roleService.findAll(tenantId, { page, limit, search });
    return paginated(data, 'Roles retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.roleService.findById(tenantId, id);
    return success(data, 'Role retrieved');
  }

  @Patch(':id')
  async update(
    @Tenant('id') tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
  ) {
    const data = await this.roleService.update(tenantId, id, dto);
    return success(data, 'Role updated successfully');
  }

  @Post(':id/permissions')
  async assignPermissions(
    @Param('id') id: string,
    @Body('permissionIds') permissionIds: string[],
  ) {
    const data = await this.roleService.assignPermissions(id, permissionIds);
    return success(data, 'Permissions assigned successfully');
  }

  @Delete(':id/permissions/:permissionId')
  async removePermission(
    @Param('id') id: string,
    @Param('permissionId') permissionId: string,
  ) {
    const data = await this.roleService.removePermission(id, permissionId);
    return success(data, 'Permission removed successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.roleService.remove(tenantId, id);
    return success(data, 'Role removed successfully');
  }
}
