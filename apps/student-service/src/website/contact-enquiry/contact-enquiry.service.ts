import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class ContactEnquiryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return (this.prisma as any).contactEnquiry.create({
      data: {
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email || null,
        course: data.course || null,
        message: data.message || null,
        status: data.status || 'PENDING',
        isRead: data.isRead ?? false,
        CreatedBy: data.CreatedBy || 'System',
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return (this.prisma as any).contactEnquiry.findMany({
      where: { IsDeleted: false },
      orderBy: { contactEnquiryId: 'desc' },
    });
  }

  async findOne(contactEnquiryId: number) {
    const item = await (this.prisma as any).contactEnquiry.findFirst({
      where: { contactEnquiryId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Contact enquiry entry with ID ${contactEnquiryId} not found`);
    }
    return item;
  }

  async update(contactEnquiryId: number, data: any) {
    await this.findOne(contactEnquiryId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy || 'Admin',
    };

    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.phoneNumber !== undefined) updatePayload.phoneNumber = data.phoneNumber;
    if (data.email !== undefined) updatePayload.email = data.email;
    if (data.course !== undefined) updatePayload.course = data.course;
    if (data.message !== undefined) updatePayload.message = data.message;
    if (data.status !== undefined) updatePayload.status = data.status;
    if (data.isRead !== undefined) updatePayload.isRead = data.isRead;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return (this.prisma as any).contactEnquiry.update({
      where: { contactEnquiryId },
      data: updatePayload,
    });
  }

  
  async updateStatus(contactEnquiryId: number, IsActive: boolean, UpdatedBy: string) {
    return this.update(contactEnquiryId, { IsActive, UpdatedBy });
  }

  async softDelete(contactEnquiryId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(contactEnquiryId);

    return (this.prisma as any).contactEnquiry.update({
      where: { contactEnquiryId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }
}
