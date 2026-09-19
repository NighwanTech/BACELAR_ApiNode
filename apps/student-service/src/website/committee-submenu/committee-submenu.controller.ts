import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommitteeSubmenuService } from './committee-submenu.service';

@Controller()
export class CommitteeSubmenuController {
  constructor(private readonly committeeSubmenuService: CommitteeSubmenuService) {}

  @MessagePattern({ cmd: 'create_committee_submenu' })
  async create(@Payload() data: any) {
    try {
      return await this.committeeSubmenuService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_committee_submenus' })
  async findAll(@Payload() data: { committeeId?: number }) {
    try {
      return await this.committeeSubmenuService.findAll(data?.committeeId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_committee_submenus_by_committee' })
  async findByCommittee(@Payload() data: { committeeId: number }) {
    try {
      return await this.committeeSubmenuService.findAll(data.committeeId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_committee_submenu' })
  async findOne(@Payload() data: { committeeSubmenuId: number }) {
    try {
      return await this.committeeSubmenuService.findOne(data.committeeSubmenuId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_committee_submenu' })
  async update(@Payload() data: any) {
    try {
      const { committeeSubmenuId, ...updateData } = data;
      return await this.committeeSubmenuService.update(committeeSubmenuId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_committee_submenu' })
  async softDelete(
    @Payload() data: { committeeSubmenuId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.committeeSubmenuService.softDelete(
        data.committeeSubmenuId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
