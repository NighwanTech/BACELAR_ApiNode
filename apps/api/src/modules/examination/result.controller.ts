import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResultService } from './result.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Results')
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  async record(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.resultService.record(tenantId, dto);
    return success(data, 'Result recorded successfully');
  }

  @Post('bulk')
  async bulkRecord(@Tenant('id') tenantId: string, @Body('results') results: any[]) {
    const data = await this.resultService.bulkRecord(tenantId, results);
    return success(data, 'Results recorded successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('studentId') studentId?: string,
    @Query('examinationId') examinationId?: string,
    @Query('subjectId') subjectId?: string,
    @Query('resultStatus') resultStatus?: string,
  ) {
    const data = await this.resultService.findAll(tenantId, {
      page,
      limit,
      studentId,
      examinationId,
      subjectId,
      resultStatus,
    });
    return paginated(data, 'Results retrieved');
  }

  @Get('student/:studentId/marksheet')
  async getMarksheet(@Tenant('id') tenantId: string, @Param('studentId') studentId: string) {
    const data = await this.resultService.getStudentMarksheet(tenantId, studentId);
    return success(data, 'Marksheet retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.resultService.findById(tenantId, id);
    return success(data, 'Result retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.resultService.update(tenantId, id, dto);
    return success(data, 'Result updated successfully');
  }

  @Post('publish/:examinationId')
  async publish(
    @Tenant('id') tenantId: string,
    @Param('examinationId') examinationId: string,
    @CurrentUser('id') userId: string,
  ) {
    const data = await this.resultService.publish(tenantId, examinationId, userId);
    return success(data, 'Results published successfully');
  }
}
