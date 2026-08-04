import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: any, createdById: string) {
    return this.prisma.report.create({
      data: {
        tenantId,
        name: dto.name,
        code: dto.code,
        category: dto.category,
        query: dto.query,
        columns: dto.columns,
        filters: dto.filters,
        schedule: dto.schedule,
        isPublic: dto.isPublic,
        createdById,
        status: dto.status || 'ACTIVE',
      },
    });
  }

  async findAll(tenantId: string, query: any) {
    const where: any = { tenantId, deletedAt: null };
    if (query.category) where.category = query.category;
    return this.prisma.report.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(tenantId: string, id: string) {
    const report = await this.prisma.report.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!report) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Report not found', 404);
    }
    return report;
  }

  async execute(tenantId: string, id: string, params: any) {
    const report = await this.findById(tenantId, id);
    const query = report.query as any;
    const model = (this.prisma as any)[query.model];
    if (!model) {
      throw new BusinessException(ErrorCodes.BAD_REQUEST, `Unknown report model: ${query.model}`);
    }
    const where = { ...(query.where || {}), tenantId, ...params };
    const args = {
      where,
      ...(query.select ? { select: query.select } : {}),
      ...(query.orderBy ? { orderBy: query.orderBy } : {}),
      ...(query.take ? { take: parseInt(query.take, 10) } : {}),
    };
    const [data, total] = await Promise.all([
      model.findMany(args),
      model.count({ where } as any),
    ]);
    return { data, total, report: { id: report.id, name: report.name, code: report.code } };
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.report.update({ where: { id }, data: { ...dto } });
  }

  async remove(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.report.update({ where: { id }, data: { deletedAt: new Date() } });
    return { success: true };
  }
}
