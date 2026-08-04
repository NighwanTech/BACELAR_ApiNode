import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './department.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.departmentService.create(tenantId, dto);
    return success(data, 'Department created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('institutionId') institutionId?: string,
    @Query('campusId') campusId?: string,
  ) {
    const data = await this.departmentService.findAll(tenantId, {
      page,
      limit,
      search,
      institutionId,
      campusId,
    });
    return paginated(data, 'Departments retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.departmentService.findById(tenantId, id);
    return success(data, 'Department retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.departmentService.update(tenantId, id, dto);
    return success(data, 'Department updated successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.departmentService.remove(tenantId, id);
    return success(data, 'Department removed successfully');
  }
}
