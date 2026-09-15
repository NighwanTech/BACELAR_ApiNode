import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

function calculateFinalFee(base: number, pgRate = 2.0, gstRate = 18.0): number {
  const baseNum = Number(base);
  if (!baseNum || baseNum <= 0) return 0;
  const pg = pgRate / 100;
  const gst = gstRate / 100;
  // Razorpay cuts pg% of the amount charged (+ GST on that fee). Charge more so net = base.
  const keepRatio = 1 - pg * (1 + gst);
  if (keepRatio <= 0) return 0;
  return Number((baseNum / keepRatio).toFixed(3));
}

@Injectable()
export class ExamGreviancePriceMasterService {
  constructor(private readonly prisma: PrismaService) {}

  private async resolveGrevianceType(grevianceTypeId: number) {
    const grevianceType = await this.prisma.grevianceTypeMaster.findFirst({
      where: { grevianceTypeId, IsDeleted: false },
    });
    if (!grevianceType) {
      throw new BadRequestException(`Greviance type with ID ${grevianceTypeId} not found`);
    }

    return {
      grevianceTypeId: grevianceType.grevianceTypeId,
      grevianceTypeName: grevianceType.grevianceTypeName,
    };
  }

  async create(data: any) {
    const grevianceTypeId = Number(data.grevianceTypeId);
    if (!Number.isFinite(grevianceTypeId) || grevianceTypeId <= 0) {
      throw new BadRequestException('grevianceTypeId is required');
    }

    const names = await this.resolveGrevianceType(grevianceTypeId);

    const duplicate = await this.prisma.examGreviancePriceMaster.findFirst({
      where: { grevianceTypeId: names.grevianceTypeId, IsDeleted: false },
    });
    if (duplicate) {
      throw new ConflictException(
        'Exam grievance price already exists for this greviance type. Please edit the existing entry.',
      );
    }

    const price = Number(data.price ?? 0);
    const pgRate = Number(data.pgRate ?? 2.0);
    const gstRate = Number(data.gstRate ?? 18.0);
    const finalPrice = calculateFinalFee(price, pgRate, gstRate);

    return this.prisma.examGreviancePriceMaster.create({
      data: {
        ...names,
        price,
        pgRate,
        gstRate,
        finalPrice,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
      include: {
        grevianceType: true,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.prisma.examGreviancePriceMaster.findMany({
      where: {
        IsDeleted: false,
        ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}),
      },
      include: {
        grevianceType: true,
      },
      orderBy: { CreatedOn: 'desc' },
    });
  }

  async findOne(examGreviancePriceMasterId: number) {
    const row = await this.prisma.examGreviancePriceMaster.findFirst({
      where: { examGreviancePriceMasterId, IsDeleted: false },
      include: {
        grevianceType: true,
      },
    });
    if (!row) {
      throw new NotFoundException(
        `Exam Grievance Price with ID ${examGreviancePriceMasterId} not found`,
      );
    }
    return row;
  }

  async update(examGreviancePriceMasterId: number, data: any) {
    const current = await this.findOne(examGreviancePriceMasterId);

    let names = {
      grevianceTypeId: current.grevianceTypeId,
      grevianceTypeName: current.grevianceTypeName,
    };

    if (data.grevianceTypeId !== undefined) {
      const grevianceTypeId = Number(data.grevianceTypeId);
      names = await this.resolveGrevianceType(grevianceTypeId);

      const duplicate = await this.prisma.examGreviancePriceMaster.findFirst({
        where: {
          grevianceTypeId: names.grevianceTypeId,
          IsDeleted: false,
          NOT: { examGreviancePriceMasterId },
        },
      });
      if (duplicate) {
        throw new ConflictException(
          'Exam grievance price already exists for this greviance type. Please edit the existing entry.',
        );
      }
    } else if (data.grevianceTypeName !== undefined) {
      names.grevianceTypeName = String(data.grevianceTypeName);
    }

    const price = data.price !== undefined ? Number(data.price) : current.price;
    const pgRate = data.pgRate !== undefined ? Number(data.pgRate) : current.pgRate;
    const gstRate = data.gstRate !== undefined ? Number(data.gstRate) : current.gstRate;
    const finalPrice = calculateFinalFee(price, pgRate, gstRate);

    return this.prisma.examGreviancePriceMaster.update({
      where: { examGreviancePriceMasterId },
      data: {
        ...names,
        price,
        pgRate,
        gstRate,
        finalPrice,
        UpdatedBy: data.UpdatedBy,
        ...(data.IsActive !== undefined ? { IsActive: data.IsActive } : {}),
        ...(data.Remarks !== undefined ? { Remarks: data.Remarks } : {}),
      },
      include: {
        grevianceType: true,
      },
    });
  }

  async updateStatus(examGreviancePriceMasterId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(examGreviancePriceMasterId);
    return this.prisma.examGreviancePriceMaster.update({
      where: { examGreviancePriceMasterId },
      data: { IsActive, UpdatedBy },
    });
  }

  async softDelete(examGreviancePriceMasterId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(examGreviancePriceMasterId);
    return this.prisma.examGreviancePriceMaster.update({
      where: { examGreviancePriceMasterId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const result = await this.prisma.examGreviancePriceMaster.updateMany({
      where: {
        examGreviancePriceMasterId: { in: ids },
        IsDeleted: false,
      },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });

    return {
      message: `Successfully soft-deleted ${result.count} exam grievance price(s)`,
      count: result.count,
    };
  }
}
