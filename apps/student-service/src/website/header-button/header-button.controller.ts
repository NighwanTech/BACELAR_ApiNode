import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HeaderButtonService } from './header-button.service';

@Controller()
export class HeaderButtonController {
  constructor(private readonly headerButtonService: HeaderButtonService) {}

  @MessagePattern({ cmd: 'create_header_button' })
  async create(@Payload() data: any) {
    try {
      return await this.headerButtonService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_header_buttons' })
  async findAll() {
    try {
      return await this.headerButtonService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_header_button' })
  async findOne(@Payload() data: { headerButtonId: number }) {
    try {
      return await this.headerButtonService.findOne(data.headerButtonId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_header_button' })
  async update(@Payload() data: any) {
    try {
      const { headerButtonId, ...updateData } = data;
      return await this.headerButtonService.update(headerButtonId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_header_button' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.headerButtonService.updateStatus(
        data.headerButtonId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_header_button' })
  async softDelete(
    @Payload() data: { headerButtonId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.headerButtonService.softDelete(
        data.headerButtonId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
