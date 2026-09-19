import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class PramanDetailsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    let pramanId: number | null = null;
    let pramanName: string | null = null;
    if (data.pramanId !== undefined && data.pramanId !== null && data.pramanId !== '') {
      pramanId = Number(data.pramanId);
      const praman = await this.prisma.pramanMaster.findFirst({
        where: { pramanId, IsDeleted: false },
      });
      if (praman) {
        pramanName = data.pramanName ? String(data.pramanName).trim() : praman.pramanName;
      } else {
        pramanName = data.pramanName ? String(data.pramanName).trim() : null;
      }
    } else if (data.pramanName) {
      pramanName = String(data.pramanName).trim();
    }

    let subParameterId: number | null = null;
    let subParameterName: string | null = null;
    if (data.subParameterId !== undefined && data.subParameterId !== null && data.subParameterId !== '') {
      subParameterId = Number(data.subParameterId);
      const subParam = await this.prisma.pramanSubParameterMaster.findFirst({
        where: { subPramanParameterId: subParameterId, IsDeleted: false },
      });
      if (subParam) {
        subParameterName = data.subParameterName ? String(data.subParameterName).trim() : subParam.subPramanParameterName;
      } else {
        subParameterName = data.subParameterName ? String(data.subParameterName).trim() : null;
      }
    } else if (data.subParameterName) {
      subParameterName = String(data.subParameterName).trim();
    }

    let academicYearId: number | null = null;
    let academicYearName: string | null = null;
    if (data.academicYearId !== undefined && data.academicYearId !== null && data.academicYearId !== '') {
      academicYearId = Number(data.academicYearId);
      const acadYear = await this.prisma.academicYearMaster.findFirst({
        where: { academicYearId, IsDeleted: false },
      });
      if (acadYear) {
        academicYearName = data.academicYearName ? String(data.academicYearName).trim() : acadYear.academicYearName;
      } else {
        academicYearName = data.academicYearName ? String(data.academicYearName).trim() : null;
      }
    } else if (data.academicYearName) {
      academicYearName = String(data.academicYearName).trim();
    }

    let pramanResId: number | null = null;
    let responseName: string | null = null;
    if (data.pramanResId !== undefined && data.pramanResId !== null && data.pramanResId !== '') {
      pramanResId = Number(data.pramanResId);
      const res = await this.prisma.pramanResponseMaster.findFirst({
        where: { pramanResponseId: pramanResId, IsDeleted: false },
      });
      if (res) {
        responseName = data.responseName ? String(data.responseName).trim() : res.pramanResponseName;
      } else {
        responseName = data.responseName ? String(data.responseName).trim() : null;
      }
    } else if (data.responseName) {
      responseName = String(data.responseName).trim();
    }

    const monthId = data.monthId ? Number(data.monthId) : null;
    const monthName = data.monthName ? String(data.monthName).trim() : null;
    const attachment = data.attachment ? String(data.attachment).trim() : null;

    return this.prisma.pramanDetailsMaster.create({
      data: {
        pramanId,
        pramanName,
        subParameterId,
        subParameterName,
        monthId,
        monthName,
        academicYearId,
        academicYearName,
        attachment,
        pramanResId,
        responseName,
        CreatedBy: data.CreatedBy || 'Admin',
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? Boolean(data.IsActive) : true,
        IsDeleted: false,
      },
      include: {
        praman: true,
        subParameter: true,
        academicYear: true,
        pramanResponse: true,
      },
    });
  }

  async findAll(params?: {
    activeOnly?: boolean;
    pramanId?: number;
    subParameterId?: number;
    academicYearId?: number;
    monthId?: number;
    pramanResId?: number;
  }) {
    return this.prisma.pramanDetailsMaster.findMany({
      where: {
        IsDeleted: false,
        ...(isActiveOnly(params?.activeOnly) ? { IsActive: true } : {}),
        ...(params?.pramanId ? { pramanId: params.pramanId } : {}),
        ...(params?.subParameterId ? { subParameterId: params.subParameterId } : {}),
        ...(params?.academicYearId ? { academicYearId: params.academicYearId } : {}),
        ...(params?.monthId ? { monthId: params.monthId } : {}),
        ...(params?.pramanResId ? { pramanResId: params.pramanResId } : {}),
      },
      include: {
        praman: true,
        subParameter: true,
        academicYear: true,
        pramanResponse: true,
      },
      orderBy: { pramanDetailsId: 'asc' },
    });
  }

  async findOne(pramanDetailsId: number) {
    const row = await this.prisma.pramanDetailsMaster.findFirst({
      where: { pramanDetailsId, IsDeleted: false },
      include: {
        praman: true,
        subParameter: true,
        academicYear: true,
        pramanResponse: true,
      },
    });
    if (!row) {
      throw new NotFoundException(`Praman details entry with ID ${pramanDetailsId} not found`);
    }
    return row;
  }

  async update(pramanDetailsId: number, data: any) {
    const existing = await this.findOne(pramanDetailsId);

    let pramanId = existing.pramanId;
    let pramanName = existing.pramanName;
    if (data.pramanId !== undefined) {
      if (data.pramanId === null || data.pramanId === '') {
        pramanId = null;
        pramanName = null;
      } else {
        pramanId = Number(data.pramanId);
        const praman = await this.prisma.pramanMaster.findFirst({
          where: { pramanId, IsDeleted: false },
        });
        if (praman) pramanName = praman.pramanName;
      }
    }
    if (data.pramanName !== undefined && data.pramanName !== null) {
      pramanName = String(data.pramanName).trim();
    }

    let subParameterId = existing.subParameterId;
    let subParameterName = existing.subParameterName;
    if (data.subParameterId !== undefined) {
      if (data.subParameterId === null || data.subParameterId === '') {
        subParameterId = null;
        subParameterName = null;
      } else {
        subParameterId = Number(data.subParameterId);
        const subParam = await this.prisma.pramanSubParameterMaster.findFirst({
          where: { subPramanParameterId: subParameterId, IsDeleted: false },
        });
        if (subParam) subParameterName = subParam.subPramanParameterName;
      }
    }
    if (data.subParameterName !== undefined && data.subParameterName !== null) {
      subParameterName = String(data.subParameterName).trim();
    }

    let academicYearId = existing.academicYearId;
    let academicYearName = existing.academicYearName;
    if (data.academicYearId !== undefined) {
      if (data.academicYearId === null || data.academicYearId === '') {
        academicYearId = null;
        academicYearName = null;
      } else {
        academicYearId = Number(data.academicYearId);
        const acadYear = await this.prisma.academicYearMaster.findFirst({
          where: { academicYearId, IsDeleted: false },
        });
        if (acadYear) academicYearName = acadYear.academicYearName;
      }
    }
    if (data.academicYearName !== undefined && data.academicYearName !== null) {
      academicYearName = String(data.academicYearName).trim();
    }

    let pramanResId = existing.pramanResId;
    let responseName = existing.responseName;
    if (data.pramanResId !== undefined) {
      if (data.pramanResId === null || data.pramanResId === '') {
        pramanResId = null;
        responseName = null;
      } else {
        pramanResId = Number(data.pramanResId);
        const res = await this.prisma.pramanResponseMaster.findFirst({
          where: { pramanResponseId: pramanResId, IsDeleted: false },
        });
        if (res) responseName = res.pramanResponseName;
      }
    }
    if (data.responseName !== undefined && data.responseName !== null) {
      responseName = String(data.responseName).trim();
    }

    return this.prisma.pramanDetailsMaster.update({
      where: { pramanDetailsId },
      data: {
        pramanId,
        pramanName,
        subParameterId,
        subParameterName,
        monthId: data.monthId !== undefined ? (data.monthId ? Number(data.monthId) : null) : undefined,
        monthName: data.monthName !== undefined ? (data.monthName ? String(data.monthName).trim() : null) : undefined,
        academicYearId,
        academicYearName,
        attachment: data.attachment !== undefined ? (data.attachment ? String(data.attachment).trim() : null) : undefined,
        pramanResId,
        responseName,
        UpdatedBy: data.UpdatedBy || 'Admin',
        IsActive: data.IsActive !== undefined ? Boolean(data.IsActive) : undefined,
        Remarks: data.Remarks,
      },
      include: {
        praman: true,
        subParameter: true,
        academicYear: true,
        pramanResponse: true,
      },
    });
  }

  async updateStatus(pramanDetailsId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(pramanDetailsId);
    return this.prisma.pramanDetailsMaster.update({
      where: { pramanDetailsId },
      data: { IsActive, UpdatedBy },
      include: {
        praman: true,
        subParameter: true,
        academicYear: true,
        pramanResponse: true,
      },
    });
  }

  async softDelete(pramanDetailsId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(pramanDetailsId);
    return this.prisma.pramanDetailsMaster.update({
      where: { pramanDetailsId },
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
    const result = await this.prisma.pramanDetailsMaster.updateMany({
      where: {
        pramanDetailsId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} praman details record(s)`,
      count: result.count,
    };
  }
}
