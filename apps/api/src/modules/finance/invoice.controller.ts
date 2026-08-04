import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InvoiceService } from './invoice.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  async create(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.invoiceService.create(tenantId, dto);
    return success(data, 'Invoice created successfully');
  }

  @Get()
  async findAll(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('studentId') studentId?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    const data = await this.invoiceService.findAll(tenantId, {
      page,
      limit,
      studentId,
      status,
      search,
    });
    return paginated(data, 'Invoices retrieved');
  }

  @Get('outstanding')
  async getOutstanding(
    @Tenant('id') tenantId: string,
    @Query('studentId') studentId?: string,
  ) {
    const data = await this.invoiceService.getOutstanding(tenantId, studentId);
    return success(data, 'Outstanding balance retrieved');
  }

  @Get('student/:studentId')
  async getStudentInvoices(@Tenant('id') tenantId: string, @Param('studentId') studentId: string) {
    const data = await this.invoiceService.getStudentInvoices(tenantId, studentId);
    return success(data, 'Student invoices retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.invoiceService.findById(tenantId, id);
    return success(data, 'Invoice retrieved');
  }

  @Patch(':id')
  async update(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.invoiceService.update(tenantId, id, dto);
    return success(data, 'Invoice updated successfully');
  }
}
