import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StudentAttachmentService } from './student-attachment.service';

@Controller()
export class StudentAttachmentController {
  constructor(private readonly attachmentService: StudentAttachmentService) {}

  @MessagePattern({ cmd: 'create_student_attachment' })
  async create(@Payload() data: any) {
    try {
      return await this.attachmentService.create(data);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_all_student_attachments' })
  async findAll() {
    try {
      return await this.attachmentService.findAll();
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_one_student_attachment' })
  async findOne(@Payload() data: { attachmentId: number }) {
    try {
      return await this.attachmentService.findOne(data.attachmentId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'find_student_attachments_by_student' })
  async findByStudent(@Payload() data: { studentId: number }) {
    try {
      return await this.attachmentService.findByStudent(data.studentId);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'update_student_attachment' })
  async update(@Payload() data: any) {
    try {
      const { attachmentId, ...updateData } = data;
      return await this.attachmentService.update(attachmentId, updateData);
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'delete_student_attachment' })
  async softDelete(@Payload() data: { attachmentId: number; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.attachmentService.softDelete(
        data.attachmentId,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }

  @MessagePattern({ cmd: 'bulk_delete_student_attachments' })
  async bulkSoftDelete(@Payload() data: { ids: number[]; DeletedBy: string; DeletedRemarks?: string }) {
    try {
      return await this.attachmentService.bulkSoftDelete(
        data.ids,
        data.DeletedBy,
        data.DeletedRemarks,
      );
    } catch (error: any) {
      return { status: 'error', message: error.message || 'Unknown error' };
    }
  }
}
