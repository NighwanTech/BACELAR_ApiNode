import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubjectService } from './subject.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Subjects')
@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.subjectService.create(tenantId, dto);
    return success(data, 'Subject created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('courseId') courseId?: string,
    @Query('semesterId') semesterId?: string,
    @Query('departmentId') departmentId?: string,
  ) {
    const data = await this.subjectService.findAll(tenantId, {
      page,
      limit,
      search,
      courseId,
      semesterId,
      departmentId,
    });
    return paginated(data, 'Subjects retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.subjectService.findById(tenantId, id);
    return success(data, 'Subject retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.subjectService.update(tenantId, id, dto);
    return success(data, 'Subject updated successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.subjectService.remove(tenantId, id);
    return success(data, 'Subject removed successfully');
  }
}
