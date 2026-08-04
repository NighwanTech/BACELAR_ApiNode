import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProgramService } from './program.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Programs')
@Controller('programs')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.programService.create(tenantId, dto);
    return success(data, 'Program created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('level') level?: string,
    @Query('institutionId') institutionId?: string,
    @Query('departmentId') departmentId?: string,
  ) {
    const data = await this.programService.findAll(tenantId, {
      page,
      limit,
      search,
      level,
      institutionId,
      departmentId,
    });
    return paginated(data, 'Programs retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.programService.findById(tenantId, id);
    return success(data, 'Program retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.programService.update(tenantId, id, dto);
    return success(data, 'Program updated successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.programService.remove(tenantId, id);
    return success(data, 'Program removed successfully');
  }
}
