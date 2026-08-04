import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: any) {
    return this.prisma.department.create({
      data: {
        tenantId,
        institutionId: dto.institutionId,
        campusId: dto.campusId,
        name: dto.name,
        code: dto.code,
        headOfDepartmentId: dto.headOfDepartmentId,
        description: dto.description,
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
    if (query.institutionId) where.institutionId = query.institutionId;
    if (query.campusId) where.campusId = query.campusId;

    const [items, total] = await Promise.all([
      this.prisma.department.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { institution: true, campus: true, programs: true },
      }),
      this.prisma.department.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const department = await this.prisma.department.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { institution: true, campus: true, programs: true, subjects: true },
    });
    if (!department) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Department not found', 404);
    }
    return department;
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.department.update({ where: { id }, data: { ...dto } });
  }

  async remove(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.department.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true };
  }
}
