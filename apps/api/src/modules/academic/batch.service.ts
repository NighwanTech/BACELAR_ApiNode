import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class BatchService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: any) {
    return this.prisma.batch.create({
      data: {
        tenantId,
        programId: dto.programId,
        semesterId: dto.semesterId,
        name: dto.name,
        academicYear: dto.academicYear,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.programId) where.programId = query.programId;
    if (query.academicYear) where.academicYear = query.academicYear;
    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' };
    }

    const [items, total] = await Promise.all([
      this.prisma.batch.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { program: true, semester: true },
      }),
      this.prisma.batch.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const batch = await this.prisma.batch.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { program: true, semester: true, students: true },
    });
    if (!batch) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Batch not found', 404);
    }
    return batch;
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.batch.update({ where: { id }, data: { ...dto } });
  }

  async remove(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.batch.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true };
  }
}
