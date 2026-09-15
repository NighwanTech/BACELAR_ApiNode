import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class AcademicYearService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const academicYearName = String(data.academicYearName || '').trim();
    if (!academicYearName) {
      throw new BadRequestException('academicYearName is required');
    }

    const duplicate = await this.prisma.academicYearMaster.findFirst({
      where: { academicYearName, IsDeleted: false },
    });
    if (duplicate) {
      throw new ConflictException('Academic year with this name already exists');
    }

    return this.prisma.academicYearMaster.create({
      data: {
        academicYearName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? Boolean(data.IsActive) : true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.prisma.academicYearMaster.findMany({
      where: {
        IsDeleted: false,
        ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}),
      },
      orderBy: { academicYearId: 'asc' },
    });
  }

  async findOne(academicYearId: number) {
    const row = await this.prisma.academicYearMaster.findFirst({
      where: { academicYearId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Academic year with ID ${academicYearId} not found`);
    }
    return row;
  }

  async update(academicYearId: number, data: any) {
    await this.findOne(academicYearId);

    if (data.academicYearName !== undefined) {
      const academicYearName = String(data.academicYearName || '').trim();
      const duplicate = await this.prisma.academicYearMaster.findFirst({
        where: {
          academicYearName,
          IsDeleted: false,
          NOT: { academicYearId },
        },
      });
      if (duplicate) {
        throw new ConflictException('Academic year with this name already exists');
      }
    }

    return this.prisma.academicYearMaster.update({
      where: { academicYearId },
      data: {
        academicYearName:
          data.academicYearName !== undefined
            ? String(data.academicYearName).trim()
            : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive !== undefined ? Boolean(data.IsActive) : undefined,
        Remarks: data.Remarks,
      },
    });
  }

  async updateStatus(academicYearId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(academicYearId);
    return this.prisma.academicYearMaster.update({
      where: { academicYearId },
      data: { IsActive, UpdatedBy },
    });
  }

  async softDelete(academicYearId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(academicYearId);
    return this.prisma.academicYearMaster.update({
      where: { academicYearId },
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
    const result = await this.prisma.academicYearMaster.updateMany({
      where: {
        academicYearId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} academic year(s)`,
      count: result.count,
    };
  }
}
