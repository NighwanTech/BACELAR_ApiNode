import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { resolveFirstYearAndSemester } from '../resolve-first-year-semester';

/** Compute percentage / grade / division for DB columns (best done on backend). */
export function computeAcademicResult(input: {
  marksType?: string | null;
  maxMarks?: number | null;
  obtainedMarks?: number | null;
  percentage?: number | null;
}) {
  const marksType = String(input.marksType || 'Percentage').toUpperCase();
  const max = Number(input.maxMarks);
  const obtained = Number(input.obtainedMarks);
  let percentage =
    input.percentage !== undefined && input.percentage !== null
      ? Number(input.percentage)
      : NaN;

  if (!Number.isFinite(percentage)) {
    if (marksType.includes('CGPA')) {
      // treat obtained as CGPA on scale max (usually 10)
      percentage =
        Number.isFinite(obtained) && Number.isFinite(max) && max > 0
          ? (obtained / max) * 100
          : Number.isFinite(obtained)
            ? obtained * 10
            : 0;
    } else if (Number.isFinite(obtained) && Number.isFinite(max) && max > 0) {
      percentage = (obtained / max) * 100;
    } else {
      percentage = 0;
    }
  }

  percentage = Math.round(percentage * 100) / 100;

  let grade = 'F';
  if (percentage >= 90) grade = 'A+';
  else if (percentage >= 80) grade = 'A';
  else if (percentage >= 70) grade = 'B+';
  else if (percentage >= 60) grade = 'B';
  else if (percentage >= 50) grade = 'C';
  else if (percentage >= 40) grade = 'D';
  else if (percentage >= 33) grade = 'E';

  let division = 'Fail';
  if (percentage >= 60) division = 'First';
  else if (percentage >= 45) division = 'Second';
  else if (percentage >= 33) division = 'Third';

  return { percentage, grade, division };
}

@Injectable()
export class StudentAcademicService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Save (overwrite) all academic qualifications and their subjects for a student.
   * Also stores selected programId and auto-assigns active admissionSessionId on Student.
   */
  async save(
    studentId: number,
    qualifications: any[],
    CreatedBy: string,
    programId: number,
    programSubjectIds?: number[],
    hasSportCertificate?: boolean,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const student = await tx.student.findFirst({
        where: { StudentRegistrationId: Number(studentId), IsDeleted: false },
      });
      if (!student) {
        throw new NotFoundException(`Student with ID ${studentId} not found`);
      }

      if (programId === undefined || programId === null) {
        throw new BadRequestException('programId is required');
      }

      const program = await tx.program.findFirst({
        where: { programId: Number(programId), IsDeleted: false },
      });
      if (!program) {
        throw new NotFoundException(`Program with ID ${programId} not found`);
      }

      const activeSession = await tx.admissionSession.findFirst({
        where: { IsActive: true, IsDeleted: false },
        orderBy: { CreatedOn: 'desc' },
      });
      if (!activeSession) {
        throw new NotFoundException(
          'No active admission session found. Please activate a session in masters.',
        );
      }

      const assignedProgramId = program.programId;
      const assignedAdmissionSessionId = activeSession.admissionSessionId;
      const assignedAdmissionSessionName = activeSession.admissionSessionName;

      // Sport certificate applies only to B.P.Ed. (programCode "6"); otherwise always false
      const isBped = String(program.programCode || '').trim() === '6';
      const sportFlag = isBped ? Boolean(hasSportCertificate) : false;

      // First academic save → Year 1 + Sem 1. Later promote keeps existing values.
      let assignedYearId = student.yearId ?? null;
      let assignedSemId = student.semId ?? null;
      let assignedYearName: string | null = null;
      let assignedSemesterName: string | null = null;

      if (!assignedYearId || !assignedSemId) {
        const first = await resolveFirstYearAndSemester(tx);
        assignedYearId = assignedYearId || first.yearId;
        assignedSemId = assignedSemId || first.semId;
        assignedYearName = first.yearName;
        assignedSemesterName = first.semesterName;
      } else {
        const [y, s] = await Promise.all([
          tx.yearMaster.findFirst({
            where: { yearId: assignedYearId, IsDeleted: false },
          }),
          tx.semesterMaster.findFirst({
            where: { semId: assignedSemId, IsDeleted: false },
          }),
        ]);
        assignedYearName = y?.yearName ?? null;
        assignedSemesterName = s?.semesterName ?? null;
      }

      await tx.student.update({
        where: { StudentRegistrationId: Number(studentId) },
        data: {
          programId: assignedProgramId,
          admissionSessionId: assignedAdmissionSessionId,
          yearId: assignedYearId,
          semId: assignedSemId,
          hasSportCertificate: sportFlag,
          UpdatedBy: CreatedBy || 'System',
        },
      });

      // 1. Delete existing academic details for this student (cascades to subjects)
      await tx.studentAcademicDetail.deleteMany({
        where: { studentId: Number(studentId) },
      });

      // 2. Insert new academic details
      const createdDetails = [];
      for (const qual of qualifications) {
        const computed = computeAcademicResult({
          marksType: qual.marksType,
          maxMarks: qual.maxMarks,
          obtainedMarks: qual.obtainedMarks,
          percentage: qual.percentage,
        });
        const detail = await tx.studentAcademicDetail.create({
          data: {
            studentId: Number(studentId),
            qualificationId: Number(qual.qualificationId),
            boardId: Number(qual.boardId),
            schoolName: qual.schoolName,
            passingYear: Number(qual.passingYear),
            rollNo: qual.rollNo,
            resultStatus: qual.resultStatus,
            marksType: qual.marksType,
            maxMarks: Number(qual.maxMarks),
            obtainedMarks: Number(qual.obtainedMarks),
            percentage: computed.percentage,
            division: qual.division || computed.division,
            grade: qual.grade || computed.grade,
            stream: qual.stream || null,
            CreatedBy: CreatedBy || 'System',
            IsActive: true,
            IsDeleted: false,
            subjects: {
              create: (qual.subjects || []).map((sub: any) => {
                const subComputed = computeAcademicResult({
                  marksType: 'Percentage',
                  maxMarks: sub.maxMarks,
                  obtainedMarks: sub.obtainedMarks,
                });
                return {
                subjectId: Number(sub.subjectId),
                maxMarks: Number(sub.maxMarks),
                minMarks: Number(sub.minMarks || 33),
                obtainedMarks: Number(sub.obtainedMarks),
                grade: sub.grade || subComputed.grade,
                practicalMarks: sub.practicalMarks ? Number(sub.practicalMarks) : null,
                theoryMarks: sub.theoryMarks ? Number(sub.theoryMarks) : null,
                isOptional: !!sub.isOptional,
                CreatedBy: CreatedBy || 'System',
                IsActive: true,
                IsDeleted: false,
              };
              }),
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

      if (Array.isArray(programSubjectIds)) {
        const ids = [
          ...new Set(
            programSubjectIds
              .map((id) => Number(id))
              .filter((id) => Number.isFinite(id) && id > 0),
          ),
        ];
        await tx.studentProgramSubject.deleteMany({
          where: { studentId: Number(studentId) },
        });
        if (ids.length > 0) {
          const masters = await tx.programSubjectMaster.findMany({
            where: {
              programSubjectId: { in: ids },
              programId: assignedProgramId,
              IsDeleted: false,
            },
          });
          const allowed = new Set(masters.map((m) => m.programSubjectId));
          if (ids.some((id) => !allowed.has(id))) {
            throw new BadRequestException(
              'One or more program subjects are invalid for this program',
            );
          }
          await tx.studentProgramSubject.createMany({
            data: ids.map((id, idx) => ({
              studentId: Number(studentId),
              programSubjectId: id,
              sequenceNo: idx + 1,
              CreatedBy: CreatedBy || 'System',
              IsActive: true,
              IsDeleted: false,
            })),
          });
        }
      }

      return {
        status: 'success',
        message: 'Academic qualifications and subjects saved successfully',
        data: createdDetails,
        programId: assignedProgramId,
        admissionSessionId: assignedAdmissionSessionId,
        admissionSessionName: assignedAdmissionSessionName,
        yearId: assignedYearId,
        semId: assignedSemId,
        yearName: assignedYearName,
        semesterName: assignedSemesterName,
        hasSportCertificate: sportFlag,
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
    const existing = await this.findOne(academicDetailId);

    const marksType = data.marksType !== undefined ? data.marksType : existing.marksType;
    const maxMarks =
      data.maxMarks !== undefined ? Number(data.maxMarks) : Number(existing.maxMarks);
    const obtainedMarks =
      data.obtainedMarks !== undefined
        ? Number(data.obtainedMarks)
        : Number(existing.obtainedMarks);
    const percentageInput =
      data.percentage !== undefined ? Number(data.percentage) : Number(existing.percentage);

    const computed = computeAcademicResult({
      marksType,
      maxMarks,
      obtainedMarks,
      percentage: percentageInput,
    });

    return this.prisma.studentAcademicDetail.update({
      where: { academicDetailId },
      data: {
        qualificationId: data.qualificationId !== undefined ? Number(data.qualificationId) : undefined,
        boardId: data.boardId !== undefined ? Number(data.boardId) : undefined,
        schoolName: data.schoolName,
        passingYear: data.passingYear !== undefined ? Number(data.passingYear) : undefined,
        rollNo: data.rollNo,
        resultStatus: data.resultStatus,
        marksType: data.marksType,
        maxMarks: data.maxMarks !== undefined ? Number(data.maxMarks) : undefined,
        obtainedMarks: data.obtainedMarks !== undefined ? Number(data.obtainedMarks) : undefined,
        percentage: computed.percentage,
        // Always refresh grade/division from marks unless explicitly provided
        division: data.division !== undefined && data.division !== null && data.division !== ''
          ? data.division
          : computed.division,
        grade: data.grade !== undefined && data.grade !== null && data.grade !== ''
          ? data.grade
          : computed.grade,
        stream: data.stream,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
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
        DeletedBy,
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
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });

    return {
      message: `Successfully soft-deleted ${result.count} academic detail record(s)`,
      count: result.count,
    };
  }
}
