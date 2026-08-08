import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class StudentPaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.studentPayment.create({
      data: {
        studentId: Number(data.studentId),
        feeType: data.feeType,
        amountPaid: Number(data.amountPaid),
        paymentStatus: data.paymentStatus || 'PENDING',
        razorpayOrderId: data.razorpayOrderId || null,
        razorpayPaymentId: data.razorpayPaymentId || null,
        razorpaySignature: data.razorpaySignature || null,
        gatewayResponse: data.gatewayResponse || null,
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
    return this.prisma.studentPayment.findMany({
      where: { IsDeleted: false },
      include: {
        student: true,
      },
      orderBy: { CreatedOn: 'desc' },
    });
  }

  async findOne(paymentId: number) {
    const payment = await this.prisma.studentPayment.findFirst({
      where: { paymentId, IsDeleted: false },
      include: {
        student: true,
      },
    });
    if (!payment) {
      throw new NotFoundException(`Payment record with ID ${paymentId} not found`);
    }
    return payment;
  }

  async findByStudent(studentId: number) {
    return this.prisma.studentPayment.findMany({
      where: { studentId, IsDeleted: false },
      include: {
        student: true,
      },
      orderBy: { CreatedOn: 'desc' },
    });
  }

  async findByOrderId(razorpayOrderId: string) {
    const payment = await this.prisma.studentPayment.findFirst({
      where: { razorpayOrderId, IsDeleted: false },
      include: {
        student: true,
      },
    });
    if (!payment) {
      throw new NotFoundException(`Payment with Razorpay Order ID ${razorpayOrderId} not found`);
    }
    return payment;
  }

  async update(paymentId: number, data: any) {
    await this.findOne(paymentId);

    return this.prisma.studentPayment.update({
      where: { paymentId },
      data: {
        paymentStatus: data.paymentStatus,
        razorpayPaymentId: data.razorpayPaymentId,
        razorpaySignature: data.razorpaySignature,
        gatewayResponse: data.gatewayResponse,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
      include: {
        student: true,
      },
    });
  }

  async softDelete(paymentId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(paymentId);

    return this.prisma.studentPayment.update({
      where: { paymentId },
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
    const result = await this.prisma.studentPayment.updateMany({
      where: {
        paymentId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} payment record(s)`,
      count: result.count,
    };
  }
}
