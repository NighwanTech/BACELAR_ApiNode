import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class FeeService {
  constructor(private readonly prisma: PrismaService) {}

  async createHead(tenantId: string, dto: any) {
    return this.prisma.feeHead.create({
      data: {
        tenantId,
        name: dto.name,
        code: dto.code,
        category: dto.category,
        amount: dto.amount,
        isMandatory: dto.isMandatory ?? true,
        frequency: dto.frequency,
      },
    });
  }

  async findAllHeads(tenantId: string, query: any) {
    const where: any = { tenantId, deletedAt: null };
    if (query.category) where.category = query.category;
    return this.prisma.feeHead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async createStructure(tenantId: string, dto: any) {
    return this.prisma.feeStructure.create({
      data: {
        tenantId,
        programId: dto.programId,
        batchId: dto.batchId,
        name: dto.name,
        items: dto.items,
        total: dto.total,
      },
    });
  }

  async findAllStructures(tenantId: string, query: any) {
    const where: any = { tenantId, deletedAt: null };
    if (query.programId) where.programId = query.programId;
    return this.prisma.feeStructure.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateHead(tenantId: string, id: string, dto: any) {
    return this.prisma.feeHead.update({ where: { id }, data: { ...dto } });
  }

  async removeHead(tenantId: string, id: string) {
    await this.prisma.feeHead.update({ where: { id }, data: { deletedAt: new Date() } });
    return { success: true };
  }
}
