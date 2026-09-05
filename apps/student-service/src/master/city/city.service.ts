import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const existingName = await this.prisma.cityMaster.findFirst({
      where: { cityName: data.cityName, stateId: data.stateId },
    });
    if (existingName) {
      throw new ConflictException('City name already exists in this state');
    }

    const existingCode = await this.prisma.cityMaster.findUnique({
      where: { cityShortCode: data.cityShortCode },
    });
    if (existingCode) {
      throw new ConflictException('City short code already exists');
    }

    return this.prisma.cityMaster.create({
      data: {
        stateId: data.stateId,
        cityName: data.cityName,
        cityShortCode: data.cityShortCode,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(stateId?: number, activeOnly = false) {
    return this.prisma.cityMaster.findMany({
      where: {
        IsDeleted: false,
        ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}),
        ...(stateId ? { stateId: Number(stateId) } : {}),
      },
      orderBy: { cityName: 'asc' },
    });
  }

  async findOne(cityId: number) {
    const city = await this.prisma.cityMaster.findFirst({
      where: { cityId, IsDeleted: false },
    });
    if (!city) {
      throw new NotFoundException(`City with ID ${cityId} not found`);
    }
    return city;
  }

  async update(cityId: number, data: any) {
    await this.findOne(cityId);

    if (data.cityName && data.stateId) {
      const existingName = await this.prisma.cityMaster.findFirst({
        where: {
          cityName: data.cityName,
          stateId: data.stateId,
          NOT: { cityId },
        },
      });
      if (existingName) {
        throw new ConflictException('City name already exists in this state');
      }
    }

    if (data.cityShortCode) {
      const existingCode = await this.prisma.cityMaster.findFirst({
        where: {
          cityShortCode: data.cityShortCode,
          NOT: { cityId },
        },
      });
      if (existingCode) {
        throw new ConflictException('City short code already exists');
      }
    }

    return this.prisma.cityMaster.update({
      where: { cityId },
      data: {
        stateId: data.stateId,
        cityName: data.cityName,
        cityShortCode: data.cityShortCode,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  
  async updateStatus(cityId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(cityId);
    return this.prisma.cityMaster.update({
      where: { cityId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(cityId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(cityId);

    return this.prisma.cityMaster.update({
      where: { cityId },
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
