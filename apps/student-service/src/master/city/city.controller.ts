import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CityService } from './city.service';

@Controller()
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @MessagePattern({ cmd: 'create_city' })
  async create(@Payload() data: any) {
    try {
      return await this.cityService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_cities' })
  async findAll(@Payload() data?: { stateId?: number; activeOnly?: boolean }) {
    try {
      return await this.cityService.findAll(data?.stateId, data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_city' })
  async findOne(@Payload() data: { cityId: number }) {
    try {
      return await this.cityService.findOne(data.cityId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_city' })
  async update(@Payload() data: any) {
    try {
      const { cityId, ...updateData } = data;
      return await this.cityService.update(cityId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_city' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.cityService.updateStatus(
        data.cityId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_city' })
  async softDelete(@Payload() data: { cityId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.cityService.softDelete(
        data.cityId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
