import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NoticeBoardService } from './notice-board.service';

@Controller()
export class NoticeBoardController {
  constructor(private readonly noticeBoardService: NoticeBoardService) {}

  @MessagePattern({ cmd: 'create_notice_board' })
  async create(@Payload() data: any) {
    try {
      return await this.noticeBoardService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_notice_boards' })
  async findAll() {
    try {
      return await this.noticeBoardService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_notice_board' })
  async findOne(@Payload() data: { noticeBoardId: number }) {
    try {
      return await this.noticeBoardService.findOne(data.noticeBoardId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_notice_board' })
  async update(@Payload() data: any) {
    try {
      const { noticeBoardId, ...updateData } = data;
      return await this.noticeBoardService.update(noticeBoardId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_notice_board' })
  async softDelete(
    @Payload() data: { noticeBoardId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.noticeBoardService.softDelete(
        data.noticeBoardId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
