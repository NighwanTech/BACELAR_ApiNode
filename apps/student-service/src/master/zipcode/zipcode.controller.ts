import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ZipcodeService } from './zipcode.service';

@Controller()
export class ZipcodeController {
  constructor(private readonly zipcodeService: ZipcodeService) {}

  @MessagePattern({ cmd: 'create_zipcode' })
  async create(@Payload() data: any) {
    try {
      return await this.zipcodeService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_zipcodes' })
  async findAll(
    @Payload() data?: { stateId?: number; cityId?: number; zipCode?: string },
  ) {
    try {
      return await this.zipcodeService.findAll(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_zipcode' })
  async findOne(@Payload() data: { zipcodeId: number }) {
    try {
      return await this.zipcodeService.findOne(data.zipcodeId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_zipcode' })
  async update(@Payload() data: any) {
    try {
      const { zipcodeId, ...updateData } = data;
      return await this.zipcodeService.update(zipcodeId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_zipcode' })
  async softDelete(
    @Payload() data: { zipcodeId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.zipcodeService.softDelete(
        data.zipcodeId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
