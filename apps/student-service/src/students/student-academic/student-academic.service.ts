import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class StudentAcademicService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Save (overwrite) all academic qualifications and their subjects for a student.
   * Also stores selected programId and auto-assigns active sessionId on Student.
   */
  async save(
    studentId: number,
    qualifications: any[],
    CreatedBy: string,
    programId: number,
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

      const activeSession = await tx.academicSession.findFirst({
        where: { IsActive: true, IsDeleted: false },
        orderBy: { CreatedOn: 'desc' },
      });
      if (!activeSession) {
        throw new NotFoundException(
          'No active academic session found. Please activate a session in masters.',
        );
      }

      const assignedProgramId = program.programId;
      const assignedSessionId = activeSession.sessionId;
      const assignedSessionName = activeSession.sessionName;

      await tx.student.update({
        where: { StudentRegistrationId: Number(studentId) },
        data: {
          programId: assignedProgramId,
          sessionId: assignedSessionId,
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
            percentage: Number(qual.percentage),
            division: qual.division || null,
            grade: qual.grade || null,
            stream: qual.stream || null,
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
        programId: assignedProgramId,
        sessionId: assignedSessionId,
        sessionName: assignedSessionName,
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
    await this.findOne(academicDetailId);

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
        percentage: data.percentage !== undefined ? Number(data.percentage) : undefined,
        division: data.division,
        grade: data.grade,
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
