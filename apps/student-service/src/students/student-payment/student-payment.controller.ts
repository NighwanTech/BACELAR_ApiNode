import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentPaymentService } from './student-payment.service';

@Controller()
export class StudentPaymentController {
  constructor(private readonly paymentService: StudentPaymentService) {}

  @MessagePattern({ cmd: 'create_student_payment' })
  async create(@Payload() data: any) {
    try {
      return await this.paymentService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_student_payments' })
  async findAll() {
    try {
      return await this.paymentService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_student_payment' })
  async findOne(@Payload() data: { paymentId: number }) {
    try {
      return await this.paymentService.findOne(data.paymentId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_student_payments_by_student' })
  async findByStudent(@Payload() data: { studentId: number }) {
    try {
      return await this.paymentService.findByStudent(data.studentId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_student_payment_by_order_id' })
  async findByOrderId(@Payload() data: { razorpayOrderId: string }) {
    try {
      return await this.paymentService.findByOrderId(data.razorpayOrderId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_student_payment' })
  async update(@Payload() data: any) {
    try {
      const { paymentId, ...updateData } = data;
      return await this.paymentService.update(paymentId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_student_payment' })
  async softDelete(@Payload() data: { paymentId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.paymentService.softDelete(
        data.paymentId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_student_payments' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.paymentService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
