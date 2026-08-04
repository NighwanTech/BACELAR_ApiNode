import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HostelService } from './hostel.service';
import { Tenant } from '../../common/decorators/tenant.decorator';
import { success } from '@universityos/common';

@ApiTags('Hostel')
@Controller('hostels')
export class HostelController {
  constructor(private readonly hostelService: HostelService) {}

  @Post()
  async createHostel(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.hostelService.createHostel(tenantId, dto);
    return success(data, 'Hostel created successfully');
  }

  @Get()
  async findAllHostels(@Tenant('id') tenantId: string, @Query('type') type?: string) {
    const data = await this.hostelService.findAllHostels(tenantId, { type });
    return success(data, 'Hostels retrieved');
  }

  @Get(':id')
  async findById(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.hostelService.findHostelById(tenantId, id);
    return success(data, 'Hostel retrieved');
  }

  @Post(':id/rooms')
  async createRoom(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.hostelService.createRoom(tenantId, id, dto);
    return success(data, 'Room created successfully');
  }

  @Patch('rooms/:id')
  async updateRoom(@Tenant('id') tenantId: string, @Param('id') id: string, @Body() dto: any) {
    const data = await this.hostelService.updateRoom(tenantId, id, dto);
    return success(data, 'Room updated successfully');
  }

  @Post('allocations')
  async allocateRoom(@Tenant('id') tenantId: string, @Body() dto: any) {
    const data = await this.hostelService.allocateRoom(tenantId, dto);
    return success(data, 'Room allocated successfully');
  }

  @Get('allocations/list')
  async findAllAllocations(
    @Tenant('id') tenantId: string,
    @Query('status') status?: string,
    @Query('roomId') roomId?: string,
  ) {
    const data = await this.hostelService.findAllAllocations(tenantId, { status, roomId });
    return success(data, 'Allocations retrieved');
  }

  @Post('allocations/:id/vacate')
  async vacateRoom(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.hostelService.vacateRoom(tenantId, id);
    return success(data, 'Room vacated successfully');
  }

  @Delete(':id')
  async remove(@Tenant('id') tenantId: string, @Param('id') id: string) {
    const data = await this.hostelService.removeHostel(tenantId, id);
    return success(data, 'Hostel removed successfully');
  }
}
