import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class StateService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const existingName = await this.prisma.stateMaster.findUnique({
      where: { stateName: data.stateName },
    });
    if (existingName) {
      throw new ConflictException('State name already exists');
    }

    const existingCode = await this.prisma.stateMaster.findUnique({
      where: { stateShortCode: data.stateShortCode },
    });
    if (existingCode) {
      throw new ConflictException('State short code already exists');
    }

    return this.prisma.stateMaster.create({
      data: {
        stateName: data.stateName,
        stateShortCode: data.stateShortCode,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.prisma.stateMaster.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: { stateName: 'asc' },
    });
  }

  async findOne(stateId: number) {
    const state = await this.prisma.stateMaster.findFirst({
      where: { stateId, IsDeleted: false },
    });
    if (!state) {
      throw new NotFoundException(`State with ID ${stateId} not found`);
    }
    return state;
  }

  async update(stateId: number, data: any) {
    await this.findOne(stateId);

    if (data.stateName) {
      const existingName = await this.prisma.stateMaster.findFirst({
        where: {
          stateName: data.stateName,
          NOT: { stateId },
        },
      });
      if (existingName) {
        throw new ConflictException('State name already exists');
      }
    }

    if (data.stateShortCode) {
      const existingCode = await this.prisma.stateMaster.findFirst({
        where: {
          stateShortCode: data.stateShortCode,
          NOT: { stateId },
        },
      });
      if (existingCode) {
        throw new ConflictException('State short code already exists');
      }
    }

    return this.prisma.stateMaster.update({
      where: { stateId },
      data: {
        stateName: data.stateName,
        stateShortCode: data.stateShortCode,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  
  async updateStatus(stateId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(stateId);
    return this.prisma.stateMaster.update({
      where: { stateId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(stateId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(stateId);

    return this.prisma.stateMaster.update({
      where: { stateId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }
}
