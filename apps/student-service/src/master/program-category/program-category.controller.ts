import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProgramCategoryService } from './program-category.service';

@Controller()
export class ProgramCategoryController {
  constructor(private readonly programCategoryService: ProgramCategoryService) {}

  @MessagePattern({ cmd: 'create_program_category' })
  async create(@Payload() data: any) {
    try {
      return await this.programCategoryService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_program_categories' })
  async findAll() {
    try {
      return await this.programCategoryService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_program_category' })
  async findOne(@Payload() data: { programCategoryId: number }) {
    try {
      return await this.programCategoryService.findOne(data.programCategoryId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_program_category' })
  async update(@Payload() data: any) {
    try {
      const { programCategoryId, ...updateData } = data;
      return await this.programCategoryService.update(programCategoryId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_program_category' })
  async softDelete(@Payload() data: { programCategoryId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.programCategoryService.softDelete(
        data.programCategoryId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
