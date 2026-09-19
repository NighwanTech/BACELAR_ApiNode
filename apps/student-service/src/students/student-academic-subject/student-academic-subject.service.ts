import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { computeAcademicResult } from '../student-academic/student-academic.service';

@Injectable()
export class StudentAcademicSubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const maxMarks = Number(data.maxMarks);
    const obtainedMarks = Number(data.obtainedMarks);
    const computed = computeAcademicResult({ maxMarks, obtainedMarks });
    return this.prisma.studentAcademicSubject.create({
      data: {
        academicDetailId: Number(data.academicDetailId),
        subjectId: Number(data.subjectId),
        maxMarks,
        minMarks: Number(data.minMarks ?? 33),
        obtainedMarks,
        grade: data.grade || computed.grade,
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
    const existing = await this.findOne(studentAcademicSubjectId);
    const maxMarks =
      data.maxMarks !== undefined ? Number(data.maxMarks) : Number(existing.maxMarks);
    const obtainedMarks =
      data.obtainedMarks !== undefined
        ? Number(data.obtainedMarks)
        : Number(existing.obtainedMarks);
    const computed = computeAcademicResult({ maxMarks, obtainedMarks });

    return this.prisma.studentAcademicSubject.update({
      where: { studentAcademicSubjectId },
      data: {
        academicDetailId: data.academicDetailId ? Number(data.academicDetailId) : undefined,
        subjectId: data.subjectId ? Number(data.subjectId) : undefined,
        maxMarks: data.maxMarks !== undefined ? maxMarks : undefined,
        minMarks: data.minMarks !== undefined ? Number(data.minMarks) : undefined,
        obtainedMarks: data.obtainedMarks !== undefined ? obtainedMarks : undefined,
        grade:
          data.grade !== undefined && data.grade !== null && data.grade !== ''
            ? data.grade
            : computed.grade,
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
