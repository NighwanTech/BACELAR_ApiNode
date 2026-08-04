import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BatchService } from './batch.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Batches')
@Controller('batches')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.batchService.create(tenantId, dto);
    return success(data, 'Batch created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('programId') programId?: string,
    @Query('academicYear') academicYear?: string,
    @Query('search') search?: string,
  ) {
    const data = await this.batchService.findAll(tenantId, {
      page,
      limit,
      programId,
      academicYear,
      search,
    });
    return paginated(data, 'Batches retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.batchService.findById(tenantId, id);
    return success(data, 'Batch retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.batchService.update(tenantId, id, dto);
    return success(data, 'Batch updated successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.batchService.remove(tenantId, id);
    return success(data, 'Batch removed successfully');
  }
}
