import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AcademicYearService } from './academic-year.service';

@Controller()
export class AcademicYearController {
  constructor(private readonly academicYearService: AcademicYearService) {}

  @MessagePattern({ cmd: 'create_academic_year' })
  async create(@Payload() data: any) {
    try {
      return await this.academicYearService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_academic_years' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.academicYearService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_academic_year' })
  async findOne(@Payload() data: { academicYearId: number }) {
    try {
      return await this.academicYearService.findOne(data.academicYearId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_academic_year' })
  async update(@Payload() data: any) {
    try {
      const { academicYearId, ...updateData } = data;
      return await this.academicYearService.update(academicYearId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_academic_year' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.academicYearService.updateStatus(
        data.academicYearId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_academic_year' })
  async softDelete(
    @Payload() data: { academicYearId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.academicYearService.softDelete(
        data.academicYearId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_academic_years' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.academicYearService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
