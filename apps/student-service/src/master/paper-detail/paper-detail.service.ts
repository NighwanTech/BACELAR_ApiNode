import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class PaperDetailService {
  constructor(private readonly prisma: PrismaService) {}

  private paperDb() {
    return this.prisma.paperDetailMaster as any;
  }

  private getIncludeRelations() {
    return {
      paperTypeRelation: true,
      marksTypeRelation: true,
      examTypeRelation: true,
      program: {
        include: {
          programCategory: true,
        },
      },
      year: {
        include: {
          examType: true,
        },
      },
      semester: {
        include: {
          year: {
            include: {
              examType: true,
            },
          },
        },
      },
    };
  }

  private async resolveMarksType(marksTypeId?: number | null, marksTypeName?: string | null) {
    if (!marksTypeId) {
      return {
        marksTypeId: null as number | null,
        marksTypeName: marksTypeName ? String(marksTypeName).trim() || null : null,
      };
    }
    const marksTypeObj = await this.prisma.marksTypeMaster.findFirst({
      where: { marksTypeId: Number(marksTypeId), IsDeleted: false },
    });
    if (!marksTypeObj) {
      throw new NotFoundException(`Marks type with ID ${marksTypeId} not found`);
    }
    return {
      marksTypeId: marksTypeObj.marksTypeId,
      marksTypeName: marksTypeObj.marksTypeName,
    };
  }

  async create(data: any) {
    if (data.paperTypeId) {
      const paperTypeObj = await this.prisma.paperTypeMaster.findFirst({
        where: { paperTypeId: data.paperTypeId, IsDeleted: false },
      });
      if (!paperTypeObj) {
        throw new NotFoundException(`Paper type with ID ${data.paperTypeId} not found`);
      }
    }

    if (data.examTypeId) {
      const examTypeObj = await this.prisma.examTypeMaster.findFirst({
        where: { examTypeId: data.examTypeId, IsDeleted: false },
      });
      if (!examTypeObj) {
        throw new NotFoundException(`Exam type with ID ${data.examTypeId} not found`);
      }
    }

    if (data.programId) {
      const programObj = await this.prisma.program.findFirst({
        where: { programId: data.programId, IsDeleted: false },
      });
      if (!programObj) {
        throw new NotFoundException(`Program with ID ${data.programId} not found`);
      }
    }

    if (data.yearId) {
      const yearObj = await this.prisma.yearMaster.findFirst({
        where: { yearId: data.yearId, IsDeleted: false },
      });
      if (!yearObj) {
        throw new NotFoundException(`Year with ID ${data.yearId} not found`);
      }
    }

    if (data.semId) {
      const semObj = await this.prisma.semesterMaster.findFirst({
        where: { semId: data.semId, IsDeleted: false },
      });
      if (!semObj) {
        throw new NotFoundException(`Semester with ID ${data.semId} not found`);
      }
    }

    const marksType = await this.resolveMarksType(data.marksTypeId, data.marksTypeName);

    if (data.paperCode) {
    const existingCode = await this.paperDb().findFirst({
      where: { paperCode: data.paperCode, IsDeleted: false },
      });
      if (existingCode) {
        throw new ConflictException(`Paper code '${data.paperCode}' already exists`);
      }
    }

    return this.paperDb().create({
      data: {
        paperTypeId: data.paperTypeId || null,
        examTypeId: data.examTypeId || null,
        programId: data.programId || null,
        yearId: data.yearId || null,
        semId: data.semId || null,
        marksTypeId: marksType.marksTypeId,
        marksTypeName: marksType.marksTypeName,

        subjectName: data.subjectName || null,
        paperType: data.paperType || null,
        paperName: data.paperName,
        paperCode: data.paperCode || null,

        totalMarksMax: data.totalMarksMax ?? null,
        totalMarksMin: data.totalMarksMin ?? null,
        theoryMarksMax: data.theoryMarksMax ?? null,
        theoryMarksMin: data.theoryMarksMin ?? null,
        sessionalMarksMax: data.sessionalMarksMax ?? null,
        sessionalMarksMin: data.sessionalMarksMin ?? null,
        externalPracticalMarksMax: data.externalPracticalMarksMax ?? null,
        externalPracticalMarksMin: data.externalPracticalMarksMin ?? null,
        internalPracticalMarksMax: data.internalPracticalMarksMax ?? null,
        internalPracticalMarksMin: data.internalPracticalMarksMin ?? null,
        vivaMarksMax: data.vivaMarksMax ?? null,
        vivaMarksMin: data.vivaMarksMin ?? null,
        projectMax: data.projectMax ?? null,
        projectMin: data.projectMin ?? null,
        creditMax: data.creditMax ?? null,

        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
      include: this.getIncludeRelations(),
    });
  }

  async findAll(activeOnly = false) {
    return this.paperDb().findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      include: this.getIncludeRelations(),
      orderBy: { paperName: 'asc' },
    });
  }

  async findOne(paperId: number) {
    const paper = await this.paperDb().findFirst({
      where: { paperId, IsDeleted: false },
      include: this.getIncludeRelations(),
    });
    if (!paper) {
      throw new NotFoundException(`Paper detail with ID ${paperId} not found`);
    }
    return paper;
  }

  async update(paperId: number, data: any) {
    await this.findOne(paperId);

    if (data.paperTypeId) {
      const paperTypeObj = await this.prisma.paperTypeMaster.findFirst({
        where: { paperTypeId: data.paperTypeId, IsDeleted: false },
      });
      if (!paperTypeObj) {
        throw new NotFoundException(`Paper type with ID ${data.paperTypeId} not found`);
      }
    }

    if (data.examTypeId) {
      const examTypeObj = await this.prisma.examTypeMaster.findFirst({
        where: { examTypeId: data.examTypeId, IsDeleted: false },
      });
      if (!examTypeObj) {
        throw new NotFoundException(`Exam type with ID ${data.examTypeId} not found`);
      }
    }

    if (data.programId) {
      const programObj = await this.prisma.program.findFirst({
        where: { programId: data.programId, IsDeleted: false },
      });
      if (!programObj) {
        throw new NotFoundException(`Program with ID ${data.programId} not found`);
      }
    }

    if (data.yearId) {
      const yearObj = await this.prisma.yearMaster.findFirst({
        where: { yearId: data.yearId, IsDeleted: false },
      });
      if (!yearObj) {
        throw new NotFoundException(`Year with ID ${data.yearId} not found`);
      }
    }

    if (data.semId) {
      const semObj = await this.prisma.semesterMaster.findFirst({
        where: { semId: data.semId, IsDeleted: false },
      });
      if (!semObj) {
        throw new NotFoundException(`Semester with ID ${data.semId} not found`);
      }
    }

    const marksType =
      data.marksTypeId !== undefined || data.marksTypeName !== undefined
        ? await this.resolveMarksType(data.marksTypeId, data.marksTypeName)
        : null;

    if (data.paperCode) {
      const existingCode = await this.paperDb().findFirst({
        where: {
          paperCode: data.paperCode,
          IsDeleted: false,
          NOT: { paperId },
        },
      });
      if (existingCode) {
        throw new ConflictException(`Paper code '${data.paperCode}' already exists`);
      }
    }

    return this.paperDb().update({
      where: { paperId },
      data: {
        paperTypeId: data.paperTypeId !== undefined ? (data.paperTypeId || null) : undefined,
        examTypeId: data.examTypeId !== undefined ? (data.examTypeId || null) : undefined,
        programId: data.programId !== undefined ? (data.programId || null) : undefined,
        yearId: data.yearId !== undefined ? (data.yearId || null) : undefined,
        semId: data.semId !== undefined ? (data.semId || null) : undefined,
        marksTypeId: marksType ? marksType.marksTypeId : undefined,
        marksTypeName: marksType ? marksType.marksTypeName : undefined,

        subjectName: data.subjectName,
        paperType: data.paperType,
        paperName: data.paperName,
        paperCode: data.paperCode,

        totalMarksMax: data.totalMarksMax,
        totalMarksMin: data.totalMarksMin,
        theoryMarksMax: data.theoryMarksMax,
        theoryMarksMin: data.theoryMarksMin,
        sessionalMarksMax: data.sessionalMarksMax,
        sessionalMarksMin: data.sessionalMarksMin,
        externalPracticalMarksMax: data.externalPracticalMarksMax,
        externalPracticalMarksMin: data.externalPracticalMarksMin,
        internalPracticalMarksMax: data.internalPracticalMarksMax,
        internalPracticalMarksMin: data.internalPracticalMarksMin,
        vivaMarksMax: data.vivaMarksMax,
        vivaMarksMin: data.vivaMarksMin,
        projectMax: data.projectMax,
        projectMin: data.projectMin,
        creditMax: data.creditMax,

        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
      include: this.getIncludeRelations(),
    });
  }

  async softDelete(paperId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(paperId);

    return this.paperDb().update({
      where: { paperId },
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
