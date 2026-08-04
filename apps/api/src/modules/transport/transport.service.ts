import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class TransportService {
  constructor(private readonly prisma: PrismaService) {}

  async createRoute(tenantId: string, dto: any) {
    return this.prisma.transportRoute.create({
      data: {
        tenantId,
        name: dto.name,
        routeNumber: dto.routeNumber,
        stops: dto.stops,
        distanceKm: dto.distanceKm,
        fee: dto.fee,
      },
    });
  }

  async findAllRoutes(tenantId: string, query: any) {
    const where: any = { tenantId, deletedAt: null };
    return this.prisma.transportRoute.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { vehicles: true },
    });
  }

  async addVehicle(tenantId: string, dto: any) {
    const existing = await this.prisma.transportVehicle.findUnique({
      where: { registrationNo: dto.registrationNo },
    });
    if (existing) {
      throw new BusinessException(ErrorCodes.RESOURCE_ALREADY_EXISTS, 'Registration number already exists', 409);
    }
    return this.prisma.transportVehicle.create({
      data: {
        tenantId,
        routeId: dto.routeId,
        registrationNo: dto.registrationNo,
        make: dto.make,
        model: dto.model,
        capacity: dto.capacity,
        driverName: dto.driverName,
        driverPhone: dto.driverPhone,
      },
    });
  }

  async findAllVehicles(tenantId: string, query: any) {
    const where: any = { tenantId, deletedAt: null };
    return this.prisma.transportVehicle.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async assignStudent(tenantId: string, dto: any) {
    return this.prisma.transportAssignment.create({
      data: {
        tenantId,
        routeId: dto.routeId,
        studentId: dto.studentId,
        stop: dto.stop,
        fee: dto.fee || 0,
        status: 'ACTIVE',
      },
    });
  }

  async findAllAssignments(tenantId: string, query: any) {
    const where: any = { tenantId };
    if (query.studentId) where.studentId = query.studentId;
    if (query.routeId) where.routeId = query.routeId;
    return this.prisma.transportAssignment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { route: true, student: { include: { user: { select: { firstName: true, lastName: true } } } } },
    });
  }

  async unassignStudent(tenantId: string, assignmentId: string) {
    await this.prisma.transportAssignment.update({
      where: { id: assignmentId },
      data: { status: 'INACTIVE' },
    });
    return { success: true };
  }

  async removeRoute(tenantId: string, id: string) {
    await this.prisma.transportRoute.update({ where: { id }, data: { deletedAt: new Date() } });
    return { success: true };
  }
}
