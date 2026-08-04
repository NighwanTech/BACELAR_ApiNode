import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class ResultService {
  constructor(private readonly prisma: PrismaService) {}

  async record(tenantId: string, dto: any) {
    const total = (dto.internalMarks || 0) + (dto.externalMarks || 0);
    return this.prisma.result.create({
      data: {
        tenantId,
        examinationId: dto.examinationId,
        enrollmentId: dto.enrollmentId,
        studentId: dto.studentId,
        subjectId: dto.subjectId,
        internalMarks: dto.internalMarks,
        externalMarks: dto.externalMarks,
        totalMarks: total,
        grade: dto.grade,
        gradePoint: dto.gradePoint,
        creditEarned: dto.creditEarned,
        resultStatus: dto.resultStatus || 'PENDING',
        remarks: dto.remarks,
        metadata: dto.metadata,
      },
    });
  }

  async bulkRecord(tenantId: string, results: any[]) {
    const created = [];
    for (const result of results) {
      created.push(await this.record(tenantId, result));
    }
    return created;
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: Record<string, unknown> = { tenantId };
    if (query.studentId) where.studentId = query.studentId;
    if (query.examinationId) where.examinationId = query.examinationId;
    if (query.subjectId) where.subjectId = query.subjectId;
    if (query.resultStatus) where.resultStatus = query.resultStatus;

    const [items, total] = await Promise.all([
      this.prisma.result.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          examination: true,
          enrollment: { include: { student: { include: { user: { select: { firstName: true, lastName: true } } } } } },
        },
      }),
      this.prisma.result.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const result = await this.prisma.result.findFirst({
      where: { id, tenantId },
      include: { examination: true },
    });
    if (!result) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Result not found', 404);
    }
    return result;
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    const total = (dto.internalMarks || dto.externalMarks) ? (dto.internalMarks || 0) + (dto.externalMarks || 0) : undefined;
    return this.prisma.result.update({
      where: { id },
      data: { ...dto, ...(total !== undefined ? { totalMarks: total } : {}) },
    });
  }

  async publish(tenantId: string, examinationId: string, publishedById: string) {
    return this.prisma.result.updateMany({
      where: { tenantId, examinationId },
      data: { resultStatus: 'PUBLISHED', publishedAt: new Date(), publishedById },
    });
  }

  async getStudentMarksheet(tenantId: string, studentId: string) {
    const results = await this.prisma.result.findMany({
      where: { tenantId, studentId },
      include: { examination: true },
      orderBy: { createdAt: 'asc' },
    });
    return results;
  }
}
