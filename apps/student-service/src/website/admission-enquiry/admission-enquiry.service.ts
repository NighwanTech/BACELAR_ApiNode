import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class AdmissionEnquiryService {
  constructor(private readonly prisma: PrismaService) {}

  private generateEnquiryNumber(): string {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `ENQ-${today}-${randomDigits}`;
  }

  async create(data: any) {
    const enquiryNumber = data.enquiryNumber || this.generateEnquiryNumber();

    return (this.prisma as any).admissionEnquiry.create({
      data: {
        enquiryNumber,
        name: data.name,
        contactNo: data.contactNo,
        whatsappNo: data.whatsappNo || null,
        email: data.email || null,
        address: data.address || null,
        courseId: data.courseId ? Number(data.courseId) : null,
        courseName: data.courseName || null,
        sessionId: data.sessionId ? Number(data.sessionId) : null,
        sessionName: data.sessionName || null,
        message: data.message || null,
        status: data.status || 'PENDING',
        source: data.source || 'WEBSITE',
        adminNotes: data.adminNotes || null,
        followUpDate: data.followUpDate ? new Date(data.followUpDate) : null,
        assignedTo: data.assignedTo || null,
        isRead: data.isRead ?? false,
        CreatedBy: data.CreatedBy || 'System',
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return (this.prisma as any).admissionEnquiry.findMany({
      where: { IsDeleted: false },
      orderBy: { admissionEnquiryId: 'desc' },
    });
  }

  async findOne(admissionEnquiryId: number) {
    const item = await (this.prisma as any).admissionEnquiry.findFirst({
      where: { admissionEnquiryId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Admission enquiry entry with ID ${admissionEnquiryId} not found`);
    }
    return item;
  }

  async update(admissionEnquiryId: number, data: any) {
    await this.findOne(admissionEnquiryId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy || 'Admin',
    };

    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.contactNo !== undefined) updatePayload.contactNo = data.contactNo;
    if (data.whatsappNo !== undefined) updatePayload.whatsappNo = data.whatsappNo;
    if (data.email !== undefined) updatePayload.email = data.email;
    if (data.address !== undefined) updatePayload.address = data.address;
    if (data.courseId !== undefined) updatePayload.courseId = data.courseId ? Number(data.courseId) : null;
    if (data.courseName !== undefined) updatePayload.courseName = data.courseName;
    if (data.sessionId !== undefined) updatePayload.sessionId = data.sessionId ? Number(data.sessionId) : null;
    if (data.sessionName !== undefined) updatePayload.sessionName = data.sessionName;
    if (data.message !== undefined) updatePayload.message = data.message;
    if (data.status !== undefined) updatePayload.status = data.status;
    if (data.source !== undefined) updatePayload.source = data.source;
    if (data.adminNotes !== undefined) updatePayload.adminNotes = data.adminNotes;
    if (data.followUpDate !== undefined) updatePayload.followUpDate = data.followUpDate ? new Date(data.followUpDate) : null;
    if (data.assignedTo !== undefined) updatePayload.assignedTo = data.assignedTo;
    if (data.isRead !== undefined) updatePayload.isRead = data.isRead;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return (this.prisma as any).admissionEnquiry.update({
      where: { admissionEnquiryId },
      data: updatePayload,
    });
  }

  async softDelete(admissionEnquiryId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(admissionEnquiryId);

    return (this.prisma as any).admissionEnquiry.update({
      where: { admissionEnquiryId },
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
