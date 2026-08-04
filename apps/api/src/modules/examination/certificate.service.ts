import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';
import { generateNumericId } from '@universityos/common';

@Injectable()
export class CertificateService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: any) {
    const issueNumber = dto.issueNumber || `CERT${generateNumericId(10)}`;
    return this.prisma.certificate.create({
      data: {
        tenantId,
        userId: dto.userId,
        studentId: dto.studentId,
        type: dto.type,
        templateId: dto.templateId,
        issueNumber,
        data: dto.data,
        issuedAt: dto.issuedAt ? new Date(dto.issuedAt) : undefined,
        issuedById: dto.issuedById,
        status: dto.status || 'PENDING',
      },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.studentId) where.studentId = query.studentId;
    if (query.type) where.type = query.type;
    if (query.status) where.status = query.status;

    const [items, total] = await Promise.all([
      this.prisma.certificate.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          student: { include: { user: { select: { firstName: true, lastName: true } } } },
        },
      }),
      this.prisma.certificate.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const certificate = await this.prisma.certificate.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { student: true },
    });
    if (!certificate) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Certificate not found', 404);
    }
    return certificate;
  }

  async findByIssueNumber(tenantId: string, issueNumber: string) {
    return this.prisma.certificate.findFirst({
      where: { tenantId, issueNumber, deletedAt: null },
      include: { student: true },
    });
  }

  async verify(qrCode: string) {
    return this.prisma.certificate.findUnique({
      where: { issueNumber: qrCode },
      include: { student: true },
    });
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.certificate.update({ where: { id }, data: { ...dto } });
  }

  async issue(tenantId: string, id: string, issuedById: string) {
    await this.findById(tenantId, id);
    return this.prisma.certificate.update({
      where: { id },
      data: { status: 'ACTIVE', issuedAt: new Date(), issuedById },
    });
  }

  async revoke(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    return this.prisma.certificate.update({
      where: { id },
      data: { status: 'INACTIVE' },
    });
  }
}
