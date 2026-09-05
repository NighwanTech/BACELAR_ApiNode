import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class ExamSubjectService {
  constructor(private readonly prisma: PrismaService) {}

  private getIncludeRelations() {
    return {
      program: true,
      programCategory: true,
    };
  }

  async create(data: any) {
    let resolvedProgramName = data.programName || null;
    let resolvedProgramCategoryName = data.programCategoryName || null;

    if (data.programId) {
      const programObj = await this.prisma.program.findFirst({
        where: { programId: data.programId, IsDeleted: false },
      });
      if (!programObj) {
        throw new NotFoundException(`Program with ID ${data.programId} not found`);
      }
      if (!resolvedProgramName) {
        resolvedProgramName = programObj.programName;
      }
    }

    if (data.programCategoryId) {
      const categoryObj = await this.prisma.programCategory.findFirst({
        where: { programCategoryId: data.programCategoryId, IsDeleted: false },
      });
      if (!categoryObj) {
        throw new NotFoundException(`Program category with ID ${data.programCategoryId} not found`);
      }
      if (!resolvedProgramCategoryName) {
        resolvedProgramCategoryName = categoryObj.programCategoryName;
      }
    }

    return this.prisma.examSubjectMaster.create({
      data: {
        programId: data.programId || null,
        programName: resolvedProgramName,
        programCategoryId: data.programCategoryId || null,
        programCategoryName: resolvedProgramCategoryName,
        examSubName: data.examSubName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
      include: this.getIncludeRelations(),
    });
  }

  async findAll(activeOnly = false) {
    return this.prisma.examSubjectMaster.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      include: this.getIncludeRelations(),
      orderBy: { examSubName: 'asc' },
    });
  }

  async findOne(examSubId: number) {
    const examSub = await this.prisma.examSubjectMaster.findFirst({
      where: { examSubId, IsDeleted: false },
      include: this.getIncludeRelations(),
    });
    if (!examSub) {
      throw new NotFoundException(`Exam subject with ID ${examSubId} not found`);
    }
    return examSub;
  }

  async update(examSubId: number, data: any) {
    const existing = await this.findOne(examSubId);

    let resolvedProgramName = data.programName !== undefined ? data.programName : existing.programName;
    let resolvedProgramCategoryName = data.programCategoryName !== undefined ? data.programCategoryName : existing.programCategoryName;

    if (data.programId) {
      const programObj = await this.prisma.program.findFirst({
        where: { programId: data.programId, IsDeleted: false },
      });
      if (!programObj) {
        throw new NotFoundException(`Program with ID ${data.programId} not found`);
      }
      if (data.programName === undefined) {
        resolvedProgramName = programObj.programName;
      }
    }

    if (data.programCategoryId) {
      const categoryObj = await this.prisma.programCategory.findFirst({
        where: { programCategoryId: data.programCategoryId, IsDeleted: false },
      });
      if (!categoryObj) {
        throw new NotFoundException(`Program category with ID ${data.programCategoryId} not found`);
      }
      if (data.programCategoryName === undefined) {
        resolvedProgramCategoryName = categoryObj.programCategoryName;
      }
    }

    return this.prisma.examSubjectMaster.update({
      where: { examSubId },
      data: {
        programId: data.programId !== undefined ? (data.programId || null) : undefined,
        programName: resolvedProgramName,
        programCategoryId: data.programCategoryId !== undefined ? (data.programCategoryId || null) : undefined,
        programCategoryName: resolvedProgramCategoryName,
        examSubName: data.examSubName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
      include: this.getIncludeRelations(),
    });
  }

  async softDelete(examSubId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(examSubId);

    return this.prisma.examSubjectMaster.update({
      where: { examSubId },
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
