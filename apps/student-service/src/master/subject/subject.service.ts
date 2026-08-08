import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.subjectMaster.create({
      data: {
        subjectName: data.subjectName,
        subjectCode: data.subjectCode,
        classType: data.classType,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return this.prisma.subjectMaster.findMany({
      where: { IsDeleted: false },
      orderBy: { subjectName: 'asc' },
    });
  }

  async findOne(subjectId: number) {
    const subject = await this.prisma.subjectMaster.findFirst({
      where: { subjectId, IsDeleted: false },
    });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${subjectId} not found`);
    }
    return subject;
  }

  async update(subjectId: number, data: any) {
    await this.findOne(subjectId);

    return this.prisma.subjectMaster.update({
      where: { subjectId },
      data: {
        subjectName: data.subjectName,
        subjectCode: data.subjectCode,
        classType: data.classType,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async softDelete(subjectId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(subjectId);

    return this.prisma.subjectMaster.update({
      where: { subjectId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }
}
