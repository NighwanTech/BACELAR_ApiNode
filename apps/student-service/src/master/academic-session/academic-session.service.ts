import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class AcademicSessionService {
  constructor(private readonly prisma: PrismaService) {}

  private toBool(value: any, fallback = false): boolean {
    if (value === undefined || value === null || value === '') return fallback;
    if (typeof value === 'boolean') return value;
    const s = String(value).trim().toLowerCase();
    return s === 'true' || s === '1' || s === 'yes';
  }

  private async setOnlyCurrent(academicSessionId: number) {
    await this.prisma.academicSession.updateMany({
      where: { IsDeleted: false, NOT: { academicSessionId } },
      data: { isCurrent: false },
    });
  }

  async findCurrent() {
    return this.prisma.academicSession.findFirst({
      where: { isCurrent: true, IsDeleted: false, IsActive: true },
      include: {
        college: {
          select: {
            collegeId: true,
            collegeName: true,
            shortName: true,
            collegeCode: true,
          },
        },
      },
      orderBy: { startYear: 'desc' },
    });
  }

  private async assertCollege(collegeId: number) {
    const college = await this.prisma.collegeMaster.findFirst({
      where: { collegeId, IsDeleted: false },
    });
    if (!college) {
      throw new NotFoundException(`College with ID ${collegeId} not found`);
    }
    return college;
  }

  async create(data: any) {
    await this.assertCollege(Number(data.collegeId));

    const academicSessionName = String(data.academicSessionName || '').trim();
    const existing = await this.prisma.academicSession.findFirst({
      where: {
        collegeId: Number(data.collegeId),
        academicSessionName,
        IsDeleted: false,
      },
    });
    if (existing) {
      throw new ConflictException(
        'Academic session name already exists for this college',
      );
    }

    const isCurrent = this.toBool(data.isCurrent, false);

    const created = await this.prisma.academicSession.create({
      data: {
        collegeId: Number(data.collegeId),
        academicSessionName,
        startMonth: Number(data.startMonth),
        startYear: Number(data.startYear),
        endMonth: Number(data.endMonth),
        endYear: Number(data.endYear),
        isCurrent,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });

    if (created.isCurrent) {
      await this.setOnlyCurrent(created.academicSessionId);
    }

    return this.findOne(created.academicSessionId);
  }

  async findAll(collegeId?: number) {
    return this.prisma.academicSession.findMany({
      where: {
        IsDeleted: false,
        ...(collegeId ? { collegeId: Number(collegeId) } : {}),
      },
      include: {
        college: {
          select: {
            collegeId: true,
            collegeName: true,
            shortName: true,
            collegeCode: true,
          },
        },
      },
      orderBy: [{ collegeId: 'asc' }, { startYear: 'desc' }, { academicSessionName: 'asc' }],
    });
  }

  async findOne(academicSessionId: number) {
    const session = await this.prisma.academicSession.findFirst({
      where: { academicSessionId, IsDeleted: false },
      include: {
        college: {
          select: {
            collegeId: true,
            collegeName: true,
            shortName: true,
            collegeCode: true,
          },
        },
      },
    });
    if (!session) {
      throw new NotFoundException(
        `Academic session with ID ${academicSessionId} not found`,
      );
    }
    return session;
  }

  async update(academicSessionId: number, data: any) {
    const current = await this.findOne(academicSessionId);
    const collegeId =
      data.collegeId !== undefined ? Number(data.collegeId) : current.collegeId;
    const academicSessionName =
      data.academicSessionName !== undefined
        ? String(data.academicSessionName).trim()
        : current.academicSessionName;

    if (data.collegeId !== undefined) {
      await this.assertCollege(collegeId);
    }

    const existing = await this.prisma.academicSession.findFirst({
      where: {
        collegeId,
        academicSessionName,
        IsDeleted: false,
        NOT: { academicSessionId },
      },
    });
    if (existing) {
      throw new ConflictException(
        'Academic session name already exists for this college',
      );
    }

    const isCurrent =
      data.isCurrent !== undefined ? this.toBool(data.isCurrent) : undefined;

    const updated = await this.prisma.academicSession.update({
      where: { academicSessionId },
      data: {
        collegeId: data.collegeId !== undefined ? collegeId : undefined,
        academicSessionName:
          data.academicSessionName !== undefined ? academicSessionName : undefined,
        startMonth:
          data.startMonth !== undefined ? Number(data.startMonth) : undefined,
        startYear:
          data.startYear !== undefined ? Number(data.startYear) : undefined,
        endMonth: data.endMonth !== undefined ? Number(data.endMonth) : undefined,
        endYear: data.endYear !== undefined ? Number(data.endYear) : undefined,
        isCurrent,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });

    if (updated.isCurrent) {
      await this.setOnlyCurrent(updated.academicSessionId);
    }

    return this.findOne(updated.academicSessionId);
  }

  
  async updateStatus(academicSessionId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(academicSessionId);
    return this.prisma.academicSession.update({
      where: { academicSessionId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(
    academicSessionId: number,
    DeletedBy: string,
    DeletedRemarks?: string,
  ) {
    await this.findOne(academicSessionId);

    return this.prisma.academicSession.update({
      where: { academicSessionId },
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
