import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class ExaminationDetailsService {
  constructor(private readonly prisma: PrismaService) {}

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

  async create(data: any) {
    await this.assertAcademicSession(Number(data.academicId));

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
        examinationName,
        examType,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(academicId?: number) {
    return this.prisma.examinationDetails.findMany({
      where: {
        IsDeleted: false,
        ...(academicId ? { academicId: Number(academicId) } : {}),
      },
      include: {
        academicSession: {
          select: {
            academicSessionId: true,
            academicSessionName: true,
            collegeId: true,
          },
        },
      },
      orderBy: [{ academicId: 'asc' }, { examinationName: 'asc' }],
    });
  }

  async findOne(examinationId: number) {
    const examination = await this.prisma.examinationDetails.findFirst({
      where: { examinationId, IsDeleted: false },
      include: {
        academicSession: {
          select: {
            academicSessionId: true,
            academicSessionName: true,
            collegeId: true,
          },
        },
      },
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

    return this.prisma.examinationDetails.update({
      where: { examinationId },
      data: {
        academicId: data.academicId !== undefined ? academicId : undefined,
        examinationName:
          data.examinationName !== undefined ? examinationName : undefined,
        examType: data.examType !== undefined ? String(data.examType).trim() || null : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
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
