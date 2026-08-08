import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AcademicSessionService } from './academic-session.service';

@Controller()
export class AcademicSessionController {
  constructor(private readonly sessionService: AcademicSessionService) {}

  @MessagePattern({ cmd: 'create_academic_session' })
  async create(@Payload() data: any) {
    try {
      return await this.sessionService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_academic_sessions' })
  async findAll() {
    try {
      return await this.sessionService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_academic_session' })
  async findOne(@Payload() data: { sessionId: number }) {
    try {
      return await this.sessionService.findOne(data.sessionId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_academic_session' })
  async update(@Payload() data: any) {
    try {
      const { sessionId, ...updateData } = data;
      return await this.sessionService.update(sessionId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_academic_session' })
  async softDelete(@Payload() data: { sessionId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.sessionService.softDelete(
        data.sessionId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_academic_sessions' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.sessionService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
