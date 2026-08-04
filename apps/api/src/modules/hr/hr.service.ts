import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';
import { generateNumericId } from '@universityos/common';

@Injectable()
export class HrService {
  constructor(private readonly prisma: PrismaService) {}

  async createEmployee(tenantId: string, dto: any) {
    const employeeCode = dto.employeeCode || `EMP${generateNumericId(7)}`;
    const existing = await this.prisma.employee.findUnique({ where: { employeeCode } });
    if (existing) {
      throw new BusinessException(ErrorCodes.RESOURCE_ALREADY_EXISTS, 'Employee code already exists', 409);
    }
    return this.prisma.employee.create({
      data: {
        tenantId,
        userId: dto.userId,
        employeeCode,
        departmentId: dto.departmentId,
        designation: dto.designation,
        employmentType: dto.employmentType,
        joiningDate: dto.joiningDate ? new Date(dto.joiningDate) : undefined,
        salary: dto.salary,
        bankDetails: dto.bankDetails,
        panNumber: dto.panNumber,
        pfNumber: dto.pfNumber,
        uanNumber: dto.uanNumber,
        metadata: dto.metadata,
      },
    });
  }

  async findAllEmployees(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.departmentId) where.departmentId = query.departmentId;
    if (query.status) where.status = query.status;
    if (query.search) {
      where.employeeCode = { contains: query.search, mode: 'insensitive' };
    }
    const [items, total] = await Promise.all([
      this.prisma.employee.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.employee.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const employee = await this.prisma.employee.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { leaves: true },
    });
    if (!employee) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Employee not found', 404);
    }
    return employee;
  }

  async updateEmployee(tenantId: string, id: string, dto: any) {
    await this.findById(tenantId, id);
    return this.prisma.employee.update({ where: { id }, data: { ...dto } });
  }

  async applyLeave(tenantId: string, employeeId: string, dto: any) {
    return this.prisma.leaveRequest.create({
      data: {
        tenantId,
        employeeId,
        leaveType: dto.leaveType,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        days: dto.days,
        reason: dto.reason,
        status: 'PENDING',
      },
    });
  }

  async findAllLeaves(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId };
    if (query.employeeId) where.employeeId = query.employeeId;
    if (query.status) where.status = query.status;
    const [items, total] = await Promise.all([
      this.prisma.leaveRequest.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { employee: true },
      }),
      this.prisma.leaveRequest.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async approveLeave(tenantId: string, leaveId: string, approvedById: string) {
    await this.prisma.leaveRequest.update({
      where: { id: leaveId },
      data: { status: 'APPROVED', approvedById, approvedAt: new Date() },
    });
    return { success: true };
  }

  async rejectLeave(tenantId: string, leaveId: string, approvedById: string) {
    await this.prisma.leaveRequest.update({
      where: { id: leaveId },
      data: { status: 'REJECTED', approvedById, approvedAt: new Date() },
    });
    return { success: true };
  }

  async removeEmployee(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.employee.update({ where: { id }, data: { deletedAt: new Date(), status: 'INACTIVE' } });
    return { success: true };
  }
}
