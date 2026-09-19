import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProgramEligibilityService } from './program-eligibility.service';

@Controller()
export class ProgramEligibilityController {
  constructor(private readonly eligibilityService: ProgramEligibilityService) {}

  @MessagePattern({ cmd: 'create_program_eligibility' })
  async create(@Payload() data: any) {
    try {
      return await this.eligibilityService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_program_eligibilities' })
  async findAll(
    @Payload()
    data?: {
      programId?: number;
      ruleType?: string;
      category?: string;
      severity?: string;
    },
  ) {
    try {
      return await this.eligibilityService.findAll(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_program_eligibility' })
  async findOne(@Payload() data: { eligibilityId: number }) {
    try {
      return await this.eligibilityService.findOne(data.eligibilityId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_program_eligibility' })
  async update(@Payload() data: any) {
    try {
      const { eligibilityId, ...updateData } = data;
      return await this.eligibilityService.update(eligibilityId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  
  @MessagePattern({ cmd: 'update_status_program_eligibility' })
  async updateStatus(@Payload() data: any) {
    try {
      return await this.eligibilityService.updateStatus(
        data.eligibilityId,
        data.IsActive,
        data.UpdatedBy,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_program_eligibility' })
  async softDelete(
    @Payload()
    data: { eligibilityId: number; DeletedBy: string; DeletedRemarks?: string },
  ) {
    try {
      return await this.eligibilityService.softDelete(
        data.eligibilityId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'validate_program_eligibility' })
  async validate(@Payload() data: any) {
    try {
      return await this.eligibilityService.validate(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
