import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class StudentProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    // Check if profile already exists for the student
    const existing = await this.prisma.studentProfile.findUnique({
      where: { studentId: data.studentId },
    });
    if (existing) {
      throw new ConflictException('Profile already exists for this student');
    }

    // Verify student exists in registration table
    const student = await this.prisma.student.findUnique({
      where: { StudentRegistrationId: data.studentId },
    });
    if (!student || student.IsDeleted) {
      throw new NotFoundException('Student account not found');
    }

    return this.prisma.studentProfile.create({
      data: {
        studentId: data.studentId,
        studentNameHindi: data.studentNameHindi || null,
        fatherNameHindi: data.fatherNameHindi || null,
        motherName: data.motherName || null,
        motherNameHindi: data.motherNameHindi || null,
        fatherMobileNumber: data.fatherMobileNumber || null,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        gender: data.gender || null,
        maritalStatus: data.maritalStatus || null,
        religion: data.religion || null,
        nationality: data.nationality || null,
        category: data.category || null,
        subCategory: data.subCategory || null,
        physicalHandicap: data.physicalHandicap || null,
        certificateNo: data.certificateNo || null,
        certificateAttachment: data.certificateAttachment || null,
        aadharIdNo: data.aadharIdNo || null,
        apaarIdNo: data.apaarIdNo || null,
        
        // Correspondence Address
        CaddressLine1: data.CaddressLine1 || null,
        CaddressLine2: data.CaddressLine2 || null,
        CaddressLine3: data.CaddressLine3 || null,
        Cstate: data.Cstate || null,
        Ccity: data.Ccity || null,
        Cpincode: data.Cpincode || null,

        // Permanent Address
        PaddressLine1: data.PaddressLine1 || null,
        PaddressLine2: data.PaddressLine2 || null,
        PaddressLine3: data.PaddressLine3 || null,
        Pstate: data.Pstate || null,
        Pcity: data.Pcity || null,
        Ppincode: data.Ppincode || null,

        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findOne(studentId: number) {
    const profile = await this.prisma.studentProfile.findFirst({
      where: { studentId, IsDeleted: false },
      include: {
        student: true,
      },
    });

    if (!profile) {
      throw new NotFoundException(`Student profile with student ID ${studentId} not found`);
    }

    // Merge student fields into profile response object
    const { student, ...profileData } = profile;
    return {
      ...profileData,
      studentName: student.candidateName,
      studentPhoneNo: student.mobileNo,
      email: student.email,
      fatherName: student.fatherName,
      registrationNo: student.registrationNo,
    };
  }

  async update(studentId: number, data: any) {
    // Verify profile exists
    await this.findOne(studentId);

    return this.prisma.studentProfile.update({
      where: { studentId },
      data: {
        studentNameHindi: data.studentNameHindi,
        fatherNameHindi: data.fatherNameHindi,
        motherName: data.motherName,
        motherNameHindi: data.motherNameHindi,
        fatherMobileNumber: data.fatherMobileNumber,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        religion: data.religion,
        nationality: data.nationality,
        category: data.category,
        subCategory: data.subCategory,
        physicalHandicap: data.physicalHandicap,
        certificateNo: data.certificateNo,
        certificateAttachment: data.certificateAttachment,
        aadharIdNo: data.aadharIdNo,
        apaarIdNo: data.apaarIdNo,
        
        // Correspondence Address
        CaddressLine1: data.CaddressLine1,
        CaddressLine2: data.CaddressLine2,
        CaddressLine3: data.CaddressLine3,
        Cstate: data.Cstate,
        Ccity: data.Ccity,
        Cpincode: data.Cpincode,

        // Permanent Address
        PaddressLine1: data.PaddressLine1,
        PaddressLine2: data.PaddressLine2,
        PaddressLine3: data.PaddressLine3,
        Pstate: data.Pstate,
        Pcity: data.Pcity,
        Ppincode: data.Ppincode,

        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async softDelete(studentId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(studentId);

    return this.prisma.studentProfile.update({
      where: { studentId },
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
    const result = await this.prisma.studentProfile.updateMany({
      where: {
        studentProfileId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} student profile(s)`,
      count: result.count,
    };
  }
}
