import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class LmsService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(tenantId: string, dto: any) {
    return this.prisma.lmsCourse.create({
      data: {
        tenantId,
        courseId: dto.courseId,
        title: dto.title,
        description: dto.description,
        coverImage: dto.coverImage,
      },
    });
  }

  async findAllCourses(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.search) {
      where.title = { contains: query.search, mode: 'insensitive' };
    }
    const [items, total] = await Promise.all([
      this.prisma.lmsCourse.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { modules: true },
      }),
      this.prisma.lmsCourse.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findCourseById(tenantId: string, id: string) {
    const course = await this.prisma.lmsCourse.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { modules: { include: { lessons: true } } },
    });
    if (!course) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'LMS course not found', 404);
    }
    return course;
  }

  async addModule(tenantId: string, courseId: string, dto: any) {
    await this.findCourseById(tenantId, courseId);
    return this.prisma.lmsModule.create({
      data: {
        tenantId,
        courseId,
        title: dto.title,
        description: dto.description,
        order: dto.order || 0,
      },
    });
  }

  async addLesson(tenantId: string, moduleId: string, dto: any) {
    return this.prisma.lmsLesson.create({
      data: {
        tenantId,
        moduleId,
        title: dto.title,
        content: dto.content,
        contentType: dto.contentType || 'document',
        contentUrl: dto.contentUrl,
        duration: dto.duration,
        order: dto.order || 0,
        isPublished: dto.isPublished ?? true,
      },
    });
  }

  async enroll(tenantId: string, lmsCourseId: string, userId: string) {
    const existing = await this.prisma.lmsEnrollment.findUnique({
      where: { lmsCourseId_userId: { lmsCourseId, userId } },
    });
    if (existing) {
      throw new BusinessException(ErrorCodes.RESOURCE_ALREADY_EXISTS, 'Already enrolled in this course', 409);
    }
    return this.prisma.lmsEnrollment.create({
      data: { tenantId, lmsCourseId, userId, status: 'ACTIVE' },
    });
  }

  async updateProgress(tenantId: string, enrollmentId: string, lessonId: string, userId: string, progressPercent: number) {
    const existing = await this.prisma.lmsProgress.findUnique({
      where: { enrollmentId_lessonId: { enrollmentId, lessonId } },
    });
    const status = progressPercent >= 100 ? 'completed' : progressPercent > 0 ? 'in_progress' : 'not_started';
    if (existing) {
      await this.prisma.lmsProgress.update({
        where: { enrollmentId_lessonId: { enrollmentId, lessonId } },
        data: { progressPercent, status, completedAt: progressPercent >= 100 ? new Date() : undefined },
      });
    } else {
      await this.prisma.lmsProgress.create({
        data: {
          tenantId,
          enrollmentId,
          lessonId,
          userId,
          progressPercent,
          status,
          completedAt: progressPercent >= 100 ? new Date() : undefined,
        },
      });
    }
    // Update overall enrollment progress
    const lessons = await this.prisma.lmsLesson.count({ where: { module: { course: { enrollments: { some: { id: enrollmentId } } } } } });
    if (lessons > 0) {
      const progress = await this.prisma.lmsProgress.aggregate({
        where: { enrollmentId },
        _avg: { progressPercent: true },
      });
      const avgPercent = progress._avg.progressPercent || 0;
      await this.prisma.lmsEnrollment.update({
        where: { id: enrollmentId },
        data: {
          progress: avgPercent,
          completedAt: avgPercent >= 100 ? new Date() : undefined,
        },
      });
    }
    return { success: true };
  }

  async getEnrollments(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId };
    if (query.userId) where.userId = query.userId;
    if (query.lmsCourseId) where.lmsCourseId = query.lmsCourseId;
    const [items, total] = await Promise.all([
      this.prisma.lmsEnrollment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { enrolledAt: 'desc' },
        include: { lmsCourse: true },
      }),
      this.prisma.lmsEnrollment.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async updateCourse(tenantId: string, id: string, dto: any) {
    await this.findCourseById(tenantId, id);
    return this.prisma.lmsCourse.update({ where: { id }, data: { ...dto } });
  }

  async removeCourse(tenantId: string, id: string) {
    await this.findCourseById(tenantId, id);
    await this.prisma.lmsCourse.update({ where: { id }, data: { deletedAt: new Date() } });
    return { success: true };
  }
}
