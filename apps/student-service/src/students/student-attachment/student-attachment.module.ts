import { Module } from '@nestjs/common';
import { StudentAttachmentController } from './student-attachment.controller';
import { StudentAttachmentService } from './student-attachment.service';

@Module({
  controllers: [StudentAttachmentController],
  providers: [StudentAttachmentService],
})
export class StudentAttachmentModule {}
