import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FacultySpecializationService } from './faculty-specialization.service';

@Controller()
export class FacultySpecializationController {
  constructor(private readonly facultySpecializationService: FacultySpecializationService) {}

  @MessagePattern({ cmd: 'create_faculty_specialization' })
  async create(@Payload() data: any) {
    try {
      return await this.facultySpecializationService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_faculty_specializations' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.facultySpecializationService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_faculty_specialization' })
  async findOne(@Payload() data: { facultySpecializationId: number }) {
    try {
      return await this.facultySpecializationService.findOne(data.facultySpecializationId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_faculty_specialization' })
  async update(@Payload() data: any) {
    try {
      const { facultySpecializationId, ...updateData } = data;
      return await this.facultySpecializationService.update(facultySpecializationId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_faculty_specialization' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.facultySpecializationService.updateStatus(
        data.facultySpecializationId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_faculty_specialization' })
  async softDelete(
    @Payload() data: { facultySpecializationId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.facultySpecializationService.softDelete(
        data.facultySpecializationId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_faculty_specializations' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.facultySpecializationService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
