import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class ZipcodeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    // One locality (within a city) can have only one zipcode; city can have many zipcodes
    const existingLocality = await this.prisma.zipcodeMaster.findFirst({
      where: {
        cityId: data.cityId,
        locality: data.locality,
        IsDeleted: false,
      },
    });
    if (existingLocality) {
      throw new ConflictException(
        'This locality already has a zipcode in this city',
      );
    }

    return this.prisma.zipcodeMaster.create({
      data: {
        zipCode: data.zipCode,
        stateId: data.stateId,
        cityId: data.cityId,
        locality: data.locality,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(filters?: { stateId?: number; cityId?: number; zipCode?: string }) {
    return this.prisma.zipcodeMaster.findMany({
      where: {
        IsDeleted: false,
        ...(filters?.stateId ? { stateId: Number(filters.stateId) } : {}),
        ...(filters?.cityId ? { cityId: Number(filters.cityId) } : {}),
        ...(filters?.zipCode
          ? { zipCode: String(filters.zipCode).trim() }
          : {}),
      },
      orderBy: { zipCode: 'asc' },
    });
  }

  async findOne(zipcodeId: number) {
    const zipcode = await this.prisma.zipcodeMaster.findFirst({
      where: { zipcodeId, IsDeleted: false },
    });
    if (!zipcode) {
      throw new NotFoundException(`Zipcode with ID ${zipcodeId} not found`);
    }
    return zipcode;
  }

  async update(zipcodeId: number, data: any) {
    const current = await this.findOne(zipcodeId);

    const cityId = data.cityId ?? current.cityId;
    const locality = data.locality ?? current.locality;

    if (locality !== undefined && cityId !== undefined) {
      const existingLocality = await this.prisma.zipcodeMaster.findFirst({
        where: {
          cityId,
          locality,
          IsDeleted: false,
          NOT: { zipcodeId },
        },
      });
      if (existingLocality) {
        throw new ConflictException(
          'This locality already has a zipcode in this city',
        );
      }
    }

    return this.prisma.zipcodeMaster.update({
      where: { zipcodeId },
      data: {
        zipCode: data.zipCode,
        stateId: data.stateId,
        cityId: data.cityId,
        locality: data.locality,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async softDelete(zipcodeId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(zipcodeId);

    return this.prisma.zipcodeMaster.update({
      where: { zipcodeId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }
}
