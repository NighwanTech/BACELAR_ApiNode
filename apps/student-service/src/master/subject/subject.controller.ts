import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubjectService } from './subject.service';

@Controller()
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @MessagePattern({ cmd: 'create_subject' })
  async create(@Payload() data: any) {
    try {
      return await this.subjectService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_subjects' })
  async findAll(@Payload() data?: { classType?: string; stream?: string }) {
    try {
      return await this.subjectService.findAll(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_subject' })
  async findOne(@Payload() data: { subjectId: number }) {
    try {
      return await this.subjectService.findOne(data.subjectId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_subject' })
  async update(@Payload() data: any) {
    try {
      const { subjectId, ...updateData } = data;
      return await this.subjectService.update(subjectId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_subject' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.subjectService.updateStatus(
        data.subjectId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_subject' })
  async softDelete(@Payload() data: { subjectId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.subjectService.softDelete(
        data.subjectId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
