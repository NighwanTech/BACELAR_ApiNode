import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExaminationService } from './examination.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Examinations')
@Controller('examinations')
export class ExaminationController {
  constructor(private readonly examinationService: ExaminationService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.examinationService.create(tenantId, dto);
    return success(data, 'Examination created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('courseId') courseId?: string,
    @Query('semesterId') semesterId?: string,
    @Query('type') type?: string,
    @Query('search') search?: string,
  ) {
    const data = await this.examinationService.findAll(tenantId, {
      page,
      limit,
      courseId,
      semesterId,
      type,
      search,
    });
    return paginated(data, 'Examinations retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.examinationService.findById(tenantId, id);
    return success(data, 'Examination retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.examinationService.update(tenantId, id, dto);
    return success(data, 'Examination updated successfully');
  }

  @Post(':id/schedules')
  async addSchedule(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.examinationService.addSchedule(tenantId, id, dto);
    return success(data, 'Schedule added successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.examinationService.remove(tenantId, id);
    return success(data, 'Examination removed successfully');
  }
}
