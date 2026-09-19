import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentRollNumberService } from './student-roll-number.service';

@Controller()
export class StudentRollNumberController {
  constructor(private readonly rollNumberService: StudentRollNumberService) {}

  @MessagePattern({ cmd: 'list_student_roll_numbers' })
  async list(@Payload() data: any) {
    try {
      return await this.rollNumberService.list(data || {});
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'generate_student_roll_numbers' })
  async generate(@Payload() data: any) {
    try {
      return await this.rollNumberService.generate(data || {});
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_student_roll_number' })
  async remove(@Payload() data: any) {
    try {
      return await this.rollNumberService.remove(data || {});
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_student_roll_numbers' })
  async bulkRemove(@Payload() data: any) {
    try {
      return await this.rollNumberService.bulkRemove(data || {});
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
