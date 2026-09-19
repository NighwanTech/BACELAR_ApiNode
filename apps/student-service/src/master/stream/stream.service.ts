import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class StreamService {
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

    const streamName = String(data.streamName || '').trim();
    const existing = await this.prisma.streamMaster.findFirst({
      where: {
        programId: Number(data.programId),
        streamName,
        IsDeleted: false,
      },
    });
    if (existing) {
      throw new ConflictException(
        'Stream name already exists for this program',
      );
    }

    return this.prisma.streamMaster.create({
      data: {
        programId: Number(data.programId),
        streamName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(programId?: number, activeOnly = false) {
    return this.prisma.streamMaster.findMany({
      where: {
        IsDeleted: false,
        ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}),
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
      orderBy: [{ programId: 'asc' }, { streamName: 'asc' }],
    });
  }

  async findOne(streamId: number) {
    const stream = await this.prisma.streamMaster.findFirst({
      where: { streamId, IsDeleted: false },
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
    if (!stream) {
      throw new NotFoundException(`Stream with ID ${streamId} not found`);
    }
    return stream;
  }

  async update(streamId: number, data: any) {
    const current = await this.findOne(streamId);
    const programId =
      data.programId !== undefined ? Number(data.programId) : current.programId;
    const streamName =
      data.streamName !== undefined
        ? String(data.streamName).trim()
        : current.streamName;

    if (data.programId !== undefined) {
      await this.assertProgram(programId);
    }

    const existing = await this.prisma.streamMaster.findFirst({
      where: {
        programId,
        streamName,
        IsDeleted: false,
        NOT: { streamId },
      },
    });
    if (existing) {
      throw new ConflictException(
        'Stream name already exists for this program',
      );
    }

    return this.prisma.streamMaster.update({
      where: { streamId },
      data: {
        programId: data.programId !== undefined ? programId : undefined,
        streamName: data.streamName !== undefined ? streamName : undefined,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  
  async updateStatus(streamId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(streamId);
    return this.prisma.streamMaster.update({
      where: { streamId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(streamId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(streamId);

    return this.prisma.streamMaster.update({
      where: { streamId },
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
