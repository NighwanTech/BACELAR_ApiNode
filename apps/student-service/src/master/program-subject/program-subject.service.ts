import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class ProgramSubjectService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertProgram(programId: number) {
    const program = await this.prisma.program.findFirst({
      where: { programId, IsDeleted: false },
    });
    if (!program) {
      throw new NotFoundException(`Program with ID ${programId} not found`);
    }
    return program;
  }

  async create(data: any) {
    await this.assertProgram(Number(data.programId));

    const programSubjectName = String(data.programSubjectName || '').trim();
    const existing = await this.prisma.programSubjectMaster.findFirst({
      where: {
        programId: Number(data.programId),
        programSubjectName,
        IsDeleted: false,
      },
    });
    if (existing) {
      throw new ConflictException(
        'Program subject name already exists for this program',
      );
    }

    return this.prisma.programSubjectMaster.create({
      data: {
        programId: Number(data.programId),
        programSubjectName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(programId?: number) {
    return this.prisma.programSubjectMaster.findMany({
      where: {
        IsDeleted: false,
        ...(programId ? { programId: Number(programId) } : {}),
      },
      include: {
        program: {
          select: {
            programId: true,
            programName: true,
            programShortName: true,
            programCode: true,
          },
        },
      },
      orderBy: [{ programId: 'asc' }, { programSubjectName: 'asc' }],
    });
  }

  async findOne(programSubjectId: number) {
    const programSubject = await this.prisma.programSubjectMaster.findFirst({
      where: { programSubjectId, IsDeleted: false },
      include: {
        program: {
          select: {
            programId: true,
            programName: true,
            programShortName: true,
            programCode: true,
          },
        },
      },
    });
    if (!programSubject) {
      throw new NotFoundException(
        `Program subject with ID ${programSubjectId} not found`,
      );
    }
    return programSubject;
  }

  async update(programSubjectId: number, data: any) {
    const current = await this.findOne(programSubjectId);
    const programId =
      data.programId !== undefined ? Number(data.programId) : current.programId;
    const programSubjectName =
      data.programSubjectName !== undefined
        ? String(data.programSubjectName).trim()
        : current.programSubjectName;

    if (data.programId !== undefined) {
      await this.assertProgram(programId);
    }

    const existing = await this.prisma.programSubjectMaster.findFirst({
      where: {
        programId,
        programSubjectName,
        IsDeleted: false,
        NOT: { programSubjectId },
      },
    });
    if (existing) {
      throw new ConflictException(
        'Program subject name already exists for this program',
      );
    }

    return this.prisma.programSubjectMaster.update({
      where: { programSubjectId },
      data: {
        programId: data.programId !== undefined ? programId : undefined,
        programSubjectName:
          data.programSubjectName !== undefined ? programSubjectName : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  
  async updateStatus(programSubjectId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(programSubjectId);
    return this.prisma.programSubjectMaster.update({
      where: { programSubjectId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(
    programSubjectId: number,
    DeletedBy: string,
    DeletedRemarks?: string,
  ) {
    await this.findOne(programSubjectId);

    return this.prisma.programSubjectMaster.update({
      where: { programSubjectId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }
}
