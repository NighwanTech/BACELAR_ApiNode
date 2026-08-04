import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { RabbitService } from '../../core/rabbit/rabbit.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';
import { generateNumericId } from '@universityos/common';

@Injectable()
export class AdmissionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rabbit: RabbitService,
  ) {}

  async apply(tenantId: string, dto: any) {
    const applicationNo = `APP${generateNumericId(10)}`;
    const application = await this.prisma.admissionApplication.create({
      data: {
        tenantId,
        programId: dto.programId,
        applicationNo,
        applicantName: dto.applicantName,
        email: dto.email,
        phone: dto.phone,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
        gender: dto.gender,
        category: dto.category,
        fatherName: dto.fatherName,
        motherName: dto.motherName,
        address: dto.address,
        photo: dto.photo,
        documents: dto.documents,
        academicDetails: dto.academicDetails,
        entranceScore: dto.entranceScore,
        meritScore: dto.meritScore,
        status: 'SUBMITTED',
        submittedAt: new Date(),
        metadata: dto.metadata,
      },
    });

    await this.prisma.admissionTimeline.create({
      data: {
        applicationId: application.id,
        stage: 'SUBMITTED',
        status: 'SUBMITTED',
        comment: 'Application submitted',
      },
    });

    return application;
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.search) {
      where.OR = [
        { applicantName: { contains: query.search, mode: 'insensitive' } },
        { applicationNo: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.status) where.status = query.status;
    if (query.programId) where.programId = query.programId;

    const [items, total] = await Promise.all([
      this.prisma.admissionApplication.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { program: true, timeline: true },
      }),
      this.prisma.admissionApplication.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const application = await this.prisma.admissionApplication.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { program: true, timeline: { orderBy: { createdAt: 'asc' } } },
    });
    if (!application) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Application not found', 404);
    }
    return application;
  }

  async updateStatus(tenantId: string, id: string, status: string, comment: string, performedById: string) {
    const application = await this.findById(tenantId, id);
    await this.prisma.admissionApplication.update({
      where: { id },
      data: { status, currentStage: status },
    });
    await this.prisma.admissionTimeline.create({
      data: {
        applicationId: id,
        stage: status,
        status: status as any,
        comment,
        performedById,
      },
    });
    await this.rabbit.publish('notification.created', {
      tenantId,
      userId: application.enrolledStudentId || undefined,
      type: 'email',
      channel: 'email',
      subject: `Application ${status.replace('_', ' ').toLowerCase()}`,
      body: `Your application ${application.applicationNo} status: ${status.replace(/_/g, ' ').toLowerCase()}`,
    });
    return this.findById(tenantId, id);
  }

  async enroll(tenantId: string, id: string, dto: any, performedById: string) {
    const application = await this.findById(tenantId, id);

    const student = await this.prisma.student.create({
      data: {
        tenantId,
        programId: application.programId,
        enrollmentNo: `ENR${generateNumericId(8)}`,
        admissionDate: new Date(),
        admissionType: dto.admissionType,
        category: application.category,
        status: 'ENROLLED',
        createdById: performedById,
      },
    });

    await this.prisma.admissionApplication.update({
      where: { id },
      data: { status: 'ENROLLED', enrolledStudentId: student.id },
    });

    await this.prisma.admissionTimeline.create({
      data: {
        applicationId: id,
        stage: 'ENROLLED',
        status: 'ENROLLED',
        comment: 'Student enrolled',
        performedById,
      },
    });

    return { student, application };
  }

  async createSchedule(tenantId: string, dto: any) {
    return this.prisma.admissionSchedule.create({
      data: {
        tenantId,
        programId: dto.programId,
        name: dto.name,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        description: dto.description,
        eligibility: dto.eligibility,
        fees: dto.fees,
      },
    });
  }

  async getSchedules(tenantId: string, query: any) {
    const where: any = { tenantId, deletedAt: null };
    if (query.programId) where.programId = query.programId;
    return this.prisma.admissionSchedule.findMany({
      where,
      orderBy: { startDate: 'desc' },
      include: { applications: true },
    });
  }

  async getStats(tenantId: string) {
    const [total, submitted, underReview, accepted, enrolled, rejected] = await Promise.all([
      this.prisma.admissionApplication.count({ where: { tenantId, deletedAt: null } }),
      this.prisma.admissionApplication.count({ where: { tenantId, status: 'SUBMITTED' } }),
      this.prisma.admissionApplication.count({ where: { tenantId, status: 'UNDER_REVIEW' } }),
      this.prisma.admissionApplication.count({ where: { tenantId, status: 'ACCEPTED' } }),
      this.prisma.admissionApplication.count({ where: { tenantId, status: 'ENROLLED' } }),
      this.prisma.admissionApplication.count({ where: { tenantId, status: 'REJECTED' } }),
    ]);
    return { total, submitted, underReview, accepted, enrolled, rejected };
  }
}
