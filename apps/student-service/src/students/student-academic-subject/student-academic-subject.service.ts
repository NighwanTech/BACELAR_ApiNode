import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class StudentAcademicSubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.studentAcademicSubject.create({
      data: {
        academicDetailId: Number(data.academicDetailId),
        subjectId: Number(data.subjectId),
        maxMarks: Number(data.maxMarks),
        minMarks: Number(data.minMarks ?? 33),
        obtainedMarks: Number(data.obtainedMarks),
        grade: data.grade || null,
        practicalMarks: data.practicalMarks ? Number(data.practicalMarks) : null,
        theoryMarks: data.theoryMarks ? Number(data.theoryMarks) : null,
        isOptional: !!data.isOptional,
        CreatedBy: data.CreatedBy,
        IsActive: true,
        IsDeleted: false,
      },
      include: {
        subject: true,
        academicDetail: true,
      },
    });
  }

  async findAll() {
    return this.prisma.studentAcademicSubject.findMany({
      where: { IsDeleted: false },
      include: {
        subject: true,
        academicDetail: true,
      },
      orderBy: { CreatedOn: 'desc' },
    });
  }

  async findOne(studentAcademicSubjectId: number) {
    const subjectMark = await this.prisma.studentAcademicSubject.findFirst({
      where: { studentAcademicSubjectId, IsDeleted: false },
      include: {
        subject: true,
        academicDetail: true,
      },
    });
    if (!subjectMark) {
      throw new NotFoundException(`Student Academic Subject Mark with ID ${studentAcademicSubjectId} not found`);
    }
    return subjectMark;
  }

  async findByAcademicDetail(academicDetailId: number) {
    return this.prisma.studentAcademicSubject.findMany({
      where: { academicDetailId, IsDeleted: false },
      include: {
        subject: true,
      },
      orderBy: { subjectId: 'asc' },
    });
  }

  async update(studentAcademicSubjectId: number, data: any) {
    await this.findOne(studentAcademicSubjectId);

    return this.prisma.studentAcademicSubject.update({
      where: { studentAcademicSubjectId },
      data: {
        academicDetailId: data.academicDetailId ? Number(data.academicDetailId) : undefined,
        subjectId: data.subjectId ? Number(data.subjectId) : undefined,
        maxMarks: data.maxMarks ? Number(data.maxMarks) : undefined,
        minMarks: data.minMarks ? Number(data.minMarks) : undefined,
        obtainedMarks: data.obtainedMarks ? Number(data.obtainedMarks) : undefined,
        grade: data.grade,
        practicalMarks: data.practicalMarks ? Number(data.practicalMarks) : null,
        theoryMarks: data.theoryMarks ? Number(data.theoryMarks) : null,
        isOptional: data.isOptional !== undefined ? !!data.isOptional : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
      },
      include: {
        subject: true,
      },
    });
  }

  async softDelete(studentAcademicSubjectId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(studentAcademicSubjectId);

    return this.prisma.studentAcademicSubject.update({
      where: { studentAcademicSubjectId },
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
    const result = await this.prisma.studentAcademicSubject.updateMany({
      where: {
        studentAcademicSubjectId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} subject mark record(s)`,
      count: result.count,
    };
  }
}
