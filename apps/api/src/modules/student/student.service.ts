import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';
import { generateNumericId } from '@universityos/common';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: any, createdById: string) {
    const enrollmentNo = dto.enrollmentNo || `ENR${generateNumericId(8)}`;
    const existing = await this.prisma.student.findUnique({
      where: { enrollmentNo },
    });
    if (existing) {
      throw new BusinessException(ErrorCodes.RESOURCE_ALREADY_EXISTS, 'Enrollment number already exists', 409);
    }
    return this.prisma.student.create({
      data: {
        tenantId,
        userId: dto.userId,
        programId: dto.programId,
        batchId: dto.batchId,
        enrollmentNo,
        rollNumber: dto.rollNumber,
        registrationNo: dto.registrationNo,
        admissionDate: dto.admissionDate ? new Date(dto.admissionDate) : undefined,
        admissionType: dto.admissionType,
        category: dto.category,
        religion: dto.religion,
        nationality: dto.nationality || 'Indian',
        bloodGroup: dto.bloodGroup,
        aadhaarNumber: dto.aadhaarNumber,
        parents: dto.parents,
        localGuardian: dto.localGuardian,
        metadata: dto.metadata,
        createdById,
      },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.search) {
      where.OR = [
        { enrollmentNo: { contains: query.search, mode: 'insensitive' } },
        { rollNumber: { contains: query.search, mode: 'insensitive' } },
        { registrationNo: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.programId) where.programId = query.programId;
    if (query.batchId) where.batchId = query.batchId;
    if (query.status) where.status = query.status;
    if (query.category) where.category = query.category;

    const [items, total] = await Promise.all([
      this.prisma.student.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
          program: true,
          batch: true,
        },
      }),
      this.prisma.student.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const student = await this.prisma.student.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
        program: true,
        batch: true,
        guardians: true,
        educationHistory: true,
        enrollments: { include: { course: true } },
        certificates: true,
      },
    });
    if (!student) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Student not found', 404);
    }
    return student;
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.student.update({ where: { id }, data: { ...dto } });
  }

  async addGuardian(tenantId: string, studentId: string, dto: any) {
    await this.findById(tenantId, studentId);
    return this.prisma.guardian.create({
      data: {
        studentId,
        name: dto.name,
        relation: dto.relation,
        occupation: dto.occupation,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        isPrimary: dto.isPrimary || false,
      },
    });
  }

  async addEducationHistory(tenantId: string, studentId: string, dto: any) {
    await this.findById(tenantId, studentId);
    return this.prisma.educationHistory.create({
      data: {
        studentId,
        degree: dto.degree,
        institution: dto.institution,
        board: dto.board,
        yearOfPassing: dto.yearOfPassing,
        percentage: dto.percentage,
        grade: dto.grade,
        subjects: dto.subjects,
        documents: dto.documents,
      },
    });
  }

  async changeStatus(tenantId: string, id: string, status: string) {
    await this.findById(tenantId, id);
    return this.prisma.student.update({
      where: { id },
      data: { status },
    });
  }

  async remove(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.student.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'WITHDRAWN' },
    });
    return { success: true };
  }
}
