import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { YearService } from './year.service';

@Controller()
export class YearController {
  constructor(private readonly yearService: YearService) {}

  @MessagePattern({ cmd: 'create_year' })
  async create(@Payload() data: any) {
    try {
      return await this.yearService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_years' })
  async findAll() {
    try {
      return await this.yearService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_year' })
  async findOne(@Payload() data: { yearId: number }) {
    try {
      return await this.yearService.findOne(data.yearId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_year' })
  async update(@Payload() data: any) {
    try {
      const { yearId, ...updateData } = data;
      return await this.yearService.update(yearId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_year' })
  async softDelete(
    @Payload() data: { yearId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.yearService.softDelete(
        data.yearId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
