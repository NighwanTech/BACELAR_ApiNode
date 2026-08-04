import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class ExaminationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: any) {
    return this.prisma.examination.create({
      data: {
        tenantId,
        courseId: dto.courseId,
        semesterId: dto.semesterId,
        name: dto.name,
        code: dto.code,
        type: dto.type,
        schedule: dto.schedule,
        maxMarks: dto.maxMarks,
        passMarks: dto.passMarks,
        weightage: dto.weightage,
      },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.courseId) where.courseId = query.courseId;
    if (query.semesterId) where.semesterId = query.semesterId;
    if (query.type) where.type = query.type;
    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' };
    }

    const [items, total] = await Promise.all([
      this.prisma.examination.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { course: true, semester: true, schedules: true },
      }),
      this.prisma.examination.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const examination = await this.prisma.examination.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { course: true, semester: true, schedules: true, results: true },
    });
    if (!examination) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Examination not found', 404);
    }
    return examination;
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.examination.update({ where: { id }, data: { ...dto } });
  }

  async addSchedule(tenantId: string, examinationId: string, dto: any) {
    await this.findById(tenantId, examinationId);
    return this.prisma.examSchedule.create({
      data: {
        examinationId,
        subjectId: dto.subjectId,
        date: new Date(dto.date),
        startTime: dto.startTime,
        endTime: dto.endTime,
        room: dto.room,
        invigilatorId: dto.invigilatorId,
        students: dto.students,
      },
    });
  }

  async remove(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.examination.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true };
  }
}
