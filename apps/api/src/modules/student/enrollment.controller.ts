import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  async enroll(
    @Tenant('id') tenantId: string,
    @Body('studentId') studentId: string,
    @Body('courseId') courseId: string,
  ) {
    const data = await this.enrollmentService.enroll(tenantId, studentId, courseId);
    return success(data, 'Student enrolled successfully');
  }

  @Post('bulk')
  async bulkEnroll(
    @Tenant('id') tenantId: string,
    @Body('courseId') courseId: string,
    @Body('studentIds') studentIds: string[],
  ) {
    const data = await this.enrollmentService.bulkEnroll(tenantId, courseId, studentIds);
    return success(data, 'Bulk enrollment completed');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('studentId') studentId?: string,
    @Query('courseId') courseId?: string,
    @Query('status') status?: string,
  ) {
    const data = await this.enrollmentService.findAll(tenantId, {
      page,
      limit,
      studentId,
      courseId,
      status,
    });
    return paginated(data, 'Enrollments retrieved');
  }

  @Patch(':id/status')
  async updateStatus(
    @Tenant('id') tenantId: string,
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    const data = await this.enrollmentService.updateStatus(tenantId, id, status);
    return success(data, 'Enrollment status updated successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.enrollmentService.remove(tenantId, id);
    return success(data, 'Enrollment removed successfully');
  }
}
