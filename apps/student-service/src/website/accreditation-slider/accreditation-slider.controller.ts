import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AccreditationSliderService } from './accreditation-slider.service';

@Controller()
export class AccreditationSliderController {
  constructor(private readonly accreditationSliderService: AccreditationSliderService) {}

  @MessagePattern({ cmd: 'create_accreditation_slider' })
  async create(@Payload() data: any) {
    try {
      return await this.accreditationSliderService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_accreditation_sliders' })
  async findAll() {
    try {
      return await this.accreditationSliderService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_accreditation_slider' })
  async findOne(@Payload() data: { accreditationSliderId: number }) {
    try {
      return await this.accreditationSliderService.findOne(data.accreditationSliderId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_accreditation_slider' })
  async update(@Payload() data: any) {
    try {
      const { accreditationSliderId, ...updateData } = data;
      return await this.accreditationSliderService.update(accreditationSliderId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_accreditation_slider' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.accreditationSliderService.updateStatus(
        data.accreditationSliderId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_accreditation_slider' })
  async softDelete(
    @Payload() data: { accreditationSliderId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.accreditationSliderService.softDelete(
        data.accreditationSliderId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
