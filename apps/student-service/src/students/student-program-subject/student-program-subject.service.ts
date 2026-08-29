import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class StudentProgramSubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async saveForStudent(studentId: number, programSubjectIds: number[], CreatedBy: string) {
    const student = await this.prisma.student.findFirst({
      where: { StudentRegistrationId: Number(studentId), IsDeleted: false },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }
    if (!student.programId) {
      throw new BadRequestException('Student has no program assigned');
    }

    const ids = [
      ...new Set(
        (programSubjectIds || [])
          .map((id) => Number(id))
          .filter((id) => Number.isFinite(id) && id > 0),
      ),
    ];

    if (ids.length > 0) {
      const masters = await this.prisma.programSubjectMaster.findMany({
        where: {
          programSubjectId: { in: ids },
          programId: student.programId,
          IsDeleted: false,
        },
      });
      const allowed = new Set(masters.map((m) => m.programSubjectId));
      if (ids.some((id) => !allowed.has(id))) {
        throw new BadRequestException(
          'One or more program subjects are invalid for this program',
        );
      }
    }

    await this.prisma.$transaction(
      async (tx) => {
        await tx.studentProgramSubject.deleteMany({
          where: { studentId: Number(studentId) },
        });
        if (ids.length > 0) {
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
      },
      {
        maxWait: 15_000,
        timeout: 30_000,
      },
    );

    return this.findByStudent(studentId);
  }

  async findByStudent(studentId: number) {
    return this.prisma.studentProgramSubject.findMany({
      where: { studentId: Number(studentId), IsDeleted: false },
      include: {
        programSubject: {
          select: {
            programSubjectId: true,
            programSubjectName: true,
            programId: true,
          },
        },
      },
      orderBy: { sequenceNo: 'asc' },
    });
  }
}
