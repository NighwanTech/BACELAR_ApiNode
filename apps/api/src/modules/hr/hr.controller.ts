import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HrService } from './hr.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { success, paginated } from '@universityos/common';

@ApiTags('HR')
@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Post('employees')
  async createEmployee(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.hrService.createEmployee(tenantId, dto);
    return success(data, 'Employee created successfully');
  }

  @Get('employees')
  async findAllEmployees(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('departmentId') departmentId?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    const data = await this.hrService.findAllEmployees(tenantId, { page, limit, departmentId, status, search });
    return paginated(data, 'Employees retrieved');
  }

  @Get('employees/:id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.hrService.findById(tenantId, id);
    return success(data, 'Employee retrieved');
  }

  @Patch('employees/:id')
  async updateEmployee(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.hrService.updateEmployee(tenantId, id, dto);
    return success(data, 'Employee updated successfully');
  }

  @Delete('employees/:id')
  async removeEmployee(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.hrService.removeEmployee(tenantId, id);
    return success(data, 'Employee removed successfully');
  }

  @Post('leaves')
  async applyLeave(
    @Tenant('id') tenantId: string,
    @Body('employeeId') employeeId: string,
    @Body() dto: any,
  ) {
    const data = await this.hrService.applyLeave(tenantId, employeeId, dto);
    return success(data, 'Leave applied successfully');
  }

  @Get('leaves')
  async findAllLeaves(
    @Tenant('id') tenantId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('employeeId') employeeId?: string,
    @Query('status') status?: string,
  ) {
    const data = await this.hrService.findAllLeaves(tenantId, { page, limit, employeeId, status });
    return paginated(data, 'Leaves retrieved');
  }

  @Post('leaves/:id/approve')
  async approveLeave(@Tenant('id') tenantId: string, @Param('id') id: string, @CurrentUser('id') userId: string) {
    const data = await this.hrService.approveLeave(tenantId, id, userId);
    return success(data, 'Leave approved successfully');
  }

  @Post('leaves/:id/reject')
  async rejectLeave(@Tenant('id') tenantId: string, @Param('id') id: string, @CurrentUser('id') userId: string) {
    const data = await this.hrService.rejectLeave(tenantId, id, userId);
    return success(data, 'Leave rejected successfully');
  }
}
