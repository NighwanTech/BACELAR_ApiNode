import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.paymentService.create(tenantId, dto);
    return success(data, 'Payment recorded successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('studentId') studentId?: string,
    @Query('invoiceId') invoiceId?: string,
    @Query('status') status?: string,
    @Query('paymentMode') paymentMode?: string,
  ) {
    const data = await this.paymentService.findAll(tenantId, {
      page,
      limit,
      studentId,
      invoiceId,
      status,
      paymentMode,
    });
    return paginated(data, 'Payments retrieved');
  }

  @Get('collections/daily')
  async getDailyCollections(@Tenant('id') tenantId: string, @Query('date') date: string) {
    const data = await this.paymentService.getDailyCollections(tenantId, date);
    return success(data, 'Daily collections retrieved');
  }

  @Patch(':id/status')
  async updateStatus(
    @Tenant('id') tenantId: string,
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('transactionId') transactionId?: string,
  ) {
    const data = await this.paymentService.updateStatus(tenantId, id, status, transactionId);
    return success(data, 'Payment status updated successfully');
  }
}
