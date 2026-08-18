import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class SemesterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    if (data.yearId) {
      const year = await this.prisma.yearMaster.findFirst({
        where: { yearId: data.yearId, IsDeleted: false },
      });
      if (!year) {
        throw new NotFoundException(`Year with ID ${data.yearId} not found`);
      }
    }

    const whereCondition: any = {
      semesterName: data.semesterName,
      IsDeleted: false,
    };
    if (data.yearId) {
      whereCondition.yearId = data.yearId;
    } else {
      whereCondition.yearId = null;
    }

    const existingSemester = await this.prisma.semesterMaster.findFirst({
      where: whereCondition,
    });
    if (existingSemester) {
      throw new ConflictException(`Semester '${data.semesterName}' already exists`);
    }

    return this.prisma.semesterMaster.create({
      data: {
        yearId: data.yearId ? data.yearId : null,
        semesterName: data.semesterName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
      include: {
        year: {
          include: {
            examType: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.semesterMaster.findMany({
      where: { IsDeleted: false },
      include: {
        year: {
          include: {
            examType: true,
          },
        },
      },
      orderBy: { semesterName: 'asc' },
    });
  }

  async findOne(semId: number) {
    const semester = await this.prisma.semesterMaster.findFirst({
      where: { semId, IsDeleted: false },
      include: {
        year: {
          include: {
            examType: true,
          },
        },
      },
    });
    if (!semester) {
      throw new NotFoundException(`Semester with ID ${semId} not found`);
    }
    return semester;
  }

  async update(semId: number, data: any) {
    const currentSemester = await this.findOne(semId);

    const targetYearId = data.yearId !== undefined ? data.yearId : currentSemester.yearId;
    const targetSemesterName = data.semesterName !== undefined ? data.semesterName : currentSemester.semesterName;

    if (data.yearId) {
      const year = await this.prisma.yearMaster.findFirst({
        where: { yearId: data.yearId, IsDeleted: false },
      });
      if (!year) {
        throw new NotFoundException(`Year with ID ${data.yearId} not found`);
      }
    }

    if (data.semesterName !== undefined || data.yearId !== undefined) {
      const whereCondition: any = {
        semesterName: targetSemesterName,
        IsDeleted: false,
        NOT: { semId },
      };
      if (targetYearId) {
        whereCondition.yearId = targetYearId;
      } else {
        whereCondition.yearId = null;
      }

      const existingSemester = await this.prisma.semesterMaster.findFirst({
        where: whereCondition,
      });
      if (existingSemester) {
        throw new ConflictException(`Semester '${targetSemesterName}' already exists`);
      }
    }

    return this.prisma.semesterMaster.update({
      where: { semId },
      data: {
        yearId: data.yearId !== undefined ? (data.yearId || null) : undefined,
        semesterName: data.semesterName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
      include: {
        year: {
          include: {
            examType: true,
          },
        },
      },
    });
  }

  async softDelete(semId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(semId);

    return this.prisma.semesterMaster.update({
      where: { semId },
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
