import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AdmissionSessionService } from './admission-session.service';

@Controller()
export class AdmissionSessionController {
  constructor(private readonly sessionService: AdmissionSessionService) {}

  @MessagePattern({ cmd: 'create_admission_session' })
  async create(@Payload() data: any) {
    try {
      return await this.sessionService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_admission_sessions' })
  async findAll() {
    try {
      return await this.sessionService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_admission_session' })
  async findOne(@Payload() data: { admissionSessionId: number }) {
    try {
      return await this.sessionService.findOne(data.admissionSessionId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_admission_session' })
  async update(@Payload() data: any) {
    try {
      const { admissionSessionId, ...updateData } = data;
      return await this.sessionService.update(admissionSessionId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_admission_session' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.sessionService.updateStatus(
        data.admissionSessionId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_admission_session' })
  async softDelete(
    @Payload()
    data: {
      admissionSessionId: number;
      DeletedBy: string;
      DeletedRemarks?: string;
    },
  ) {
    try {
      return await this.sessionService.softDelete(
        data.admissionSessionId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_admission_sessions' })
  async bulkSoftDelete(
    @Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string },
  ) {
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
