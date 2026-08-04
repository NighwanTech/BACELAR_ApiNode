import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class SemesterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: any) {
    return this.prisma.semester.create({
      data: {
        tenantId,
        programId: dto.programId,
        name: dto.name,
        code: dto.code,
        number: dto.number,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        isCurrent: dto.isCurrent || false,
      },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.programId) where.programId = query.programId;
    if (query.isCurrent) where.isCurrent = query.isCurrent === 'true';

    const [items, total] = await Promise.all([
      this.prisma.semester.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ number: 'asc' }],
        include: { program: true },
      }),
      this.prisma.semester.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const semester = await this.prisma.semester.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { program: true, courses: true, subjects: true },
    });
    if (!semester) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Semester not found', 404);
    }
    return semester;
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.semester.update({ where: { id }, data: { ...dto } });
  }

  async setCurrent(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.semester.updateMany({
      where: { tenantId, isCurrent: true },
      data: { isCurrent: false },
    });
    return this.prisma.semester.update({ where: { id }, data: { isCurrent: true } });
  }

  async remove(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.semester.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true };
  }
}
