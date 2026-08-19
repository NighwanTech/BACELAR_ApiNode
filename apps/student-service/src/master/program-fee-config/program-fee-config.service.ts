import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

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
export class ProgramFeeConfigService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const programId = Number(data.programId);
    const admissionSessionId = Number(data.admissionSessionId);
    if (!Number.isFinite(programId) || programId <= 0) {
      throw new BadRequestException('programId is required');
    }
    if (!Number.isFinite(admissionSessionId) || admissionSessionId <= 0) {
      throw new BadRequestException('admissionSessionId is required');
    }

    const duplicate = await this.prisma.programFeeConfig.findFirst({
      where: { programId, admissionSessionId, IsDeleted: false },
    });
    if (duplicate) {
      throw new ConflictException(
        'Fee configuration already exists for this program. Please edit the existing entry.',
      );
    }

    const regFinal = calculateFinalFee(
      Number(data.registrationBaseFee ?? 0.0),
      Number(data.registrationPgRate ?? 2.0),
      Number(data.registrationGstRate ?? 18.0),
    );

    const examFinal = calculateFinalFee(
      Number(data.examinationBaseFee ?? 0.0),
      Number(data.examinationPgRate ?? 2.0),
      Number(data.examinationGstRate ?? 18.0),
    );

    return this.prisma.programFeeConfig.create({
      data: {
        programId: Number(data.programId),
        admissionSessionId: Number(data.admissionSessionId),
        registrationBaseFee: Number(data.registrationBaseFee ?? 0.0),
        registrationPgRate: Number(data.registrationPgRate ?? 2.0),
        registrationGstRate: Number(data.registrationGstRate ?? 18.0),
        registrationFinal: regFinal,
        examinationBaseFee: Number(data.examinationBaseFee ?? 0.0),
        examinationPgRate: Number(data.examinationPgRate ?? 2.0),
        examinationGstRate: Number(data.examinationGstRate ?? 18.0),
        examinationFinal: examFinal,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
      include: {
        program: true,
        admissionSession: true,
      },
    });
  }

  async findAll() {
    return this.prisma.programFeeConfig.findMany({
      where: { IsDeleted: false },
      include: {
        program: true,
        admissionSession: true,
      },
      orderBy: { CreatedOn: 'desc' },
    });
  }

  async findOne(feeConfigId: number) {
    const config = await this.prisma.programFeeConfig.findFirst({
      where: { feeConfigId, IsDeleted: false },
      include: {
        program: true,
        admissionSession: true,
      },
    });
    if (!config) {
      throw new NotFoundException(`Program Fee Configuration with ID ${feeConfigId} not found`);
    }
    return config;
  }

  async findByProgramAndSession(programId: number, admissionSessionId: number) {
    const config = await this.prisma.programFeeConfig.findFirst({
      where: { programId, admissionSessionId, IsDeleted: false },
      include: {
        program: true,
        admissionSession: true,
      },
    });
    if (!config) {
      throw new NotFoundException(`Fee Configuration for Program ID ${programId} and Session ID ${admissionSessionId} not found`);
    }
    return config;
  }

  async update(feeConfigId: number, data: any) {
    const current = await this.findOne(feeConfigId);

    const regBase = data.registrationBaseFee !== undefined ? Number(data.registrationBaseFee) : current.registrationBaseFee;
    const regPg = data.registrationPgRate !== undefined ? Number(data.registrationPgRate) : current.registrationPgRate;
    const regGst = data.registrationGstRate !== undefined ? Number(data.registrationGstRate) : current.registrationGstRate;
    const regFinal = calculateFinalFee(regBase, regPg, regGst);

    const examBase = data.examinationBaseFee !== undefined ? Number(data.examinationBaseFee) : current.examinationBaseFee;
    const examPg = data.examinationPgRate !== undefined ? Number(data.examinationPgRate) : current.examinationPgRate;
    const examGst = data.examinationGstRate !== undefined ? Number(data.examinationGstRate) : current.examinationGstRate;
    const examFinal = calculateFinalFee(examBase, examPg, examGst);

    return this.prisma.programFeeConfig.update({
      where: { feeConfigId },
      data: {
        programId: data.programId !== undefined ? Number(data.programId) : undefined,
        admissionSessionId: data.admissionSessionId !== undefined ? Number(data.admissionSessionId) : undefined,
        registrationBaseFee: regBase,
        registrationPgRate: regPg,
        registrationGstRate: regGst,
        registrationFinal: regFinal,
        examinationBaseFee: examBase,
        examinationPgRate: examPg,
        examinationGstRate: examGst,
        examinationFinal: examFinal,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
      include: {
        program: true,
        admissionSession: true,
      },
    });
  }

  
  async updateStatus(feeConfigId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(feeConfigId);
    return this.prisma.programFeeConfig.update({
      where: { feeConfigId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(feeConfigId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(feeConfigId);

    return this.prisma.programFeeConfig.update({
      where: { feeConfigId },
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
    const result = await this.prisma.programFeeConfig.updateMany({
      where: {
        feeConfigId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} fee configuration(s)`,
      count: result.count,
    };
  }
}
