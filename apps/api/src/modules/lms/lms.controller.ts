import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LmsService } from './lms.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('LMS')
@Controller('lms')
export class LmsController {
  constructor(private readonly lmsService: LmsService) {}

  @Post('courses')
  async createCourse(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.lmsService.createCourse(tenantId, dto);
    return success(data, 'LMS course created successfully');
  }

  @Get('courses')
  async findAllCourses(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    const data = await this.lmsService.findAllCourses(tenantId, { page, limit, search });
    return paginated(data, 'LMS courses retrieved');
  }

  @Get('courses/:id')
  async findCourseById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.lmsService.findCourseById(tenantId, id);
    return success(data, 'LMS course retrieved');
  }

  @Patch('courses/:id')
  async updateCourse(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.lmsService.updateCourse(tenantId, id, dto);
    return success(data, 'LMS course updated successfully');
  }

  @Delete('courses/:id')
  async removeCourse(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.lmsService.removeCourse(tenantId, id);
    return success(data, 'LMS course removed successfully');
  }

  @Post('courses/:id/modules')
  async addModule(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.lmsService.addModule(tenantId, id, dto);
    return success(data, 'Module added successfully');
  }

  @Post('modules/:id/lessons')
  async addLesson(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.lmsService.addLesson(tenantId, id, dto);
    return success(data, 'Lesson added successfully');
  }

  @Post('enrollments')
  async enroll(
    @Tenant('id') tenantId: string,
    @CurrentUser('id') userId: string,
    @Body('lmsCourseId') lmsCourseId: string,
  ) {
    const data = await this.lmsService.enroll(tenantId, lmsCourseId, userId);
    return success(data, 'Enrolled successfully');
  }

  @Get('enrollments')
  async getEnrollments(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('userId') userId?: string,
    @Query('lmsCourseId') lmsCourseId?: string,
  ) {
    const data = await this.lmsService.getEnrollments(tenantId, { page, limit, userId, lmsCourseId });
    return paginated(data, 'Enrollments retrieved');
  }

  @Post('progress')
  async updateProgress(
    @Tenant('id') tenantId: string,
    @CurrentUser('id') userId: string,
    @Body('enrollmentId') enrollmentId: string,
    @Body('lessonId') lessonId: string,
    @Body('progressPercent') progressPercent: number,
  ) {
    const data = await this.lmsService.updateProgress(tenantId, enrollmentId, lessonId, userId, progressPercent);
    return success(data, 'Progress updated successfully');
  }
}
