import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../common/active-only';

@Injectable()
export class ExamResultService {
  constructor(private readonly prisma: PrismaService) {}

  private examResultDb() {
    return (this.prisma as any).examResult;
  }

  private toNum(value: any): number | null {
    if (value === undefined || value === null || value === '') return null;
    const n = Number(value);
    return Number.isNaN(n) ? null : n;
  }

  private toDate(value: any): Date | null {
    if (!value) return null;
    const d = value instanceof Date ? value : new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  private async snapshotStudent(studentId: number) {
    const student = await this.prisma.student.findFirst({
      where: { StudentRegistrationId: studentId, IsDeleted: false },
      include: {
        studentProfile: true,
        studentEnrollments: {
          where: { IsDeleted: false },
          orderBy: { enrollmentId: 'desc' },
          take: 1,
        },
        studentRollNumbers: {
          where: { IsDeleted: false },
          orderBy: { rollId: 'desc' },
          take: 1,
        },
      },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }
    const profile = student.studentProfile;
    const enrollment = student.studentEnrollments?.[0];
    const roll = student.studentRollNumbers?.[0];
    return {
      studentId,
      enrolmentNo: enrollment?.enrollmentNo || student.registrationNo || null,
      rollNo: roll?.rollNo || null,
      studentName: student.candidateName || null,
      fatherName: student.fatherName || null,
      motherName: profile?.motherName || enrollment?.motherName || null,
      gender: profile?.gender || enrollment?.gender || null,
      castCategory: profile?.category || null,
      dob: profile?.dateOfBirth || enrollment?.dateOfBirth || null,
      mobileNo: student.mobileNo || null,
      fatherMobileNo: profile?.fatherMobileNumber || enrollment?.fatherMobNo || null,
      emailId: student.email || enrollment?.emailId || null,
    };
  }

  private async snapshotMasters(data: any) {
    const snapshot: Record<string, any> = {};

    if (data.academicSessionId) {
      const session = await this.prisma.academicSession.findFirst({
        where: { academicSessionId: Number(data.academicSessionId), IsDeleted: false },
      });
      if (!session) {
        throw new NotFoundException(`Academic session with ID ${data.academicSessionId} not found`);
      }
      snapshot.academicSessionId = session.academicSessionId;
      snapshot.sessionalName = session.academicSessionName;
    }

    if (data.examinationDetailId) {
      const exam = await this.prisma.examinationDetails.findFirst({
        where: { examinationId: Number(data.examinationDetailId), IsDeleted: false },
      });
      if (!exam) {
        throw new NotFoundException(`Examination with ID ${data.examinationDetailId} not found`);
      }
      snapshot.examinationDetailId = exam.examinationId;
      snapshot.examinationName = exam.examinationName;
    }

    if (data.yearId) {
      const year = await this.prisma.yearMaster.findFirst({
        where: { yearId: Number(data.yearId), IsDeleted: false },
      });
      if (!year) {
        throw new NotFoundException(`Year with ID ${data.yearId} not found`);
      }
      snapshot.yearId = year.yearId;
      snapshot.yearName = year.yearName;
    }

    if (data.semId) {
      const sem = await this.prisma.semesterMaster.findFirst({
        where: { semId: Number(data.semId), IsDeleted: false },
      });
      if (!sem) {
        throw new NotFoundException(`Semester with ID ${data.semId} not found`);
      }
      snapshot.semId = sem.semId;
      snapshot.semesterName = sem.semesterName;
    }

    if (data.programId) {
      const program = await this.prisma.program.findFirst({
        where: { programId: Number(data.programId), IsDeleted: false },
        include: { programCategory: true },
      });
      if (!program) {
        throw new NotFoundException(`Program with ID ${data.programId} not found`);
      }
      snapshot.programId = program.programId;
      snapshot.programName = program.programName;
      snapshot.programCategoryId = program.programCategoryId;
      snapshot.programCategoryName = program.programCategory?.programCategoryName || null;
    } else if (data.programCategoryId) {
      const category = await this.prisma.programCategory.findFirst({
        where: { programCategoryId: Number(data.programCategoryId), IsDeleted: false },
      });
      if (!category) {
        throw new NotFoundException(`Program category with ID ${data.programCategoryId} not found`);
      }
      snapshot.programCategoryId = category.programCategoryId;
      snapshot.programCategoryName = category.programCategoryName;
    }

    if (data.examTypeId) {
      const examType = await this.prisma.examTypeMaster.findFirst({
        where: { examTypeId: Number(data.examTypeId), IsDeleted: false },
      });
      if (!examType) {
        throw new NotFoundException(`Exam type with ID ${data.examTypeId} not found`);
      }
      snapshot.examTypeId = examType.examTypeId;
      snapshot.examTypeName = examType.examTypeName;
    }

    if (data.paperId) {
      const paper = await this.prisma.paperDetailMaster.findFirst({
        where: { paperId: Number(data.paperId), IsDeleted: false },
      });
      if (!paper) {
        throw new NotFoundException(`Paper with ID ${data.paperId} not found`);
      }
      snapshot.paperId = paper.paperId;
      snapshot.paperCode = paper.paperCode;
      snapshot.subjectName = paper.subjectName;
      snapshot.paperName = paper.paperName;
      snapshot.paperType = paper.paperType;
      snapshot.totalMax = paper.totalMarksMax;
      snapshot.totalMin = paper.totalMarksMin;
      snapshot.theoryExternalMax = paper.theoryMarksMax;
      snapshot.theoryExternalMin = paper.theoryMarksMin;
      snapshot.sessionalInternalMax = paper.sessionalMarksMax;
      snapshot.sessionalInternalMin = paper.sessionalMarksMin;
      snapshot.practicalMax = paper.externalPracticalMarksMax ?? paper.internalPracticalMarksMax;
      snapshot.practicalMin = paper.externalPracticalMarksMin ?? paper.internalPracticalMarksMin;
      snapshot.creditMax = paper.creditMax;
    }

    return snapshot;
  }

  private buildPayload(data: any, extras: Record<string, any> = {}) {
    return {
      academicSessionId: this.toNum(data.academicSessionId),
      sessionalName: data.sessionalName ?? extras.sessionalName ?? null,
      examinationDetailId: this.toNum(data.examinationDetailId),
      examinationName: data.examinationName ?? extras.examinationName ?? null,
      yearId: this.toNum(data.yearId),
      yearName: data.yearName ?? extras.yearName ?? null,
      semId: this.toNum(data.semId),
      semesterName: data.semesterName ?? extras.semesterName ?? null,
      programCategoryId: this.toNum(data.programCategoryId) ?? extras.programCategoryId ?? null,
      programCategoryName: data.programCategoryName ?? extras.programCategoryName ?? null,
      programId: this.toNum(data.programId),
      programName: data.programName ?? extras.programName ?? null,
      examTypeId: this.toNum(data.examTypeId),
      examTypeName: data.examTypeName ?? extras.examTypeName ?? null,
      studentId: Number(data.studentId),
      enrolmentNo: data.enrolmentNo ?? extras.enrolmentNo ?? null,
      rollNo: data.rollNo ?? extras.rollNo ?? null,
      studentName: data.studentName ?? extras.studentName ?? null,
      fatherName: data.fatherName ?? extras.fatherName ?? null,
      motherName: data.motherName ?? extras.motherName ?? null,
      gender: data.gender ?? extras.gender ?? null,
      castCategory: data.castCategory ?? extras.castCategory ?? null,
      dob: this.toDate(data.dob) ?? extras.dob ?? null,
      mobileNo: data.mobileNo ?? extras.mobileNo ?? null,
      fatherMobileNo: data.fatherMobileNo ?? extras.fatherMobileNo ?? null,
      emailId: data.emailId ?? extras.emailId ?? null,
      paperId: this.toNum(data.paperId),
      paperCode: data.paperCode ?? extras.paperCode ?? null,
      subjectName: data.subjectName ?? extras.subjectName ?? null,
      paperName: data.paperName ?? extras.paperName ?? null,
      paperType: data.paperType ?? extras.paperType ?? null,
      totalMax: this.toNum(data.totalMax) ?? extras.totalMax ?? null,
      totalMin: this.toNum(data.totalMin) ?? extras.totalMin ?? null,
      theoryExternalMax: this.toNum(data.theoryExternalMax) ?? extras.theoryExternalMax ?? null,
      theoryExternalMin: this.toNum(data.theoryExternalMin) ?? extras.theoryExternalMin ?? null,
      theoryExternalObt: this.toNum(data.theoryExternalObt),
      sessionalInternalMax: this.toNum(data.sessionalInternalMax) ?? extras.sessionalInternalMax ?? null,
      sessionalInternalMin: this.toNum(data.sessionalInternalMin) ?? extras.sessionalInternalMin ?? null,
      sessionalInternalObt: this.toNum(data.sessionalInternalObt),
      practicalMax: this.toNum(data.practicalMax) ?? extras.practicalMax ?? null,
      practicalMin: this.toNum(data.practicalMin) ?? extras.practicalMin ?? null,
      practicalObt: this.toNum(data.practicalObt),
      creditMax: this.toNum(data.creditMax) ?? extras.creditMax ?? null,
      creditObt: this.toNum(data.creditObt),
      totalMarks: this.toNum(data.totalMarks),
      percentage: this.toNum(data.percentage),
      grade: data.grade ?? null,
      gradePoint: this.toNum(data.gradePoint),
      sgpa: this.toNum(data.sgpa),
      ygpa: this.toNum(data.ygpa),
      cgpa: this.toNum(data.cgpa),
      resultDeclareDate: this.toDate(data.resultDeclareDate),
      result: data.result ?? null,
      Remarks: data.Remarks ?? null,
    };
  }

  async create(data: any) {
    if (!data?.studentId) {
      throw new NotFoundException('studentId is required');
    }

    const studentSnap = await this.snapshotStudent(Number(data.studentId));
    const masterSnap = await this.snapshotMasters(data);
    const extras = { ...studentSnap, ...masterSnap };
    const payload = this.buildPayload(data, extras);

    const existing = await this.examResultDb().findFirst({
      where: {
        academicSessionId: payload.academicSessionId,
        examinationDetailId: payload.examinationDetailId,
        programId: payload.programId,
        yearId: payload.yearId,
        semId: payload.semId,
        paperId: payload.paperId,
        studentId: payload.studentId,
        IsDeleted: false,
      },
    });
    if (existing) {
      throw new ConflictException('Exam result already exists for this student and paper');
    }

    return this.examResultDb().create({
      data: {
        ...payload,
        CreatedBy: data.CreatedBy,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(filters: any = {}) {
    const where: Record<string, any> = { IsDeleted: false };
    if (isActiveOnly(filters.activeOnly)) {
      where.IsActive = true;
    }
    const idFilters = [
      'academicSessionId',
      'examinationDetailId',
      'programId',
      'programCategoryId',
      'yearId',
      'semId',
      'examTypeId',
      'studentId',
      'paperId',
    ];
    for (const key of idFilters) {
      if (filters[key] !== undefined && filters[key] !== null && String(filters[key]).trim() !== '') {
        where[key] = Number(filters[key]);
      }
    }
    if (filters.enrolmentNo) {
      where.enrolmentNo = String(filters.enrolmentNo).trim();
    }
    if (filters.rollNo) {
      where.rollNo = String(filters.rollNo).trim();
    }

    return this.examResultDb().findMany({
      where,
      orderBy: [{ studentName: 'asc' }, { paperCode: 'asc' }, { examResultId: 'asc' }],
    });
  }

  async findOne(examResultId: number) {
    const record = await this.examResultDb().findFirst({
      where: { examResultId, IsDeleted: false },
    });
    if (!record) {
      throw new NotFoundException(`Exam result with ID ${examResultId} not found`);
    }
    return record;
  }

  async findByStudent(studentId: number, filters: any = {}) {
    return this.findAll({ ...filters, studentId });
  }

  async update(examResultId: number, data: any) {
    await this.findOne(examResultId);

    const existing = await this.examResultDb().findFirst({
      where: { examResultId },
    });

    const studentSnap = data.studentId
      ? await this.snapshotStudent(Number(data.studentId))
      : {};
    const masterSnap = await this.snapshotMasters({
      academicSessionId: data.academicSessionId ?? existing.academicSessionId,
      examinationDetailId: data.examinationDetailId ?? existing.examinationDetailId,
      yearId: data.yearId ?? existing.yearId,
      semId: data.semId ?? existing.semId,
      programId: data.programId ?? existing.programId,
      programCategoryId: data.programCategoryId ?? existing.programCategoryId,
      examTypeId: data.examTypeId ?? existing.examTypeId,
      paperId: data.paperId ?? existing.paperId,
    });

    const merged = {
      ...existing,
      ...data,
      studentId: data.studentId ?? existing.studentId,
    };
    const payload = this.buildPayload(merged, { ...studentSnap, ...masterSnap });

    return this.examResultDb().update({
      where: { examResultId },
      data: {
        ...payload,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive !== undefined ? data.IsActive : existing.IsActive,
        Remarks: data.Remarks !== undefined ? data.Remarks : existing.Remarks,
      },
    });
  }

  async updateStatus(examResultId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(examResultId);
    return this.examResultDb().update({
      where: { examResultId },
      data: { IsActive, UpdatedBy },
    });
  }

  async softDelete(examResultId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(examResultId);
    return this.examResultDb().update({
      where: { examResultId },
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
    const result = await this.examResultDb().updateMany({
      where: {
        examResultId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} exam result(s)`,
      count: result.count,
    };
  }
}
