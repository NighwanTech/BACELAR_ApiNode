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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: CreateUserDto) {
    const data = await this.userService.create(tenantId, dto);
    return success(data, 'User created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('type') type?: string,
  ) {
    const data = await this.userService.findAll(tenantId, { page, limit, search, status, type });
    return paginated(data, 'Users retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.userService.findById(tenantId, id);
    return success(data, 'User retrieved');
  }

  @Patch(':id')
  async update(
    @Tenant('id') tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    const data = await this.userService.update(tenantId, id, dto);
    return success(data, 'User updated successfully');
  }

  @Post(':id/roles')
  async assignRoles(
    @Param('id') id: string,
    @Body('roleIds') roleIds: string[],
  ) {
    const data = await this.userService.assignRoles(id, roleIds);
    return success(data, 'Roles assigned successfully');
  }

  @Delete(':id/roles/:roleId')
  async removeRole(@Param('id') id: string, @Param('roleId') roleId: string) {
    const data = await this.userService.removeRole(id, roleId);
    return success(data, 'Role removed successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.userService.remove(tenantId, id);
    return success(data, 'User removed successfully');
  }
}
