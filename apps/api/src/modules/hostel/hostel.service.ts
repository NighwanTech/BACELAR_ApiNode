import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class HostelService {
  constructor(private readonly prisma: PrismaService) {}

  async createHostel(tenantId: string, dto: any) {
    return this.prisma.hostel.create({
      data: {
        tenantId,
        name: dto.name,
        code: dto.code,
        type: dto.type,
        capacity: dto.capacity,
        wardenId: dto.wardenId,
        address: dto.address,
      },
    });
  }

  async findAllHostels(tenantId: string, query: any) {
    const where: any = { tenantId, deletedAt: null };
    if (query.type) where.type = query.type;
    return this.prisma.hostel.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { rooms: true },
    });
  }

  async createRoom(tenantId: string, hostelId: string, dto: any) {
    await this.findHostelById(tenantId, hostelId);
    return this.prisma.hostelRoom.create({
      data: {
        tenantId,
        hostelId,
        roomNumber: dto.roomNumber,
        floor: dto.floor,
        type: dto.type,
        capacity: dto.capacity,
        monthlyRent: dto.monthlyRent,
        amenities: dto.amenities,
      },
    });
  }

  async findHostelById(tenantId: string, id: string) {
    const hostel = await this.prisma.hostel.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { rooms: true },
    });
    if (!hostel) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Hostel not found', 404);
    }
    return hostel;
  }

  async allocateRoom(tenantId: string, dto: any) {
    const room = await this.prisma.hostelRoom.findUnique({ where: { id: dto.roomId } });
    if (!room) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Room not found', 404);
    }
    if (room.occupied >= (room.capacity || 1)) {
      throw new BusinessException(ErrorCodes.RESOURCE_CONFLICT, 'Room is full', 409);
    }
    await this.prisma.hostelRoom.update({
      where: { id: dto.roomId },
      data: { occupied: { increment: 1 } },
    });
    return this.prisma.hostelAllocation.create({
      data: {
        tenantId,
        roomId: dto.roomId,
        studentId: dto.studentId,
        allocationDate: new Date(),
        status: 'ACTIVE',
      },
    });
  }

  async vacateRoom(tenantId: string, allocationId: string) {
    const allocation = await this.prisma.hostelAllocation.findUnique({
      where: { id: allocationId },
    });
    if (!allocation) throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'Allocation not found', 404);
    if (allocation.roomId) {
      await this.prisma.hostelRoom.update({
        where: { id: allocation.roomId },
        data: { occupied: { decrement: 1 } },
      });
    }
    return this.prisma.hostelAllocation.update({
      where: { id: allocationId },
      data: { vacateDate: new Date(), status: 'INACTIVE' },
    });
  }

  async findAllAllocations(tenantId: string, query: any) {
    const where: any = { tenantId };
    if (query.status) where.status = query.status;
    if (query.roomId) where.roomId = query.roomId;
    return this.prisma.hostelAllocation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { room: { include: { hostel: true } }, student: true },
    });
  }

  async updateRoom(tenantId: string, id: string, dto: any) {
    return this.prisma.hostelRoom.update({ where: { id }, data: { ...dto } });
  }

  async removeHostel(tenantId: string, id: string) {
    await this.findHostelById(tenantId, id);
    await this.prisma.hostel.update({ where: { id }, data: { deletedAt: new Date() } });
    return { success: true };
  }
}
