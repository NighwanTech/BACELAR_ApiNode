import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FacultyService } from './faculty.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Faculty')
@Controller('faculties')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.facultyService.create(tenantId, dto);
    return success(data, 'Faculty created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
    @Query('departmentId') departmentId?: string,
    @Query('status') status?: string,
    @Query('employmentType') employmentType?: string,
  ) {
    const data = await this.facultyService.findAll(tenantId, {
      page,
      limit,
      search,
      departmentId,
      status,
      employmentType,
    });
    return paginated(data, 'Faculty retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.facultyService.findById(tenantId, id);
    return success(data, 'Faculty retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.facultyService.update(tenantId, id, dto);
    return success(data, 'Faculty updated successfully');
  }

  @Post(':id/courses')
  async assignCourse(
    @Tenant('id') tenantId: string,
    @Param('id') id: string,
    @Body('courseId') courseId: string,
    @Body('role') role?: string,
  ) {
    const data = await this.facultyService.assignCourse(tenantId, id, courseId, role);
    return success(data, 'Course assigned successfully');
  }

  @Delete(':id/courses/:courseId')
  async removeCourse(
    @Tenant('id') tenantId: string,
    @Param('id') id: string,
    @Param('courseId') courseId: string,
  ) {
    const data = await this.facultyService.removeCourse(tenantId, id, courseId);
    return success(data, 'Course removed successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.facultyService.remove(tenantId, id);
    return success(data, 'Faculty removed successfully');
  }
}
