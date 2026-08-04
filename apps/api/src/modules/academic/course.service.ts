import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: any) {
    const existing = await this.prisma.course.findUnique({
      where: { tenantId_code: { tenantId, code: dto.code } },
    });
    if (existing) {
      throw new BusinessException(ErrorCodes.RESOURCE_ALREADY_EXISTS, `Course '${dto.code}' already exists`, 409);
    }
    return this.prisma.course.create({
      data: {
        tenantId,
        programId: dto.programId,
        semesterId: dto.semesterId,
        code: dto.code,
        name: dto.name,
        description: dto.description,
        credits: dto.credits,
        courseType: dto.courseType,
        lectureHours: dto.lectureHours,
        tutorialHours: dto.tutorialHours,
        practicalHours: dto.practicalHours,
        syllabus: dto.syllabus,
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
    if (query.programId) where.programId = query.programId;
    if (query.semesterId) where.semesterId = query.semesterId;
    if (query.courseType) where.courseType = query.courseType;

    const [items, total] = await Promise.all([
      this.prisma.course.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { program: true, semester: true },
      }),
      this.prisma.course.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const course = await this.prisma.course.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { program: true, semester: true, subjects: true },
    });
    if (!course) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Course not found', 404);
    }
    return course;
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.course.update({ where: { id }, data: { ...dto } });
  }

  async remove(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.course.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true };
  }
}
