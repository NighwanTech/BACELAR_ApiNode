import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SemesterService } from './semester.service';

@Controller()
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @MessagePattern({ cmd: 'create_semester' })
  async create(@Payload() data: any) {
    try {
      return await this.semesterService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_semesters' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.semesterService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_semester' })
  async findOne(@Payload() data: { semId: number }) {
    try {
      return await this.semesterService.findOne(data.semId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_semester' })
  async update(@Payload() data: any) {
    try {
      const { semId, ...updateData } = data;
      return await this.semesterService.update(semId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_semester' })
  async softDelete(
    @Payload() data: { semId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.semesterService.softDelete(
        data.semId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
