import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class PlacementService {
  constructor(private readonly prisma: PrismaService) {}

  async createDrive(tenantId: string, dto: any) {
    return this.prisma.placementDrive.create({
      data: {
        tenantId,
        companyName: dto.companyName,
        companyDetails: dto.companyDetails,
        jobTitle: dto.jobTitle,
        jobDescription: dto.jobDescription,
        eligibility: dto.eligibility,
        package: dto.package,
        vacancies: dto.vacancies,
        driveDate: dto.driveDate ? new Date(dto.driveDate) : undefined,
        applicationDeadline: dto.applicationDeadline ? new Date(dto.applicationDeadline) : undefined,
      },
    });
  }

  async findAllDrives(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.search) {
      where.companyName = { contains: query.search, mode: 'insensitive' };
    }
    const [items, total] = await Promise.all([
      this.prisma.placementDrive.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { applications: true },
      }),
      this.prisma.placementDrive.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const drive = await this.prisma.placementDrive.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { applications: true },
    });
    if (!drive) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Placement drive not found', 404);
    }
    return drive;
  }

  async apply(tenantId: string, driveId: string, studentId: string, resume: string) {
    const existing = await this.prisma.placementApplication.findUnique({
      where: { driveId_studentId: { driveId, studentId } },
    });
    if (existing) {
      throw new BusinessException(ErrorCodes.RESOURCE_ALREADY_EXISTS, 'Already applied to this drive', 409);
    }
    return this.prisma.placementApplication.create({
      data: {
        tenantId,
        driveId,
        studentId,
        resume,
        status: 'APPLIED',
      },
    });
  }

  async updateStatus(tenantId: string, applicationId: string, status: string, offerDetails?: any, roundResults?: any) {
    return this.prisma.placementApplication.update({
      where: { id: applicationId },
      data: { status: status as any, offerDetails, roundResults },
    });
  }

  async findAllApplications(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId };
    if (query.driveId) where.driveId = query.driveId;
    if (query.studentId) where.studentId = query.studentId;
    if (query.status) where.status = query.status;
    const [items, total] = await Promise.all([
      this.prisma.placementApplication.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          drive: true,
        },
      }),
      this.prisma.placementApplication.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async getStats(tenantId: string) {
    const [totalDrives, totalApplications, selected, offered] = await Promise.all([
      this.prisma.placementDrive.count({ where: { tenantId, deletedAt: null } }),
      this.prisma.placementApplication.count({ where: { tenantId } }),
      this.prisma.placementApplication.count({ where: { tenantId, status: 'SELECTED' } }),
      this.prisma.placementApplication.count({ where: { tenantId, status: 'OFFERED' } }),
    ]);
    return { totalDrives, totalApplications, selected, offered };
  }

  async removeDrive(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.placementDrive.update({ where: { id }, data: { deletedAt: new Date() } });
    return { success: true };
  }
}
