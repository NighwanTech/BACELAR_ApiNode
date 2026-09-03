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
      // CBSE-style: Equivalent % = 9.5 × CGPA
      percentage = Number.isFinite(obtained) ? obtained * 9.5 : 0;
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
   * Also stores selected programId and auto-assigns current academicSessionId on Student.
   */
  async save(
    studentId: number,
    qualifications: any[],
    CreatedBy: string,
    programId: number,
    programSubjectIds?: number[],
    hasSportCertificate?: boolean,
  ) {
    // Live/remote MySQL is slower than local — default 5s interactive tx times out.
    return this.prisma.$transaction(
      async (tx) => {
        if (programId === undefined || programId === null) {
          throw new BadRequestException('programId is required');
        }

        const sid = Number(studentId);
        const pid = Number(programId);

        const [student, program, currentAcademic] = await Promise.all([
          tx.student.findFirst({
            where: { StudentRegistrationId: sid, IsDeleted: false },
          }),
          tx.program.findFirst({
            where: { programId: pid, IsDeleted: false },
          }),
          tx.academicSession.findFirst({
            where: { isCurrent: true, IsDeleted: false, IsActive: true },
            orderBy: { startYear: 'desc' },
          }),
        ]);

        if (!student) {
          throw new NotFoundException(`Student with ID ${studentId} not found`);
        }
        if (!program) {
          throw new NotFoundException(`Program with ID ${programId} not found`);
        }

        const assignedProgramId = program.programId;
        let assignedAcademicSessionId = student.academicSessionId ?? null;
        let assignedAcademicSessionName: string | null = null;

        if (assignedAcademicSessionId) {
          const existingAcademic = await tx.academicSession.findFirst({
            where: { academicSessionId: assignedAcademicSessionId, IsDeleted: false },
          });
          assignedAcademicSessionName = existingAcademic?.academicSessionName ?? null;
        }

        if (!assignedAcademicSessionId || !assignedAcademicSessionName) {
          if (!currentAcademic) {
            throw new NotFoundException(
              'No current academic session found. Mark one Academic Session as Current in masters.',
            );
          }
          assignedAcademicSessionId = currentAcademic.academicSessionId;
          assignedAcademicSessionName = currentAcademic.academicSessionName;
        }

        const admissions = await tx.admissionSession.findMany({
          where: { IsDeleted: false },
        });
        const sessionKey = String(assignedAcademicSessionName || '')
          .trim()
          .toUpperCase()
          .replace(/[–—]/g, '-')
          .replace(/\s+/g, '')
          .replace(/^(20\d{2})-(\d{2})$/, (_, a, b) => `${a}-20${b}`);
        const matchedAdmission =
          admissions.find(
            (s) => String(s.admissionSessionName || '').trim() === String(assignedAcademicSessionName).trim(),
          ) ||
          admissions.find((s) => {
            const key = String(s.admissionSessionName || '')
              .trim()
              .toUpperCase()
              .replace(/[–—]/g, '-')
              .replace(/\s+/g, '')
              .replace(/^(20\d{2})-(\d{2})$/, (_, a, b) => `${a}-20${b}`);
            return key === sessionKey;
          }) ||
          admissions.find((s) => s.IsActive) ||
          admissions[0] ||
          null;
        const assignedAdmissionSessionId =
          matchedAdmission?.admissionSessionId || student.admissionSessionId || null;
        const assignedAdmissionSessionName =
          matchedAdmission?.admissionSessionName || assignedAcademicSessionName;

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

        const programSubjectIdList = Array.isArray(programSubjectIds)
          ? [
              ...new Set(
                programSubjectIds
                  .map((id) => Number(id))
                  .filter((id) => Number.isFinite(id) && id > 0),
              ),
            ]
          : null;

        // Validate program subjects before heavy writes (fails fast)
        if (programSubjectIdList && programSubjectIdList.length > 0) {
          const masters = await tx.programSubjectMaster.findMany({
            where: {
              programSubjectId: { in: programSubjectIdList },
              programId: assignedProgramId,
              IsDeleted: false,
            },
            select: { programSubjectId: true },
          });
          const allowed = new Set(masters.map((m) => m.programSubjectId));
          if (programSubjectIdList.some((id) => !allowed.has(id))) {
            throw new BadRequestException(
              'One or more program subjects are invalid for this program',
            );
          }
        }

        await tx.student.update({
          where: { StudentRegistrationId: sid },
          data: {
            programId: assignedProgramId,
            academicSessionId: assignedAcademicSessionId,
            admissionSessionId: assignedAdmissionSessionId,
            yearId: assignedYearId,
            semId: assignedSemId,
            hasSportCertificate: sportFlag,
            UpdatedBy: CreatedBy || 'System',
          },
        });

        // Overwrite academic rows (cascades to subjects)
        await tx.studentAcademicDetail.deleteMany({
          where: { studentId: sid },
        });

        // Create without heavy includes — one fetch at end (saves round-trips on live DB)
        for (const qual of qualifications || []) {
          const computed = computeAcademicResult({
            marksType: qual.marksType,
            maxMarks: qual.maxMarks,
            obtainedMarks: qual.obtainedMarks,
            percentage: qual.percentage,
          });
          await tx.studentAcademicDetail.create({
            data: {
              studentId: sid,
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
                    practicalMarks: sub.practicalMarks
                      ? Number(sub.practicalMarks)
                      : null,
                    theoryMarks: sub.theoryMarks ? Number(sub.theoryMarks) : null,
                    isOptional: !!sub.isOptional,
                    CreatedBy: CreatedBy || 'System',
                    IsActive: true,
                    IsDeleted: false,
                  };
                }),
              },
            },
          });
        }

        if (programSubjectIdList) {
          await tx.studentProgramSubject.deleteMany({
            where: { studentId: sid },
          });
          if (programSubjectIdList.length > 0) {
            await tx.studentProgramSubject.createMany({
              data: programSubjectIdList.map((id, idx) => ({
                studentId: sid,
                programSubjectId: id,
                sequenceNo: idx + 1,
                CreatedBy: CreatedBy || 'System',
                IsActive: true,
                IsDeleted: false,
              })),
            });
          }
        }

        const createdDetails = await tx.studentAcademicDetail.findMany({
          where: { studentId: sid, IsDeleted: false },
          include: {
            subjects: {
              include: {
                subject: true,
              },
            },
            qualification: true,
            board: true,
          },
          orderBy: { academicDetailId: 'asc' },
        });

        return {
          status: 'success',
          message: 'Academic qualifications and subjects saved successfully',
          data: createdDetails,
          programId: assignedProgramId,
          academicSessionId: assignedAcademicSessionId,
          academicSessionName: assignedAcademicSessionName,
          admissionSessionId: assignedAdmissionSessionId,
          admissionSessionName: assignedAdmissionSessionName,
          yearId: assignedYearId,
          semId: assignedSemId,
          yearName: assignedYearName,
          semesterName: assignedSemesterName,
          hasSportCertificate: sportFlag,
        };
      },
      {
        maxWait: 20_000,
        timeout: 60_000,
      },
    );
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
