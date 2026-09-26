import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FacultyQualificationService } from './faculty-qualification.service';

@Controller()
export class FacultyQualificationController {
  constructor(private readonly facultyQualificationService: FacultyQualificationService) {}

  @MessagePattern({ cmd: 'create_faculty_qualification' })
  async create(@Payload() data: any) {
    try {
      return await this.facultyQualificationService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_faculty_qualifications' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.facultyQualificationService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_faculty_qualification' })
  async findOne(@Payload() data: { facultyQualificationId: number }) {
    try {
      return await this.facultyQualificationService.findOne(data.facultyQualificationId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_faculty_qualification' })
  async update(@Payload() data: any) {
    try {
      const { facultyQualificationId, ...updateData } = data;
      return await this.facultyQualificationService.update(facultyQualificationId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_faculty_qualification' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.facultyQualificationService.updateStatus(
        data.facultyQualificationId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_faculty_qualification' })
  async softDelete(
    @Payload() data: { facultyQualificationId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.facultyQualificationService.softDelete(
        data.facultyQualificationId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_faculty_qualifications' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.facultyQualificationService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
