import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../common/active-only';

@Injectable()
export class PromotionService {
  constructor(private readonly prisma: PrismaService) {}

  private promotionDb() {
    const db = (this.prisma as any).promotion;
    if (!db) {
      throw new BadRequestException(
        'Prisma model promotion is missing. Run npm run prisma:generate and restart exam-result-service.',
      );
    }
    return db;
  }

  private detailDb() {
    const db = (this.prisma as any).promotionDetail;
    if (!db) {
      throw new BadRequestException(
        'Prisma model promotionDetail is missing. Run npm run prisma:generate and restart exam-result-service.',
      );
    }
    return db;
  }

  private examResultDb() {
    const db = (this.prisma as any).examResult;
    if (!db) {
      throw new BadRequestException('Prisma model examResult is missing.');
    }
    return db;
  }

  private toNum(value: any): number | null {
    if (value === undefined || value === null || value === '') return null;
    const n = Number(value);
    return Number.isNaN(n) ? null : n;
  }

  private requireNum(value: any, field: string): number {
    const n = this.toNum(value);
    if (n === null) throw new BadRequestException(`${field} is required`);
    return n;
  }

  /**
   * Search students from ExamResult for Promote From filters (student-wise).
   */
  async searchCandidates(filters: {
    sessionIdFrom?: number;
    yearIdFrom?: number;
    semIdFrom?: number;
    courseCategoryIdFrom?: number;
    courseIdFrom?: number;
    subjectIdFrom?: number;
  }) {
    const sessionIdFrom = this.requireNum(filters.sessionIdFrom, 'sessionIdFrom');
    const yearIdFrom = this.requireNum(filters.yearIdFrom, 'yearIdFrom');
    const courseCategoryIdFrom = this.requireNum(
      filters.courseCategoryIdFrom,
      'courseCategoryIdFrom',
    );
    const courseIdFrom = this.requireNum(filters.courseIdFrom, 'courseIdFrom');
    const semIdFrom = this.toNum(filters.semIdFrom);

    const where: Record<string, any> = {
      IsDeleted: false,
      IsActive: true,
      academicSessionId: sessionIdFrom,
      yearId: yearIdFrom,
      programCategoryId: courseCategoryIdFrom,
      programId: courseIdFrom,
    };
    if (semIdFrom !== null) where.semId = semIdFrom;

    const rows = await this.examResultDb().findMany({
      where,
      orderBy: [{ rollNo: 'asc' }, { studentId: 'asc' }, { examResultId: 'asc' }],
      select: {
        studentId: true,
        enrolmentNo: true,
        rollNo: true,
        studentName: true,
        fatherName: true,
        examTypeName: true,
        result: true,
      },
    });

    const byStudent = new Map<number, any>();
    for (const row of rows) {
      const sid = Number(row.studentId);
      if (!sid) continue;
      if (!byStudent.has(sid)) {
        byStudent.set(sid, {
          studentId: sid,
          rollNo: row.rollNo || null,
          enrollmentNo: row.enrolmentNo || null,
          studentName: row.studentName || null,
          fatherName: row.fatherName || null,
          examMode: row.examTypeName || null,
          examResult: row.result || null,
        });
      } else {
        const cur = byStudent.get(sid);
        if (!cur.examResult && row.result) cur.examResult = row.result;
        if (!cur.examMode && row.examTypeName) cur.examMode = row.examTypeName;
        if (!cur.rollNo && row.rollNo) cur.rollNo = row.rollNo;
        if (!cur.enrollmentNo && row.enrolmentNo) cur.enrollmentNo = row.enrolmentNo;
      }
    }

    const studentIds = [...byStudent.keys()];
    if (!studentIds.length) return [];

    // Soft-deleted / missing students must not appear in promotion search
    const students = await this.prisma.student.findMany({
      where: {
        StudentRegistrationId: { in: studentIds },
        IsDeleted: false,
        IsActive: true,
      },
      select: {
        StudentRegistrationId: true,
        registrationNo: true,
        candidateName: true,
        fatherName: true,
      },
    });
    const studentMap = new Map(students.map((s) => [s.StudentRegistrationId, s]));
    const activeStudentIds = studentIds.filter((sid) => studentMap.has(sid));
    if (!activeStudentIds.length) return [];

    const alreadyPromoted = await this.detailDb().findMany({
      where: {
        IsDeleted: false,
        isPromoted: true,
        studentId: { in: activeStudentIds },
        promotion: {
          IsDeleted: false,
          sessionIdFrom,
          yearIdFrom,
          courseCategoryIdFrom,
          courseIdFrom,
          ...(semIdFrom !== null ? { semIdFrom } : {}),
        },
      },
      select: { studentId: true },
    });
    const promotedSet = new Set(alreadyPromoted.map((d: any) => Number(d.studentId)));

    return activeStudentIds.map((sid, index) => {
      const agg = byStudent.get(sid);
      const st = studentMap.get(sid);
      const isPromoted = promotedSet.has(sid);
      return {
        srNo: index + 1,
        studentId: sid,
        regNo: st?.registrationNo || null,
        enrollmentNo: agg.enrollmentNo,
        rollNo: agg.rollNo,
        studentName: agg.studentName || st?.candidateName || null,
        fatherName: agg.fatherName || st?.fatherName || null,
        examMode: agg.examMode,
        examResult: agg.examResult,
        isPromoted,
        status: isPromoted ? 'PROMOTED' : 'PENDING',
      };
    });
  }

  async save(data: any) {
    const sessionIdFrom = this.requireNum(data.sessionIdFrom, 'sessionIdFrom');
    const yearIdFrom = this.requireNum(data.yearIdFrom, 'yearIdFrom');
    const courseCategoryIdFrom = this.requireNum(
      data.courseCategoryIdFrom,
      'courseCategoryIdFrom',
    );
    const courseIdFrom = this.requireNum(data.courseIdFrom, 'courseIdFrom');
    const semIdFrom = this.toNum(data.semIdFrom);
    const subjectIdFrom = this.toNum(data.subjectIdFrom);

    const sessionIdTo = this.requireNum(data.sessionIdTo, 'sessionIdTo');
    const yearIdTo = this.requireNum(data.yearIdTo, 'yearIdTo');
    const courseCategoryIdTo = this.requireNum(data.courseCategoryIdTo, 'courseCategoryIdTo');
    const courseIdTo = this.requireNum(data.courseIdTo, 'courseIdTo');
    const semIdTo = this.toNum(data.semIdTo);
    const subjectIdTo = this.toNum(data.subjectIdTo);

    const createdBy = String(data.CreatedBy || '').trim();
    if (!createdBy) throw new BadRequestException('CreatedBy is required');

    const studentsInput: any[] = Array.isArray(data.students) ? data.students : [];
    const selected = studentsInput.filter(
      (s) => s && (s.isPromoted === undefined || s.isPromoted === true || s.isPromoted === 1),
    );
    if (!selected.length) {
      throw new BadRequestException('Select at least one student to promote');
    }

    // Validate masters exist
    const [sessionFrom, sessionTo, yearFrom, yearTo, courseFrom, courseTo] = await Promise.all([
      this.prisma.academicSession.findFirst({
        where: { academicSessionId: sessionIdFrom, IsDeleted: false },
      }),
      this.prisma.academicSession.findFirst({
        where: { academicSessionId: sessionIdTo, IsDeleted: false },
      }),
      this.prisma.yearMaster.findFirst({ where: { yearId: yearIdFrom, IsDeleted: false } }),
      this.prisma.yearMaster.findFirst({ where: { yearId: yearIdTo, IsDeleted: false } }),
      this.prisma.program.findFirst({ where: { programId: courseIdFrom, IsDeleted: false } }),
      this.prisma.program.findFirst({ where: { programId: courseIdTo, IsDeleted: false } }),
    ]);
    if (!sessionFrom) throw new NotFoundException('Promote From academic session not found');
    if (!sessionTo) throw new NotFoundException('Promote To academic session not found');
    if (!yearFrom) throw new NotFoundException('Promote From year not found');
    if (!yearTo) throw new NotFoundException('Promote To year not found');
    if (!courseFrom) throw new NotFoundException('Promote From course not found');
    if (!courseTo) throw new NotFoundException('Promote To course not found');

    const studentIds = selected.map((s) => this.requireNum(s.studentId, 'students.studentId'));
    const uniqueIds = [...new Set(studentIds)];
    if (uniqueIds.length !== studentIds.length) {
      throw new BadRequestException('Duplicate studentId in students list');
    }

    const existingDetails = await this.detailDb().findMany({
      where: {
        IsDeleted: false,
        isPromoted: true,
        studentId: { in: uniqueIds },
        promotion: {
          IsDeleted: false,
          sessionIdFrom,
          yearIdFrom,
          courseCategoryIdFrom,
          courseIdFrom,
          ...(semIdFrom !== null ? { semIdFrom } : {}),
        },
      },
      select: { studentId: true, rollNo: true },
    });
    if (existingDetails.length) {
      const ids = existingDetails.map((d: any) => d.studentId).join(', ');
      throw new ConflictException(
        `Some students are already promoted for this From criteria (studentId: ${ids})`,
      );
    }

    const dbStudents = await this.prisma.student.findMany({
      where: {
        StudentRegistrationId: { in: uniqueIds },
        IsDeleted: false,
        IsActive: true,
      },
      select: {
        StudentRegistrationId: true,
        registrationNo: true,
      },
    });
    const dbMap = new Map(dbStudents.map((s) => [s.StudentRegistrationId, s]));
    for (const id of uniqueIds) {
      if (!dbMap.has(id)) {
        throw new NotFoundException(
          `Student ${id} not found or is deleted. Soft-deleted students cannot be promoted.`,
        );
      }
    }

    const result = await this.prisma.$transaction(async (tx: any) => {
      const promotion = await tx.promotion.create({
        data: {
          sessionIdFrom,
          yearIdFrom,
          semIdFrom,
          courseCategoryIdFrom,
          courseIdFrom,
          subjectIdFrom,
          sessionIdTo,
          yearIdTo,
          semIdTo,
          courseCategoryIdTo,
          courseIdTo,
          subjectIdTo,
          CreatedBy: createdBy,
          Remarks: data.Remarks || null,
        },
      });

      const detailRows = selected.map((s) => {
        const sid = Number(s.studentId);
        const st = dbMap.get(sid);
        return {
          promotionId: promotion.promotionId,
          studentId: sid,
          regNo: s.regNo || st?.registrationNo || null,
          enrollmentNo: s.enrollmentNo || s.enrolmentNo || null,
          rollNo: s.rollNo || null,
          examMode: s.examMode || null,
          examResult: s.examResult || null,
          isPromoted: true,
          CreatedBy: createdBy,
        };
      });

      await tx.promotionDetail.createMany({ data: detailRows });

      // Update student current session / year / semester / program
      await tx.student.updateMany({
        where: { StudentRegistrationId: { in: uniqueIds }, IsDeleted: false },
        data: {
          academicSessionId: sessionIdTo,
          yearId: yearIdTo,
          semId: semIdTo,
          programId: courseIdTo,
          UpdatedBy: createdBy,
        },
      });

      return tx.promotion.findFirst({
        where: { promotionId: promotion.promotionId },
        include: {
          details: { where: { IsDeleted: false } },
          sessionFrom: { select: { academicSessionId: true, academicSessionName: true } },
          sessionTo: { select: { academicSessionId: true, academicSessionName: true } },
          yearFrom: { select: { yearId: true, yearName: true } },
          yearTo: { select: { yearId: true, yearName: true } },
          semFrom: { select: { semId: true, semesterName: true } },
          semTo: { select: { semId: true, semesterName: true } },
          courseFrom: { select: { programId: true, programName: true, programShortName: true } },
          courseTo: { select: { programId: true, programName: true, programShortName: true } },
          courseCategoryFrom: {
            select: { programCategoryId: true, programCategoryName: true },
          },
          courseCategoryTo: {
            select: { programCategoryId: true, programCategoryName: true },
          },
        },
      });
    });

    return {
      success: true,
      message: `Promoted ${uniqueIds.length} student(s) successfully`,
      data: result,
    };
  }

  async findAll(filters: {
    sessionIdFrom?: number;
    yearIdFrom?: number;
    semIdFrom?: number;
    courseIdFrom?: number;
    sessionIdTo?: number;
    activeOnly?: boolean | string;
  } = {}) {
    const where: Record<string, any> = { IsDeleted: false };
    if (isActiveOnly(filters.activeOnly)) where.IsActive = true;

    const sessionIdFrom = this.toNum(filters.sessionIdFrom);
    const yearIdFrom = this.toNum(filters.yearIdFrom);
    const semIdFrom = this.toNum(filters.semIdFrom);
    const courseIdFrom = this.toNum(filters.courseIdFrom);
    const sessionIdTo = this.toNum(filters.sessionIdTo);
    if (sessionIdFrom !== null) where.sessionIdFrom = sessionIdFrom;
    if (yearIdFrom !== null) where.yearIdFrom = yearIdFrom;
    if (semIdFrom !== null) where.semIdFrom = semIdFrom;
    if (courseIdFrom !== null) where.courseIdFrom = courseIdFrom;
    if (sessionIdTo !== null) where.sessionIdTo = sessionIdTo;

    return this.promotionDb().findMany({
      where,
      orderBy: [{ CreatedOn: 'desc' }, { promotionId: 'desc' }],
      include: {
        details: { where: { IsDeleted: false } },
        sessionFrom: { select: { academicSessionId: true, academicSessionName: true } },
        sessionTo: { select: { academicSessionId: true, academicSessionName: true } },
        yearFrom: { select: { yearId: true, yearName: true } },
        yearTo: { select: { yearId: true, yearName: true } },
        semFrom: { select: { semId: true, semesterName: true } },
        semTo: { select: { semId: true, semesterName: true } },
        courseFrom: { select: { programId: true, programName: true } },
        courseTo: { select: { programId: true, programName: true } },
      },
    });
  }

  async findOne(promotionId: number) {
    const row = await this.promotionDb().findFirst({
      where: { promotionId, IsDeleted: false },
      include: {
        details: { where: { IsDeleted: false } },
        sessionFrom: true,
        sessionTo: true,
        yearFrom: true,
        yearTo: true,
        semFrom: true,
        semTo: true,
        courseFrom: true,
        courseTo: true,
        courseCategoryFrom: true,
        courseCategoryTo: true,
        subjectFrom: true,
        subjectTo: true,
      },
    });
    if (!row) throw new NotFoundException(`Promotion ${promotionId} not found`);
    return row;
  }

  async softDelete(promotionId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(promotionId);
    if (!DeletedBy) throw new BadRequestException('DeletedBy is required');

    await this.detailDb().updateMany({
      where: { promotionId, IsDeleted: false },
      data: {
        IsDeleted: true,
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
        DeletedOn: new Date(),
        IsActive: false,
      },
    });

    return this.promotionDb().update({
      where: { promotionId },
      data: {
        IsDeleted: true,
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
        DeletedOn: new Date(),
        IsActive: false,
      },
    });
  }
}
