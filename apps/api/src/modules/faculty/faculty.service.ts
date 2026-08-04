import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';
import { generateNumericId } from '@universityos/common';

@Injectable()
export class FacultyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(tenantId: string, dto: any) {
    const employeeCode = dto.employeeCode || `FAC${generateNumericId(7)}`;
    const existing = await this.prisma.faculty.findUnique({ where: { employeeCode } });
    if (existing) {
      throw new BusinessException(ErrorCodes.RESOURCE_ALREADY_EXISTS, 'Employee code already exists', 409);
    }
    return this.prisma.faculty.create({
      data: {
        tenantId,
        userId: dto.userId,
        departmentId: dto.departmentId,
        employeeCode,
        designation: dto.designation,
        qualification: dto.qualification,
        specialization: dto.specialization,
        joiningDate: dto.joiningDate ? new Date(dto.joiningDate) : undefined,
        employmentType: dto.employmentType,
        subjects: dto.subjects,
      },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.search) {
      where.OR = [
        { employeeCode: { contains: query.search, mode: 'insensitive' } },
        { designation: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.departmentId) where.departmentId = query.departmentId;
    if (query.status) where.status = query.status;
    if (query.employmentType) where.employmentType = query.employmentType;

    const [items, total] = await Promise.all([
      this.prisma.faculty.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
          department: true,
        },
      }),
      this.prisma.faculty.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const faculty = await this.prisma.faculty.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
        department: true,
        courses: { include: { course: true } },
      },
    });
    if (!faculty) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Faculty not found', 404);
    }
    return faculty;
  }

  async update(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.faculty.update({ where: { id }, data: { ...dto } });
  }

  async assignCourse(tenantId: string, facultyId: string, courseId: string, role?: string) {
    await this.findById(tenantId, facultyId);
    const existing = await this.prisma.facultyCourse.findUnique({
      where: { facultyId_courseId: { facultyId, courseId } },
    });
    if (existing) {
      throw new BusinessException(ErrorCodes.RESOURCE_ALREADY_EXISTS, 'Faculty already assigned to this course', 409);
    }
    return this.prisma.facultyCourse.create({
      data: { facultyId, courseId, role },
    });
  }

  async removeCourse(tenantId: string, facultyId: string, courseId: string) {
    await this.prisma.facultyCourse.deleteMany({
      where: { facultyId, courseId },
    });
    return { success: true };
  }

  async remove(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.faculty.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'INACTIVE' },
    });
    return { success: true };
  }
}
