import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class YearService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    if (data.typeId) {
      const examType = await this.prisma.examTypeMaster.findFirst({
        where: { examTypeId: data.typeId, IsDeleted: false },
      });
      if (!examType) {
        throw new NotFoundException(`Exam type with ID ${data.typeId} not found`);
      }
    }

    const whereCondition: any = {
      yearName: data.yearName,
      IsDeleted: false,
    };
    if (data.typeId) {
      whereCondition.typeId = data.typeId;
    } else {
      whereCondition.typeId = null;
    }

    const existingYear = await this.prisma.yearMaster.findFirst({
      where: whereCondition,
    });
    if (existingYear) {
      throw new ConflictException(`Year '${data.yearName}' already exists`);
    }

    return this.prisma.yearMaster.create({
      data: {
        typeId: data.typeId ? data.typeId : null,
        yearName: data.yearName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
      include: {
        examType: true,
      },
    });
  }

  async findAll() {
    return this.prisma.yearMaster.findMany({
      where: { IsDeleted: false },
      include: {
        examType: true,
      },
      orderBy: { yearName: 'asc' },
    });
  }

  async findOne(yearId: number) {
    const year = await this.prisma.yearMaster.findFirst({
      where: { yearId, IsDeleted: false },
      include: {
        examType: true,
      },
    });
    if (!year) {
      throw new NotFoundException(`Year with ID ${yearId} not found`);
    }
    return year;
  }

  async update(yearId: number, data: any) {
    const currentYear = await this.findOne(yearId);

    const targetTypeId = data.typeId !== undefined ? data.typeId : currentYear.typeId;
    const targetYearName = data.yearName !== undefined ? data.yearName : currentYear.yearName;

    if (data.typeId) {
      const examType = await this.prisma.examTypeMaster.findFirst({
        where: { examTypeId: data.typeId, IsDeleted: false },
      });
      if (!examType) {
        throw new NotFoundException(`Exam type with ID ${data.typeId} not found`);
      }
    }

    if (data.yearName !== undefined || data.typeId !== undefined) {
      const whereCondition: any = {
        yearName: targetYearName,
        IsDeleted: false,
        NOT: { yearId },
      };
      if (targetTypeId) {
        whereCondition.typeId = targetTypeId;
      } else {
        whereCondition.typeId = null;
      }

      const existingYear = await this.prisma.yearMaster.findFirst({
        where: whereCondition,
      });
      if (existingYear) {
        throw new ConflictException(`Year '${targetYearName}' already exists`);
      }
    }

    return this.prisma.yearMaster.update({
      where: { yearId },
      data: {
        typeId: data.typeId !== undefined ? (data.typeId || null) : undefined,
        yearName: data.yearName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
      include: {
        examType: true,
      },
    });
  }

  async softDelete(yearId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(yearId);

    return this.prisma.yearMaster.update({
      where: { yearId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }
}
