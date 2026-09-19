import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BoardService } from './board.service';

@Controller()
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @MessagePattern({ cmd: 'create_board' })
  async create(@Payload() data: any) {
    try {
      return await this.boardService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_boards' })
  async findAll(@Payload() data?: { activeOnly?: boolean }) {
    try {
      return await this.boardService.findAll(data?.activeOnly);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_board' })
  async findOne(@Payload() data: { boardId: number }) {
    try {
      return await this.boardService.findOne(data.boardId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_board' })
  async update(@Payload() data: any) {
    try {
      const { boardId, ...updateData } = data;
      return await this.boardService.update(boardId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_board' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.boardService.updateStatus(
        data.boardId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_board' })
  async softDelete(@Payload() data: { boardId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.boardService.softDelete(
        data.boardId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_boards' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.boardService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
