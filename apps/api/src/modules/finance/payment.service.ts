import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { RabbitService } from '../../core/rabbit/rabbit.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbit: RabbitService,
  ) {}

  async create(tenantId: string, dto: any) {
    const payment = await this.prisma.payment.create({
      data: {
        tenantId,
        invoiceId: dto.invoiceId,
        studentId: dto.studentId,
        transactionId: dto.transactionId,
        amount: dto.amount,
        paymentMode: dto.paymentMode,
        status: dto.status || 'PENDING',
        referenceNo: dto.referenceNo,
        gateway: dto.gateway,
        metadata: dto.metadata,
        paidAt: dto.status === 'SUCCESS' ? new Date() : undefined,
        receivedById: dto.receivedById,
      },
    });

    if (dto.invoiceId && dto.status === 'SUCCESS') {
      await this.updateInvoiceStatus(tenantId, dto.invoiceId);
    }

    await this.rabbit.publish('notification.created', {
      tenantId,
      studentId: dto.studentId,
      type: 'email',
      channel: 'email',
      subject: 'Payment received',
      body: `Payment of ${dto.amount} received successfully`,
    });

    return payment;
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId };
    if (query.studentId) where.studentId = query.studentId;
    if (query.invoiceId) where.invoiceId = query.invoiceId;
    if (query.status) where.status = query.status;
    if (query.paymentMode) where.paymentMode = query.paymentMode;

    const [items, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { invoice: true },
      }),
      this.prisma.payment.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async updateStatus(tenantId: string, id: string, status: string, transactionId?: string) {
    const payment = await this.prisma.payment.update({
      where: { id },
      data: {
        status,
        transactionId,
        paidAt: status === 'SUCCESS' ? new Date() : undefined,
      },
    });
    if (status === 'SUCCESS' && payment.invoiceId) {
      await this.updateInvoiceStatus(tenantId, payment.invoiceId);
    }
    return payment;
  }

  async getDailyCollections(tenantId: string, date: string) {
    const start = new Date(`${date}T00:00:00`);
    const end = new Date(`${date}T23:59:59`);
    const payments = await this.prisma.payment.findMany({
      where: { tenantId, status: 'SUCCESS', paidAt: { gte: start, lte: end } },
    });
    const total = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
    return { count: payments.length, total };
  }

  private async updateInvoiceStatus(tenantId: string, invoiceId: string) {
    const invoice = await this.prisma.invoice.findUnique({ where: { id: invoiceId } });
    if (!invoice) return;
    const payments = await this.prisma.payment.findMany({
      where: { invoiceId, status: 'SUCCESS' },
    });
    const paid = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
    const total = Number(invoice.total || 0);
    const status = paid >= total ? 'PAID' : paid > 0 ? 'PARTIALLY_PAID' : 'PENDING';
    await this.prisma.invoice.update({
      where: { id: invoiceId },
      data: { status },
    });
  }
}
