import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class AcademicSessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.academicSession.create({
      data: {
        sessionName: data.sessionName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return this.prisma.academicSession.findMany({
      where: { IsDeleted: false },
      orderBy: { sessionName: 'asc' },
    });
  }

  async findOne(sessionId: number) {
    const session = await this.prisma.academicSession.findFirst({
      where: { sessionId, IsDeleted: false },
    });
    if (!session) {
      throw new NotFoundException(`Academic Session with ID ${sessionId} not found`);
    }
    return session;
  }

  async update(sessionId: number, data: any) {
    await this.findOne(sessionId);

    return this.prisma.academicSession.update({
      where: { sessionId },
      data: {
        sessionName: data.sessionName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async softDelete(sessionId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(sessionId);

    return this.prisma.academicSession.update({
      where: { sessionId },
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
    const result = await this.prisma.academicSession.updateMany({
      where: {
        sessionId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} academic session(s)`,
      count: result.count,
    };
  }
}
