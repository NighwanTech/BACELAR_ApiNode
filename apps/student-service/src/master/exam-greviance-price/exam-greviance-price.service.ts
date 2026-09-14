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

  private async resolveProgramNames(programId: number, programCategoryId?: number) {
    const program = await this.prisma.program.findFirst({
      where: { programId, IsDeleted: false },
      include: { programCategory: true },
    });
    if (!program) {
      throw new BadRequestException(`Program with ID ${programId} not found`);
    }

    const resolvedCategoryId = programCategoryId ?? program.programCategoryId;
    if (resolvedCategoryId !== program.programCategoryId) {
      throw new BadRequestException('programCategoryId does not match the selected program');
    }

    return {
      programCategoryId: program.programCategoryId,
      programCategoryName: program.programCategory?.programCategoryName || '',
      programId: program.programId,
      programName: program.programName,
    };
  }

  async create(data: any) {
    const programId = Number(data.programId);
    if (!Number.isFinite(programId) || programId <= 0) {
      throw new BadRequestException('programId is required');
    }

    const names = await this.resolveProgramNames(
      programId,
      data.programCategoryId !== undefined ? Number(data.programCategoryId) : undefined,
    );

    const duplicate = await this.prisma.examGreviancePriceMaster.findFirst({
      where: { programId: names.programId, IsDeleted: false },
    });
    if (duplicate) {
      throw new ConflictException(
        'Exam grievance price already exists for this program. Please edit the existing entry.',
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
        program: true,
        programCategory: true,
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
        program: true,
        programCategory: true,
      },
      orderBy: { CreatedOn: 'desc' },
    });
  }

  async findOne(examGreviancePriceMasterId: number) {
    const row = await this.prisma.examGreviancePriceMaster.findFirst({
      where: { examGreviancePriceMasterId, IsDeleted: false },
      include: {
        program: true,
        programCategory: true,
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
      programCategoryId: current.programCategoryId,
      programCategoryName: current.programCategoryName,
      programId: current.programId,
      programName: current.programName,
    };

    if (data.programId !== undefined) {
      const programId = Number(data.programId);
      names = await this.resolveProgramNames(
        programId,
        data.programCategoryId !== undefined ? Number(data.programCategoryId) : undefined,
      );

      const duplicate = await this.prisma.examGreviancePriceMaster.findFirst({
        where: {
          programId: names.programId,
          IsDeleted: false,
          NOT: { examGreviancePriceMasterId },
        },
      });
      if (duplicate) {
        throw new ConflictException(
          'Exam grievance price already exists for this program. Please edit the existing entry.',
        );
      }
    } else if (data.programCategoryId !== undefined || data.programCategoryName !== undefined || data.programName !== undefined) {
      // Keep snapshot names in sync if only names/category passed without program change
      if (data.programCategoryId !== undefined) {
        names.programCategoryId = Number(data.programCategoryId);
      }
      if (data.programCategoryName !== undefined) {
        names.programCategoryName = String(data.programCategoryName);
      }
      if (data.programName !== undefined) {
        names.programName = String(data.programName);
      }
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
        program: true,
        programCategory: true,
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
