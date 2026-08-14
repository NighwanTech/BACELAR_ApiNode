import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AcademicSessionService } from './academic-session.service';

@Controller()
export class AcademicSessionController {
  constructor(private readonly academicSessionService: AcademicSessionService) {}

  @MessagePattern({ cmd: 'create_academic_session' })
  async create(@Payload() data: any) {
    try {
      return await this.academicSessionService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_academic_sessions' })
  async findAll(@Payload() data?: { collegeId?: number }) {
    try {
      return await this.academicSessionService.findAll(data?.collegeId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_academic_session' })
  async findOne(@Payload() data: { academicSessionId: number }) {
    try {
      return await this.academicSessionService.findOne(data.academicSessionId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_academic_session' })
  async update(@Payload() data: any) {
    try {
      const { academicSessionId, ...updateData } = data;
      return await this.academicSessionService.update(
        academicSessionId,
        updateData,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_academic_session' })
  async softDelete(
    @Payload()
    data: {
      academicSessionId: number;
      DeletedBy: string;
      DeletedRemarks?: string;
    },
  ) {
    try {
      return await this.academicSessionService.softDelete(
        data.academicSessionId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
