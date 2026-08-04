import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommitteeService } from './committee.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Committees')
@Controller('committees')
export class CommitteeController {
  constructor(private readonly committeeService: CommitteeService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.committeeService.create(tenantId, dto);
    return success(data, 'Committee created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('type') type?: string,
    @Query('search') search?: string,
  ) {
    const data = await this.committeeService.findAll(tenantId, { page, limit, type, search });
    return paginated(data, 'Committees retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.committeeService.findById(tenantId, id);
    return success(data, 'Committee retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.committeeService.update(tenantId, id, dto);
    return success(data, 'Committee updated successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.committeeService.remove(tenantId, id);
    return success(data, 'Committee removed successfully');
  }

  @Post(':id/meetings')
  async scheduleMeeting(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.committeeService.scheduleMeeting(tenantId, id, dto);
    return success(data, 'Meeting scheduled successfully');
  }

  @Get('meetings/list')
  async getAllMeetings(
    @Tenant('id') tenantId: string,
    @Query('committeeId') committeeId?: string,
    @Query('status') status?: string,
  ) {
    const data = await this.committeeService.getAllMeetings(tenantId, { committeeId, status });
    return success(data, 'Meetings retrieved');
  }

  @Patch('meetings/:id')
  async updateMeeting(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.committeeService.updateMeeting(tenantId, id, dto);
    return success(data, 'Meeting updated successfully');
  }
}
