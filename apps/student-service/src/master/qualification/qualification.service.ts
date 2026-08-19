import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class QualificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.qualificationMaster.create({
      data: {
        qualificationName: data.qualificationName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return this.prisma.qualificationMaster.findMany({
      where: { IsDeleted: false },
      orderBy: { qualificationName: 'asc' },
    });
  }

  async findOne(qualificationId: number) {
    const qual = await this.prisma.qualificationMaster.findFirst({
      where: { qualificationId, IsDeleted: false },
    });
    if (!qual) {
      throw new NotFoundException(`Qualification with ID ${qualificationId} not found`);
    }
    return qual;
  }

  async update(qualificationId: number, data: any) {
    await this.findOne(qualificationId);

    return this.prisma.qualificationMaster.update({
      where: { qualificationId },
      data: {
        qualificationName: data.qualificationName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  
  async updateStatus(qualificationId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(qualificationId);
    return this.prisma.qualificationMaster.update({
      where: { qualificationId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(qualificationId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(qualificationId);

    return this.prisma.qualificationMaster.update({
      where: { qualificationId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const result = await this.prisma.qualificationMaster.updateMany({
      where: {
        qualificationId: { in: ids },
        IsDeleted: false,
      },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });

    return {
      message: `Successfully soft-deleted ${result.count} qualification(s)`,
      count: result.count,
    };
  }
}
