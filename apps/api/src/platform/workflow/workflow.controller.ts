import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkflowService } from './workflow.service';
import { CreateWorkflowDto } from './dto/create-workflow.dto';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Workflows')
@Controller('workflows')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: CreateWorkflowDto) {
    const data = await this.workflowService.create(tenantId, dto);
    return success(data, 'Workflow created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('module') module?: string,
    @Query('entityType') entityType?: string,
  ) {
    const data = await this.workflowService.findAll(tenantId, { page, limit, module, entityType });
    return paginated(data, 'Workflows retrieved');
  }

  @Get('instances')
  async getInstances(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('entityType') entityType?: string,
    @Query('entityId') entityId?: string,
    @Query('status') status?: string,
  ) {
    const data = await this.workflowService.getInstances(tenantId, {
      page,
      limit,
      entityType,
      entityId,
      status,
    });
    return paginated(data, 'Workflow instances retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.workflowService.findById(tenantId, id);
    return success(data, 'Workflow retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: Partial<CreateWorkflowDto>) {
    const data = await this.workflowService.update(tenantId, id, dto);
    return success(data, 'Workflow updated successfully');
  }

  @Post('start')
  async start(
    @Tenant('id') tenantId: string,
    @CurrentUser('id') userId: string,
    @Body('workflowCode') workflowCode: string,
    @Body('entityType') entityType: string,
    @Body('entityId') entityId: string,
  ) {
    const data = await this.workflowService.start(tenantId, workflowCode, entityType, entityId, userId);
    return success(data, 'Workflow started successfully');
  }

  @Post('instances/:instanceId/transition')
  async transition(
    @Tenant('id') tenantId: string,
    @Param('instanceId') instanceId: string,
    @CurrentUser('id') userId: string,
    @Body('action') action: string,
    @Body('comment') comment?: string,
  ) {
    const data = await this.workflowService.transition(tenantId, instanceId, action, userId, comment);
    return success(data, 'Workflow transitioned successfully');
  }

  @Delete(':id')
  async delete(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.workflowService.delete(tenantId, id);
    return success(data, 'Workflow deleted successfully');
  }
}
