import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SemesterService } from './semester.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Semesters')
@Controller('semesters')
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.semesterService.create(tenantId, dto);
    return success(data, 'Semester created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('programId') programId?: string,
    @Query('isCurrent') isCurrent?: string,
  ) {
    const data = await this.semesterService.findAll(tenantId, { page, limit, programId, isCurrent });
    return paginated(data, 'Semesters retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.semesterService.findById(tenantId, id);
    return success(data, 'Semester retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.semesterService.update(tenantId, id, dto);
    return success(data, 'Semester updated successfully');
  }

  @Patch(':id/set-current')
  async setCurrent(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.semesterService.setCurrent(tenantId, id);
    return success(data, 'Semester set as current');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.semesterService.remove(tenantId, id);
    return success(data, 'Semester removed successfully');
  }
}
