import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class EnrollmentService {
  constructor(private readonly prisma: PrismaService) {}

  async enroll(tenantId: string, studentId: string, courseId: string) {
    const existing = await this.prisma.enrollment.findUnique({
      where: { studentId_courseId: { studentId, courseId } },
    });
    if (existing) {
      throw new BusinessException(ErrorCodes.RESOURCE_ALREADY_EXISTS, 'Student already enrolled in this course', 409);
    }
    return this.prisma.enrollment.create({
      data: {
        tenantId,
        studentId,
        courseId,
        status: 'ACTIVE',
      },
    });
  }

  async bulkEnroll(tenantId: string, courseId: string, studentIds: string[]) {
    const existing = await this.prisma.enrollment.findMany({
      where: { courseId, studentId: { in: studentIds } },
      select: { studentId: true },
    });
    const existingIds = new Set(existing.map((e) => e.studentId));
    const toAdd = studentIds.filter((id) => !existingIds.has(id));
    if (toAdd.length) {
      await this.prisma.enrollment.createMany({
        data: toAdd.map((studentId) => ({ tenantId, studentId, courseId })),
      });
    }
    return { enrolled: toAdd.length, skipped: studentIds.length - toAdd.length };
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId };
    if (query.studentId) where.studentId = query.studentId;
    if (query.courseId) where.courseId = query.courseId;
    if (query.status) where.status = query.status;

    const [items, total] = await Promise.all([
      this.prisma.enrollment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { enrolledAt: 'desc' },
        include: {
          student: { include: { user: { select: { firstName: true, lastName: true, email: true } } } },
          course: true,
        },
      }),
      this.prisma.enrollment.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async updateStatus(tenantId: string, id: string, status: string) {
    return this.prisma.enrollment.update({
      where: { id },
      data: { status: status as any, completedAt: status === 'COMPLETED' ? new Date() : undefined },
    });
  }

  async remove(tenantId: string, id: string) {
    await this.prisma.enrollment.delete({ where: { id } });
    return { success: true };
  }
}
