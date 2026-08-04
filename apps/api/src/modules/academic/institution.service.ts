import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class InstitutionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: any, createdById: string) {
    return this.prisma.institution.create({
      data: {
        tenantId,
        name: dto.name,
        code: dto.code,
        type: dto.type,
        affiliatedTo: dto.affiliatedTo,
        establishedYear: dto.establishedYear,
        address: dto.address,
        contact: dto.contact,
        accreditation: dto.accreditation,
      },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' };
    }
    const [items, total] = await Promise.all([
      this.prisma.institution.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { departments: true, programs: true, campuses: true },
      }),
      this.prisma.institution.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const institution = await this.prisma.institution.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { departments: true, programs: true, campuses: true },
    });
    if (!institution) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Institution not found', 404);
    }
    return institution;
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.institution.update({
      where: { id },
      data: { ...dto },
    });
  }

  async remove(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.institution.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true };
  }
}
