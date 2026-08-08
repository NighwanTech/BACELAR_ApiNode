import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProgramService } from './program.service';

@Controller()
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @MessagePattern({ cmd: 'create_program' })
  async create(@Payload() data: any) {
    try {
      return await this.programService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_programs' })
  async findAll(@Payload() data: { categoryId?: number }) {
    try {
      return await this.programService.findAll(data?.categoryId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_program' })
  async findOne(@Payload() data: { programId: number }) {
    try {
      return await this.programService.findOne(data.programId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_program' })
  async update(@Payload() data: any) {
    try {
      const { programId, ...updateData } = data;
      return await this.programService.update(programId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_program' })
  async softDelete(@Payload() data: { programId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.programService.softDelete(
        data.programId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_programs' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.programService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
