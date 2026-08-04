import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FeeService } from './fee.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success } from '@universityos/common';

@ApiTags('Fees')
@Controller('fees')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Post('heads')
  async createHead(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.feeService.createHead(tenantId, dto);
    return success(data, 'Fee head created successfully');
  }

  @Get('heads')
  async findAllHeads(
    @Tenant('id') tenantId: string,
    @Query('category') category?: string,
  ) {
    const data = await this.feeService.findAllHeads(tenantId, { category });
    return success(data, 'Fee heads retrieved');
  }

  @Patch('heads/:id')
  async updateHead(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.feeService.updateHead(tenantId, id, dto);
    return success(data, 'Fee head updated successfully');
  }

  @Delete('heads/:id')
  async removeHead(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.feeService.removeHead(tenantId, id);
    return success(data, 'Fee head removed successfully');
  }

  @Post('structures')
  async createStructure(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.feeService.createStructure(tenantId, dto);
    return success(data, 'Fee structure created successfully');
  }

  @Get('structures')
  async findAllStructures(
    @Tenant('id') tenantId: string,
    @Query('programId') programId?: string,
  ) {
    const data = await this.feeService.findAllStructures(tenantId, { programId });
    return success(data, 'Fee structures retrieved');
  }
}
