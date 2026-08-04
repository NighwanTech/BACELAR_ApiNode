import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class CommitteeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: any) {
    return this.prisma.committee.create({
      data: {
        tenantId,
        name: dto.name,
        type: dto.type,
        description: dto.description,
        chairpersonId: dto.chairpersonId,
        members: dto.members,
        constitutionDate: dto.constitutionDate ? new Date(dto.constitutionDate) : undefined,
      },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.type) where.type = query.type;
    if (query.search) {
      where.name = { contains: query.search, mode: 'insensitive' };
    }
    const [items, total] = await Promise.all([
      this.prisma.committee.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { meetings: true },
      }),
      this.prisma.committee.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const committee = await this.prisma.committee.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { meetings: { orderBy: { scheduledAt: 'desc' } } },
    });
    if (!committee) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Committee not found', 404);
    }
    return committee;
  }

  async scheduleMeeting(tenantId: string, committeeId: string, dto: any) {
    await this.findById(tenantId, committeeId);
    return this.prisma.committeeMeeting.create({
      data: {
        tenantId,
        committeeId,
        title: dto.title,
        agenda: dto.agenda,
        scheduledAt: new Date(dto.scheduledAt),
        status: dto.status || 'PENDING',
      },
    });
  }

  async updateMeeting(tenantId: string, meetingId: string, dto: any) {
    return this.prisma.committeeMeeting.update({
      where: { id: meetingId },
      data: { ...dto },
    });
  }

  async getAllMeetings(tenantId: string, query: any) {
    const where: any = { tenantId };
    if (query.committeeId) where.committeeId = query.committeeId;
    if (query.status) where.status = query.status;
    return this.prisma.committeeMeeting.findMany({
      where,
      orderBy: { scheduledAt: 'desc' },
      include: { committee: true },
    });
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.committee.update({ where: { id }, data: { ...dto } });
  }

  async remove(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.committee.update({ where: { id }, data: { deletedAt: new Date() } });
    return { success: true };
  }
}
