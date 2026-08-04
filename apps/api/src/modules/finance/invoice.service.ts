import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';
import { generateNumericId } from '@universityos/common';

@Injectable()
export class InvoiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: any) {
    const invoiceNumber = dto.invoiceNumber || `INV${generateNumericId(10)}`;
    const existing = await this.prisma.invoice.findUnique({ where: { invoiceNumber } });
    if (existing) {
      throw new BusinessException(ErrorCodes.RESOURCE_ALREADY_EXISTS, 'Invoice number already exists', 409);
    }
    return this.prisma.invoice.create({
      data: {
        tenantId,
        studentId: dto.studentId,
        invoiceNumber,
        invoiceType: dto.invoiceType,
        items: dto.items,
        subtotal: dto.subtotal,
        discounts: dto.discounts || 0,
        total: dto.total,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        status: dto.status || 'PENDING',
      },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.studentId) where.studentId = query.studentId;
    if (query.status) where.status = query.status;
    if (query.search) {
      where.invoiceNumber = { contains: query.search, mode: 'insensitive' };
    }

    const [items, total] = await Promise.all([
      this.prisma.invoice.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { payments: true },
      }),
      this.prisma.invoice.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { payments: true },
    });
    if (!invoice) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Invoice not found', 404);
    }
    return invoice;
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.invoice.update({ where: { id }, data: { ...dto } });
  }

  async getStudentInvoices(tenantId: string, studentId: string) {
    return this.prisma.invoice.findMany({
      where: { tenantId, studentId, deletedAt: null },
      include: { payments: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOutstanding(tenantId: string, studentId?: string) {
    const where: any = { tenantId, status: { in: ['PENDING', 'PARTIALLY_PAID', 'OVERDUE'] } };
    if (studentId) where.studentId = studentId;
    const invoices = await this.prisma.invoice.findMany({
      where,
      include: { payments: true },
    });
    let total = 0;
    for (const inv of invoices) {
      const paid = inv.payments
        .filter((p) => p.status === 'SUCCESS')
        .reduce((sum, p) => sum + Number(p.amount || 0), 0);
      total += Number(inv.total || 0) - paid;
    }
    return { count: invoices.length, totalOutstanding: total };
  }
}
