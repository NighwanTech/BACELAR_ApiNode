import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaperDetailService } from './paper-detail.service';

@Controller()
export class PaperDetailController {
  constructor(private readonly paperDetailService: PaperDetailService) {}

  @MessagePattern({ cmd: 'create_paper_detail' })
  async create(@Payload() data: any) {
    try {
      return await this.paperDetailService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_paper_details' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.paperDetailService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_paper_detail' })
  async findOne(@Payload() data: { paperId: number }) {
    try {
      return await this.paperDetailService.findOne(data.paperId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_paper_detail' })
  async update(@Payload() data: any) {
    try {
      const { paperId, ...updateData } = data;
      return await this.paperDetailService.update(paperId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_paper_detail' })
  async softDelete(
    @Payload() data: { paperId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.paperDetailService.softDelete(
        data.paperId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
