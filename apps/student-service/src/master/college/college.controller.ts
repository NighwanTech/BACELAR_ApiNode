import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CollegeService } from './college.service';

@Controller()
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  @MessagePattern({ cmd: 'create_college' })
  async create(@Payload() data: any) {
    try {
      return await this.collegeService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_colleges' })
  async findAll() {
    try {
      return await this.collegeService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_college' })
  async findOne(@Payload() data: { collegeId: number }) {
    try {
      return await this.collegeService.findOne(data.collegeId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_college' })
  async update(@Payload() data: any) {
    try {
      const { collegeId, ...updateData } = data;
      return await this.collegeService.update(collegeId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_college' })
  async softDelete(@Payload() data: { collegeId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.collegeService.softDelete(
        data.collegeId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
