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
  async findAll(@Payload() data?: { programId?: number }) {
    try {
      return await this.programSubjectService.findAll(data?.programId);
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
