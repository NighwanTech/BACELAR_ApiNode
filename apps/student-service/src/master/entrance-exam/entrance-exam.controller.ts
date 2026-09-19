import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EntranceExamService } from './entrance-exam.service';

@Controller()
export class EntranceExamController {
  constructor(private readonly service: EntranceExamService) {}

  @MessagePattern({ cmd: 'create_entrance_exam' })
  async create(@Payload() data: any) {
    try {
      return await this.service.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_entrance_exams' })
  async findAll(@Payload() data?: any) {
    try {
      return await this.service.findAll(data?.activeOnly, data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_entrance_exam' })
  async findOne(@Payload() data: { entranceExamId: number }) {
    try {
      return await this.service.findOne(data.entranceExamId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_entrance_exam' })
  async update(@Payload() data: any) {
    try {
      const { entranceExamId, ...updateData } = data;
      return await this.service.update(entranceExamId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_status_entrance_exam' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.service.updateStatus(data.entranceExamId, data.IsActive, data.UpdatedBy);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_entrance_exam' })
  async softDelete(@Payload() data: { entranceExamId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.service.softDelete(data.entranceExamId, data.DeletedBy, data.DeletedRemarks);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_entrance_exams' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.service.bulkSoftDelete(data.ids, data.DeletedBy, data.DeletedRemarks);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'generate_entrance_rolls' })
  async generateRolls(@Payload() data: any) {
    try {
      return await this.service.generateRolls(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'list_entrance_students' })
  async listStudents(@Payload() data: any) {
    try {
      return await this.service.listStudents(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'save_entrance_marks' })
  async saveMarks(@Payload() data: any) {
    try {
      return await this.service.saveMarks(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'get_entrance_admit_card' })
  async getAdmitCard(@Payload() data: { entranceRollnumber?: string; studentId?: number }) {
    try {
      return await this.service.getAdmitCard(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
