import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class ResearchService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(tenantId: string, dto: any) {
    return this.prisma.researchProject.create({
      data: {
        tenantId,
        title: dto.title,
        description: dto.description,
        type: dto.type,
        fundingAgency: dto.fundingAgency,
        fundingAmount: dto.fundingAmount,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        principalInvestigatorId: dto.principalInvestigatorId,
        coInvestigators: dto.coInvestigators,
      },
    });
  }

  async findAllProjects(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.search) {
      where.title = { contains: query.search, mode: 'insensitive' };
    }
    if (query.type) where.type = query.type;
    const [items, total] = await Promise.all([
      this.prisma.researchProject.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { publications: true },
      }),
      this.prisma.researchProject.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const project = await this.prisma.researchProject.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { publications: true },
    });
    if (!project) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Research project not found', 404);
    }
    return project;
  }

  async addPublication(tenantId: string, projectId: string, dto: any) {
    await this.findById(tenantId, projectId);
    return this.prisma.publication.create({
      data: {
        tenantId,
        researchProjectId: projectId,
        title: dto.title,
        authors: dto.authors,
        journal: dto.journal,
        issn: dto.issn,
        doi: dto.doi,
        year: dto.year,
        volume: dto.volume,
        issue: dto.issue,
        pages: dto.pages,
        type: dto.type,
      },
    });
  }

  async findAllPublications(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.researchProjectId) where.researchProjectId = query.researchProjectId;
    if (query.type) where.type = query.type;
    const [items, total] = await Promise.all([
      this.prisma.publication.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.publication.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async updateProject(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.researchProject.update({ where: { id }, data: { ...dto } });
  }

  async removeProject(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.researchProject.update({ where: { id }, data: { deletedAt: new Date() } });
    return { success: true };
  }
}
