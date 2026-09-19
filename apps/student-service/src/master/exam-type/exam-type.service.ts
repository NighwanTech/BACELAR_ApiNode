import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class ExamTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const existingName = await this.prisma.examTypeMaster.findFirst({
      where: { examTypeName: data.examTypeName, IsDeleted: false },
    });
    if (existingName) {
      throw new ConflictException('Exam type name already exists');
    }

    return this.prisma.examTypeMaster.create({
      data: {
        examTypeName: data.examTypeName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.prisma.examTypeMaster.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: { examTypeName: 'asc' },
    });
  }

  async findOne(examTypeId: number) {
    const examType = await this.prisma.examTypeMaster.findFirst({
      where: { examTypeId, IsDeleted: false },
    });
    if (!examType) {
      throw new NotFoundException(`Exam type with ID ${examTypeId} not found`);
    }
    return examType;
  }

  async update(examTypeId: number, data: any) {
    await this.findOne(examTypeId);

    if (data.examTypeName) {
      const existingName = await this.prisma.examTypeMaster.findFirst({
        where: {
          examTypeName: data.examTypeName,
          IsDeleted: false,
          NOT: { examTypeId },
        },
      });
      if (existingName) {
        throw new ConflictException('Exam type name already exists');
      }
    }

    return this.prisma.examTypeMaster.update({
      where: { examTypeId },
      data: {
        examTypeName: data.examTypeName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async softDelete(examTypeId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(examTypeId);

    return this.prisma.examTypeMaster.update({
      where: { examTypeId },
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
