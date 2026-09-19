import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CampusQuickLinkService } from './campus-quick-link.service';

@Controller()
export class CampusQuickLinkController {
  constructor(private readonly campusQuickLinkService: CampusQuickLinkService) {}

  @MessagePattern({ cmd: 'create_campus_quick_link' })
  async create(@Payload() data: any) {
    try {
      return await this.campusQuickLinkService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_campus_quick_links' })
  async findAll() {
    try {
      return await this.campusQuickLinkService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_campus_quick_link' })
  async findOne(@Payload() data: { quickLinkId: number }) {
    try {
      return await this.campusQuickLinkService.findOne(data.quickLinkId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_campus_quick_link' })
  async update(@Payload() data: any) {
    try {
      const { quickLinkId, ...updateData } = data;
      return await this.campusQuickLinkService.update(quickLinkId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_campus_quick_link' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.campusQuickLinkService.updateStatus(
        data.quickLinkId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_campus_quick_link' })
  async softDelete(
    @Payload() data: { quickLinkId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.campusQuickLinkService.softDelete(
        data.quickLinkId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
