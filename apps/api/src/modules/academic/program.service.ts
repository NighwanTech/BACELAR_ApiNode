import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class ProgramService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: any) {
    return this.prisma.program.create({
      data: {
        tenantId,
        institutionId: dto.institutionId,
        campusId: dto.campusId,
        departmentId: dto.departmentId,
        name: dto.name,
        code: dto.code,
        level: dto.level,
        durationYears: dto.durationYears,
        durationSemesters: dto.durationSemesters,
        degree: dto.degree,
        specialization: dto.specialization,
        eligibility: dto.eligibility,
        fees: dto.fees,
        intakeCapacity: dto.intakeCapacity,
        affiliation: dto.affiliation,
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
    if (query.level) where.level = query.level;
    if (query.institutionId) where.institutionId = query.institutionId;
    if (query.departmentId) where.departmentId = query.departmentId;

    const [items, total] = await Promise.all([
      this.prisma.program.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { department: true, institution: true, batches: true },
      }),
      this.prisma.program.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const program = await this.prisma.program.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { department: true, institution: true, courses: true, semesters: true, batches: true },
    });
    if (!program) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Program not found', 404);
    }
    return program;
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.program.update({ where: { id }, data: { ...dto } });
  }

  async remove(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.program.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true };
  }
}
