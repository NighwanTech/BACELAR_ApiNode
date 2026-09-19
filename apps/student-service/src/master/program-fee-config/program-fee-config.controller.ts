import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProgramFeeConfigService } from './program-fee-config.service';

@Controller()
export class ProgramFeeConfigController {
  constructor(private readonly feeConfigService: ProgramFeeConfigService) {}

  @MessagePattern({ cmd: 'create_program_fee_config' })
  async create(@Payload() data: any) {
    try {
      return await this.feeConfigService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_program_fee_configs' })
  async findAll() {
    try {
      return await this.feeConfigService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_program_fee_config' })
  async findOne(@Payload() data: { feeConfigId: number }) {
    try {
      return await this.feeConfigService.findOne(data.feeConfigId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_program_fee_config_by_program_and_session' })
  async findByProgramAndSession(@Payload() data: { programId: number; admissionSessionId: number }) {
    try {
      return await this.feeConfigService.findByProgramAndSession(data.programId, data.admissionSessionId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_program_fee_config' })
  async update(@Payload() data: any) {
    try {
      const { feeConfigId, ...updateData } = data;
      return await this.feeConfigService.update(feeConfigId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_program_fee_config' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.feeConfigService.updateStatus(
        data.feeConfigId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_program_fee_config' })
  async softDelete(@Payload() data: { feeConfigId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.feeConfigService.softDelete(
        data.feeConfigId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_program_fee_configs' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.feeConfigService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
