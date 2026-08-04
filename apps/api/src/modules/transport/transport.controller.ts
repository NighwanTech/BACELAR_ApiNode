import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransportService } from './transport.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success } from '@universityos/common';

@ApiTags('Transport')
@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Post('routes')
  async createRoute(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.transportService.createRoute(tenantId, dto);
    return success(data, 'Route created successfully');
  }

  @Get('routes')
  async findAllRoutes(@Tenant('id') tenantId: string) {
    const data = await this.transportService.findAllRoutes(tenantId, {});
    return success(data, 'Routes retrieved');
  }

  @Delete('routes/:id')
  async removeRoute(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.transportService.removeRoute(tenantId, id);
    return success(data, 'Route removed successfully');
  }

  @Post('vehicles')
  async addVehicle(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.transportService.addVehicle(tenantId, dto);
    return success(data, 'Vehicle added successfully');
  }

  @Get('vehicles')
  async findAllVehicles(@Tenant('id') tenantId: string) {
    const data = await this.transportService.findAllVehicles(tenantId, {});
    return success(data, 'Vehicles retrieved');
  }

  @Post('assignments')
  async assignStudent(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.transportService.assignStudent(tenantId, dto);
    return success(data, 'Student assigned successfully');
  }

  @Get('assignments')
  async findAllAssignments(
    @Tenant('id') tenantId: string,
    @Query('studentId') studentId?: string,
    @Query('routeId') routeId?: string,
  ) {
    const data = await this.transportService.findAllAssignments(tenantId, { studentId, routeId });
    return success(data, 'Assignments retrieved');
  }

  @Post('assignments/:id/unassign')
  async unassignStudent(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.transportService.unassignStudent(tenantId, id);
    return success(data, 'Student unassigned successfully');
  }
}
