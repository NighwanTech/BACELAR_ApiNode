import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProgramSubjectService } from './program-subject.service';

@Controller()
export class ProgramSubjectController {
  constructor(private readonly programSubjectService: ProgramSubjectService) {}

  @MessagePattern({ cmd: 'create_program_subject' })
  async create(@Payload() data: any) {
    try {
      return await this.programSubjectService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_program_subjects' })
  async findAll(@Payload() data?: { programId?: number; activeOnly?: boolean }) {
    try {
      return await this.programSubjectService.findAll(data?.programId, data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_program_subject' })
  async findOne(@Payload() data: { programSubjectId: number }) {
    try {
      return await this.programSubjectService.findOne(data.programSubjectId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_program_subject' })
  async update(@Payload() data: any) {
    try {
      const { programSubjectId, ...updateData } = data;
      return await this.programSubjectService.update(
        programSubjectId,
        updateData,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_program_subject' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.programSubjectService.updateStatus(
        data.programSubjectId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_program_subject' })
  async softDelete(
    @Payload()
    data: {
      programSubjectId: number;
      DeletedBy: string;
      DeletedRemarks?: string;
    },
  ) {
    try {
      return await this.programSubjectService.softDelete(
        data.programSubjectId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
