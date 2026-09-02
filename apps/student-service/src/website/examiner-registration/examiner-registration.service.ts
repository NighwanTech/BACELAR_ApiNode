import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class ExaminerRegistrationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return (this.prisma as any).examinerRegistration.create({
      data: {
        institutionName: data.institutionName || null,
        examSessionYear: data.examSessionYear || null,
        registrationType: data.registrationType || null,
        fullName: data.fullName,
        fatherSpouseName: data.fatherSpouseName || null,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        gender: data.gender || null,
        mobileNo: data.mobileNo,
        alternateMobile: data.alternateMobile || null,
        emailId: data.emailId || null,
        address: data.address || null,
        highestQualification: data.highestQualification || null,
        specialization: data.specialization || null,
        designation: data.designation || null,
        presentInstitution: data.presentInstitution || null,
        teachingExperience: data.teachingExperience || null,
        universityAffiliation: data.universityAffiliation || null,
        accountHolderName: data.accountHolderName || null,
        bankName: data.bankName || null,
        branch: data.branch || null,
        accountNumber: data.accountNumber || null,
        ifscCode: data.ifscCode || null,
        CreatedBy: data.CreatedBy || 'System',
        Remarks: data.Remarks || null,
        IsActive: data.IsActive ?? true,
        IsDeleted: false,
      },
    });
  }

  async findAll() {
    return (this.prisma as any).examinerRegistration.findMany({
      where: { IsDeleted: false },
      orderBy: { examinerId: 'desc' },
    });
  }

  async findOne(examinerId: number) {
    const item = await (this.prisma as any).examinerRegistration.findFirst({
      where: { examinerId, IsDeleted: false },
    });
    if (!item) {
      throw new NotFoundException(`Examiner registration entry with ID ${examinerId} not found`);
    }
    return item;
  }

  async update(examinerId: number, data: any) {
    await this.findOne(examinerId);

    const updatePayload: any = {
      UpdatedBy: data.UpdatedBy || 'Admin',
    };

    if (data.institutionName !== undefined) updatePayload.institutionName = data.institutionName;
    if (data.examSessionYear !== undefined) updatePayload.examSessionYear = data.examSessionYear;
    if (data.registrationType !== undefined) updatePayload.registrationType = data.registrationType;
    if (data.fullName !== undefined) updatePayload.fullName = data.fullName;
    if (data.fatherSpouseName !== undefined) updatePayload.fatherSpouseName = data.fatherSpouseName;
    if (data.dateOfBirth !== undefined) updatePayload.dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : null;
    if (data.gender !== undefined) updatePayload.gender = data.gender;
    if (data.mobileNo !== undefined) updatePayload.mobileNo = data.mobileNo;
    if (data.alternateMobile !== undefined) updatePayload.alternateMobile = data.alternateMobile;
    if (data.emailId !== undefined) updatePayload.emailId = data.emailId;
    if (data.address !== undefined) updatePayload.address = data.address;
    if (data.highestQualification !== undefined) updatePayload.highestQualification = data.highestQualification;
    if (data.specialization !== undefined) updatePayload.specialization = data.specialization;
    if (data.designation !== undefined) updatePayload.designation = data.designation;
    if (data.presentInstitution !== undefined) updatePayload.presentInstitution = data.presentInstitution;
    if (data.teachingExperience !== undefined) updatePayload.teachingExperience = data.teachingExperience;
    if (data.universityAffiliation !== undefined) updatePayload.universityAffiliation = data.universityAffiliation;
    if (data.accountHolderName !== undefined) updatePayload.accountHolderName = data.accountHolderName;
    if (data.bankName !== undefined) updatePayload.bankName = data.bankName;
    if (data.branch !== undefined) updatePayload.branch = data.branch;
    if (data.accountNumber !== undefined) updatePayload.accountNumber = data.accountNumber;
    if (data.ifscCode !== undefined) updatePayload.ifscCode = data.ifscCode;
    if (data.IsActive !== undefined) updatePayload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) updatePayload.Remarks = data.Remarks;

    return (this.prisma as any).examinerRegistration.update({
      where: { examinerId },
      data: updatePayload,
    });
  }

  async updateStatus(examinerId: number, IsActive: boolean, UpdatedBy: string) {
    return this.update(examinerId, { IsActive, UpdatedBy });
  }

  async softDelete(examinerId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(examinerId);

    return (this.prisma as any).examinerRegistration.update({
      where: { examinerId },
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
