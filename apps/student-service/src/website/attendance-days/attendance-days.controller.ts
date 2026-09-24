import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AttendanceDaysService } from './attendance-days.service';

@Controller()
export class AttendanceDaysController {
  constructor(private readonly attendanceDaysService: AttendanceDaysService) {}

  @MessagePattern({ cmd: 'create_attendance_days' })
  async create(@Payload() data: any) {
    try {
      return await this.attendanceDaysService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_attendance_days' })
  async findAll(@Payload() data?: {
    activeOnly?: boolean;
    studentId?: number;
    sessionId?: number;
    programCategoryId?: number;
    programId?: number;
    yearId?: number;
    semId?: number;
    monthId?: number;
    academicYearId?: number;
  }) {
    try {
      return await this.attendanceDaysService.findAll(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_attendance_days' })
  async findOne(@Payload() data: { attendanceDaysId: number }) {
    try {
      return await this.attendanceDaysService.findOne(data.attendanceDaysId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_attendance_days' })
  async update(@Payload() data: any) {
    try {
      const { attendanceDaysId, ...updateData } = data;
      return await this.attendanceDaysService.update(attendanceDaysId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_attendance_days' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.attendanceDaysService.updateStatus(
        data.attendanceDaysId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_attendance_days' })
  async softDelete(
    @Payload() data: { attendanceDaysId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.attendanceDaysService.softDelete(
        data.attendanceDaysId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_attendance_days' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.attendanceDaysService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
