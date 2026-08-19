import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class CollegeService {
  constructor(private readonly prisma: PrismaService) {}

  private get collegeMaster() {
    return (this.prisma as any).collegeMaster;
  }

  async create(data: any) {
    return this.collegeMaster.create({
      data: {
        registrationNumber: data.registrationNumber || null,
        collegeCode: data.collegeCode || null,
        collegeName: data.collegeName,
        shortName: data.shortName || null,
        collegeAddress: data.collegeAddress || null,
        primaryContactNumber: data.primaryContactNumber || null,
        alternateContactNumber: data.alternateContactNumber || null,
        emailId: data.emailId || null,
        collegeWebsite: data.collegeWebsite || null,
        CreatedBy: data.CreatedBy || null,
        Remarks: data.Remarks || null,
        IsActive: data.IsActive !== undefined ? data.IsActive : true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return this.collegeMaster.findMany({
      where: { IsDeleted: false },
      orderBy: { collegeName: 'asc' },
    });
  }

  async findOne(collegeId: number) {
    const college = await this.collegeMaster.findFirst({
      where: { collegeId, IsDeleted: false },
    });
    if (!college) {
      throw new NotFoundException(`College with ID ${collegeId} not found`);
    }
    return college;
  }

  async update(collegeId: number, data: any) {
    await this.findOne(collegeId);

    return this.collegeMaster.update({
      where: { collegeId },
      data: {
        ...(data.registrationNumber !== undefined && { registrationNumber: data.registrationNumber }),
        ...(data.collegeCode !== undefined && { collegeCode: data.collegeCode }),
        ...(data.collegeName !== undefined && { collegeName: data.collegeName }),
        ...(data.shortName !== undefined && { shortName: data.shortName }),
        ...(data.collegeAddress !== undefined && { collegeAddress: data.collegeAddress }),
        ...(data.primaryContactNumber !== undefined && { primaryContactNumber: data.primaryContactNumber }),
        ...(data.alternateContactNumber !== undefined && { alternateContactNumber: data.alternateContactNumber }),
        ...(data.emailId !== undefined && { emailId: data.emailId }),
        ...(data.collegeWebsite !== undefined && { collegeWebsite: data.collegeWebsite }),
        ...(data.UpdatedBy !== undefined && { UpdatedBy: data.UpdatedBy }),
        ...(data.IsActive !== undefined && { IsActive: data.IsActive }),
        ...(data.Remarks !== undefined && { Remarks: data.Remarks }),
      },
    });
  }

  
  async updateStatus(collegeId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(collegeId);
    return this.collegeMaster.update({
      where: { collegeId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(collegeId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(collegeId);

    return this.collegeMaster.update({
      where: { collegeId },
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
