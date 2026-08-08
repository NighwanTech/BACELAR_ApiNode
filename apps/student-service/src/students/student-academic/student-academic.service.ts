import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class StudentAcademicService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Save (overwrite) all academic qualifications and their subjects for a student
   */
  async save(studentId: number, qualifications: any[], CreatedBy: string) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Delete existing academic details for this student (cascades to subjects)
      await tx.studentAcademicDetail.deleteMany({
        where: { studentId },
      });

      // 2. Insert new academic details
      const createdDetails = [];
      for (const qual of qualifications) {
        const detail = await tx.studentAcademicDetail.create({
          data: {
            studentId,
            qualificationId: Number(qual.qualificationId),
            boardId: Number(qual.boardId),
            schoolName: qual.schoolName,
            passingYear: Number(qual.passingYear),
            rollNo: qual.rollNo,
            resultStatus: qual.resultStatus,
            marksType: qual.marksType,
            maxMarks: Number(qual.maxMarks),
            obtainedMarks: Number(qual.obtainedMarks),
            percentage: Number(qual.percentage),
            division: qual.division || null,
            grade: qual.grade || null,
            CreatedBy: CreatedBy || 'System',
            IsActive: true,
            IsDeleted: false,
            subjects: {
              create: (qual.subjects || []).map((sub: any) => ({
                subjectId: Number(sub.subjectId),
                maxMarks: Number(sub.maxMarks),
                minMarks: Number(sub.minMarks || 33),
                obtainedMarks: Number(sub.obtainedMarks),
                grade: sub.grade || null,
                practicalMarks: sub.practicalMarks ? Number(sub.practicalMarks) : null,
                theoryMarks: sub.theoryMarks ? Number(sub.theoryMarks) : null,
                isOptional: !!sub.isOptional,
                CreatedBy: CreatedBy || 'System',
                IsActive: true,
                IsDeleted: false,
              })),
            },
          },
          include: {
            subjects: {
              include: {
                subject: true,
              },
            },
            qualification: true,
            board: true,
          },
        });
        createdDetails.push(detail);
      }

      return {
        status: 'success',
        message: 'Academic qualifications and subjects saved successfully',
        data: createdDetails,
      };
    });
  }

  async findAll() {
    return this.prisma.studentAcademicDetail.findMany({
      where: { IsDeleted: false },
      include: {
        subjects: {
          include: {
            subject: true,
          },
        },
        qualification: true,
        board: true,
        student: true,
      },
      orderBy: { CreatedOn: 'desc' },
    });
  }

  async findOne(academicDetailId: number) {
    const detail = await this.prisma.studentAcademicDetail.findFirst({
      where: { academicDetailId, IsDeleted: false },
      include: {
        subjects: {
          include: {
            subject: true,
          },
        },
        qualification: true,
        board: true,
        student: true,
      },
    });
    if (!detail) {
      throw new NotFoundException(`Student Academic Detail with ID ${academicDetailId} not found`);
    }
    return detail;
  }

  async findByStudent(studentId: number) {
    return this.prisma.studentAcademicDetail.findMany({
      where: { studentId, IsDeleted: false },
      include: {
        subjects: {
          include: {
            subject: true,
          },
        },
        qualification: true,
        board: true,
      },
      orderBy: { qualificationId: 'asc' },
    });
  }

  async update(academicDetailId: number, data: any) {
    // Verify it exists
    await this.findOne(academicDetailId);

    // Update qualification record details
    return this.prisma.studentAcademicDetail.update({
      where: { academicDetailId },
      data: {
        qualificationId: data.qualificationId ? Number(data.qualificationId) : undefined,
        boardId: data.boardId ? Number(data.boardId) : undefined,
        schoolName: data.schoolName,
        passingYear: data.passingYear ? Number(data.passingYear) : undefined,
        rollNo: data.rollNo,
        resultStatus: data.resultStatus,
        marksType: data.marksType,
        maxMarks: data.maxMarks ? Number(data.maxMarks) : undefined,
        obtainedMarks: data.obtainedMarks ? Number(data.obtainedMarks) : undefined,
        percentage: data.percentage ? Number(data.percentage) : undefined,
        division: data.division,
        grade: data.grade,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
      },
      include: {
        subjects: {
          include: {
            subject: true,
          },
        },
        qualification: true,
        board: true,
      },
    });
  }

  async softDelete(academicDetailId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(academicDetailId);

    return this.prisma.studentAcademicDetail.update({
      where: { academicDetailId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const result = await this.prisma.studentAcademicDetail.updateMany({
      where: {
        academicDetailId: { in: ids },
        IsDeleted: false,
      },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });

    return {
      message: `Successfully soft-deleted ${result.count} academic qualification(s)`,
      count: result.count,
    };
  }
}
