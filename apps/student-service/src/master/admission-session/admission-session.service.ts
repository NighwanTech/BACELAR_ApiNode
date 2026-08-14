import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class AdmissionSessionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.admissionSession.create({
      data: {
        admissionSessionName: data.admissionSessionName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return this.prisma.admissionSession.findMany({
      where: { IsDeleted: false },
      orderBy: { admissionSessionName: 'asc' },
    });
  }

  async findOne(admissionSessionId: number) {
    const session = await this.prisma.admissionSession.findFirst({
      where: { admissionSessionId, IsDeleted: false },
    });
    if (!session) {
      throw new NotFoundException(
        `Admission Session with ID ${admissionSessionId} not found`,
      );
    }
    return session;
  }

  async update(admissionSessionId: number, data: any) {
    await this.findOne(admissionSessionId);

    return this.prisma.admissionSession.update({
      where: { admissionSessionId },
      data: {
        admissionSessionName: data.admissionSessionName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async softDelete(
    admissionSessionId: number,
    DeletedBy: string,
    DeletedRemarks?: string,
  ) {
    await this.findOne(admissionSessionId);

    return this.prisma.admissionSession.update({
      where: { admissionSessionId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  async bulkSoftDelete(
    ids: number[],
    DeletedBy: string,
    DeletedRemarks?: string,
  ) {
    const result = await this.prisma.admissionSession.updateMany({
      where: {
        admissionSessionId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} admission session(s)`,
      count: result.count,
    };
  }
}
