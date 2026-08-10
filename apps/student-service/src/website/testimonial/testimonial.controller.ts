import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TestimonialService } from './testimonial.service';

@Controller()
export class TestimonialController {
  constructor(private readonly testimonialService: TestimonialService) {}

  @MessagePattern({ cmd: 'create_testimonial' })
  async create(@Payload() data: any) {
    try {
      return await this.testimonialService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_testimonials' })
  async findAll() {
    try {
      return await this.testimonialService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_testimonial' })
  async findOne(@Payload() data: { testimonialId: number }) {
    try {
      return await this.testimonialService.findOne(data.testimonialId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_testimonial' })
  async update(@Payload() data: any) {
    try {
      const { testimonialId, ...updateData } = data;
      return await this.testimonialService.update(testimonialId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_testimonial' })
  async softDelete(@Payload() data: { testimonialId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.testimonialService.softDelete(
        data.testimonialId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
