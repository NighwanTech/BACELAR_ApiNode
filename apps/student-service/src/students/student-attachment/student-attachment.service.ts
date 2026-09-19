import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class StudentAttachmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.studentAttachment.create({
      data: {
        studentId: Number(data.studentId),
        documentType: data.documentType,
        fileUrl: data.fileUrl,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
      include: {
        student: true,
      },
    });
  }

  async findAll() {
    return this.prisma.studentAttachment.findMany({
      where: { IsDeleted: false },
      include: {
        student: true,
      },
      orderBy: { CreatedOn: 'desc' },
    });
  }

  async findOne(attachmentId: number) {
    const attachment = await this.prisma.studentAttachment.findFirst({
      where: { attachmentId, IsDeleted: false },
      include: {
        student: true,
      },
    });
    if (!attachment) {
      throw new NotFoundException(`Attachment record with ID ${attachmentId} not found`);
    }
    return attachment;
  }

  async findByStudent(studentId: number) {
    return this.prisma.studentAttachment.findMany({
      where: { studentId, IsDeleted: false },
      include: {
        student: true,
      },
      orderBy: { CreatedOn: 'desc' },
    });
  }

  async update(attachmentId: number, data: any) {
    await this.findOne(attachmentId);

    return this.prisma.studentAttachment.update({
      where: { attachmentId },
      data: {
        documentType: data.documentType,
        fileUrl: data.fileUrl,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
      include: {
        student: true,
      },
    });
  }

  async softDelete(attachmentId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(attachmentId);

    return this.prisma.studentAttachment.update({
      where: { attachmentId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const result = await this.prisma.studentAttachment.updateMany({
      where: {
        attachmentId: { in: ids },
        IsDeleted: false,
      },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });

    return {
      message: `Successfully soft-deleted ${result.count} attachment record(s)`,
      count: result.count,
    };
  }
}
