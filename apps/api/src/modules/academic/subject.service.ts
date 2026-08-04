import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: any) {
    const existing = await this.prisma.subject.findUnique({
      where: { tenantId_code: { tenantId, code: dto.code } },
    });
    if (existing) {
      throw new BusinessException(ErrorCodes.RESOURCE_ALREADY_EXISTS, `Subject '${dto.code}' already exists`, 409);
    }
    return this.prisma.subject.create({
      data: {
        tenantId,
        courseId: dto.courseId,
        semesterId: dto.semesterId,
        departmentId: dto.departmentId,
        code: dto.code,
        name: dto.name,
        credits: dto.credits,
        subjectType: dto.subjectType,
        internalMarks: dto.internalMarks,
        externalMarks: dto.externalMarks,
        passMarks: dto.passMarks,
        totalMarks: dto.totalMarks,
      },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { code: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.courseId) where.courseId = query.courseId;
    if (query.semesterId) where.semesterId = query.semesterId;
    if (query.departmentId) where.departmentId = query.departmentId;

    const [items, total] = await Promise.all([
      this.prisma.subject.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { course: true, semester: true, department: true },
      }),
      this.prisma.subject.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const subject = await this.prisma.subject.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { course: true, semester: true, department: true },
    });
    if (!subject) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Subject not found', 404);
    }
    return subject;
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.subject.update({ where: { id }, data: { ...dto } });
  }

  async remove(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.subject.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true };
  }
}
