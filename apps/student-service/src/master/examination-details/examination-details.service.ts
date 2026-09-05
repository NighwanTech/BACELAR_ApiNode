import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class ExaminationDetailsService {
  constructor(private readonly prisma: PrismaService) {}

  private examInclude() {
    return {
      academicSession: {
        select: {
          academicSessionId: true,
          academicSessionName: true,
          collegeId: true,
        },
      },
      program: {
        select: {
          programId: true,
          programName: true,
          programShortName: true,
        },
      },
    };
  }

  private toNullableNumber(value: any): number | null {
    if (value === undefined || value === null || value === '') return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  private async assertAcademicSession(academicId: number) {
    const academicSession = await this.prisma.academicSession.findFirst({
      where: { academicSessionId: academicId, IsDeleted: false },
    });
    if (!academicSession) {
      throw new NotFoundException(
        `Academic session with ID ${academicId} not found`,
      );
    }
    return academicSession;
  }

  private async resolveProgram(programId?: number | null, programName?: string | null) {
    const id = this.toNullableNumber(programId);
    if (id == null) {
      return { programId: null, programName: programName ? String(programName).trim() || null : null };
    }
    const program = await this.prisma.program.findFirst({
      where: { programId: id, IsDeleted: false },
    });
    if (!program) {
      throw new NotFoundException(`Program with ID ${id} not found`);
    }
    return {
      programId: program.programId,
      programName: String(programName || program.programName || '').trim() || program.programName,
    };
  }

  async create(data: any) {
    await this.assertAcademicSession(Number(data.academicId));
    const program = await this.resolveProgram(data.programId, data.programName);

    const examinationName = String(data.examinationName || '').trim();
    const examType = data.examType ? String(data.examType).trim() : null;
    const existing = await this.prisma.examinationDetails.findFirst({
      where: {
        academicId: Number(data.academicId),
        examinationName,
        IsDeleted: false,
      },
    });
    if (existing) {
      throw new ConflictException(
        'Examination name already exists for this academic session',
      );
    }

    return this.prisma.examinationDetails.create({
      data: {
        academicId: Number(data.academicId),
        programId: program.programId,
        programName: program.programName,
        examinationName,
        examType,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
      include: this.examInclude(),
    });
  }

  async findAll(academicId?: number, activeOnly = false) {
    return this.prisma.examinationDetails.findMany({
      where: {
        IsDeleted: false,
        ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}),
        ...(academicId ? { academicId: Number(academicId) } : {}),
      },
      include: this.examInclude(),
      orderBy: [{ academicId: 'asc' }, { examinationName: 'asc' }],
    });
  }

  async findOne(examinationId: number) {
    const examination = await this.prisma.examinationDetails.findFirst({
      where: { examinationId, IsDeleted: false },
      include: this.examInclude(),
    });
    if (!examination) {
      throw new NotFoundException(
        `Examination details with ID ${examinationId} not found`,
      );
    }
    return examination;
  }

  async update(examinationId: number, data: any) {
    const current = await this.findOne(examinationId);
    const academicId =
      data.academicId !== undefined ? Number(data.academicId) : current.academicId;
    const examinationName =
      data.examinationName !== undefined
        ? String(data.examinationName).trim()
        : current.examinationName;

    if (data.academicId !== undefined) {
      await this.assertAcademicSession(academicId);
    }

    const existing = await this.prisma.examinationDetails.findFirst({
      where: {
        academicId,
        examinationName,
        IsDeleted: false,
        NOT: { examinationId },
      },
    });
    if (existing) {
      throw new ConflictException(
        'Examination name already exists for this academic session',
      );
    }

    const program =
      data.programId !== undefined || data.programName !== undefined
        ? await this.resolveProgram(
            data.programId === undefined ? current.programId : data.programId,
            data.programName === undefined ? current.programName : data.programName,
          )
        : null;

    return this.prisma.examinationDetails.update({
      where: { examinationId },
      data: {
        academicId: data.academicId !== undefined ? academicId : undefined,
        ...(program
          ? { programId: program.programId, programName: program.programName }
          : {}),
        examinationName:
          data.examinationName !== undefined ? examinationName : undefined,
        examType: data.examType !== undefined ? String(data.examType).trim() || null : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
      include: this.examInclude(),
    });
  }

  
  async updateStatus(examinationId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(examinationId);
    return this.prisma.examinationDetails.update({
      where: { examinationId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(
    examinationId: number,
    DeletedBy: string,
    DeletedRemarks?: string,
  ) {
    await this.findOne(examinationId);

    return this.prisma.examinationDetails.update({
      where: { examinationId },
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
