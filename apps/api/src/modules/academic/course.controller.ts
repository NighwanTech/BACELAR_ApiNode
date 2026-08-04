import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourseService } from './course.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.courseService.create(tenantId, dto);
    return success(data, 'Course created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('programId') programId?: string,
    @Query('semesterId') semesterId?: string,
    @Query('courseType') courseType?: string,
  ) {
    const data = await this.courseService.findAll(tenantId, {
      page,
      limit,
      search,
      programId,
      semesterId,
      courseType,
    });
    return paginated(data, 'Courses retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.courseService.findById(tenantId, id);
    return success(data, 'Course retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.courseService.update(tenantId, id, dto);
    return success(data, 'Course updated successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.courseService.remove(tenantId, id);
    return success(data, 'Course removed successfully');
  }
}
