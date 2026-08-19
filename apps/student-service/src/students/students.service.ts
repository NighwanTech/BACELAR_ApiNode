import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

/** Student role in loginMaster */
const STUDENT_ROLE_ID = 1;

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Never expose bcrypt hash. Attach admin-visible plain from loginMaster as loginPasswordPlain
   * (keeps Admin UI field name unchanged).
   */
  private sanitizeStudent<T extends Record<string, any>>(student: T) {
    const { loginMaster, ...rest } = student as T & {
      loginMaster?: {
        PlainPassword?: string | null;
        IsPasswordUpdated?: boolean;
        LastLogin?: Date | null;
      } | null;
    };

    return {
      ...rest,
      loginPasswordPlain: loginMaster?.PlainPassword ?? null,
      IsPasswordUpdated: loginMaster?.IsPasswordUpdated ?? false,
      LastLogin: loginMaster?.LastLogin ?? null,
    };
  }

  private generateRandomPassword(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    let pwd = '';

    for (let i = 0; i < 4; i++) {
      pwd += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    for (let i = 0; i < 4; i++) {
      pwd += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return pwd;
  }

  private async generateRegistrationNumber(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const cycleStartYear = month >= 3 ? year : year - 1;
    const cycleStartDate = new Date(cycleStartYear, 3, 1, 0, 0, 0, 0);

    const count = await this.prisma.student.count({
      where: {
        CreatedOn: {
          gte: cycleStartDate,
        },
      },
    });

    const yyyy = year.toString();
    const mm = (month + 1).toString().padStart(2, '0');
    const dd = now.getDate().toString().padStart(2, '0');

    let serial = count + 1;
    let regNo = `${yyyy}${mm}${dd}${serial.toString().padStart(4, '0')}`;

    let isUnique = false;
    while (!isUnique) {
      const existingRegNo = await this.prisma.student.findUnique({
        where: { registrationNo: regNo },
      });
      if (!existingRegNo) {
        isUnique = true;
      } else {
        serial++;
        regNo = `${yyyy}${mm}${dd}${serial.toString().padStart(4, '0')}`;
      }
    }

    return regNo;
  }

  /**
   * CREATE: Register student + create loginMaster (auth only in loginMaster).
   */
  async create(data: any) {
    const existingEmail = await this.prisma.student.findUnique({
      where: { email: data.email },
    });
    if (existingEmail) {
      throw new ConflictException('Email already registered');
    }

    let regNo = data.registrationNo;
    if (!regNo) {
      regNo = await this.generateRegistrationNumber();
    } else {
      const existingReg = await this.prisma.student.findUnique({
        where: { registrationNo: regNo },
      });
      if (existingReg) {
        throw new ConflictException('Registration number already exists');
      }
    }

    const plainTextPassword = this.generateRandomPassword();
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
    const createdBy = data.CreatedBy || 'System';

    const newStudent = await this.prisma.$transaction(async (tx) => {
      const student = await tx.student.create({
        data: {
          candidateName: data.candidateName,
          fatherName: data.fatherName,
          email: data.email,
          mobileNo: data.mobileNo,
          registrationNo: regNo,
          CreatedBy: createdBy,
          Remarks: data.Remarks,
          IsActive: true,
          IsDeleted: false,
        },
      });

      await tx.loginMaster.create({
        data: {
          StudentId: student.StudentRegistrationId,
          RegistrationNo: regNo,
          LoginName: data.candidateName || regNo,
          Mobile: data.mobileNo,
          EmailId: data.email,
          Password: hashedPassword,
          PlainPassword: plainTextPassword,
          OldPassword: null,
          IsPasswordUpdated: false,
          RoleId: STUDENT_ROLE_ID,
          ClientId: data.ClientId != null ? Number(data.ClientId) : null,
          IsActive: true,
          CreatedBy: createdBy,
          Remarks: data.Remarks || null,
        },
      });

      return tx.student.findUnique({
        where: { StudentRegistrationId: student.StudentRegistrationId },
        include: { loginMaster: true },
      });
    });

    return {
      ...this.sanitizeStudent(newStudent as any),
      plainTextPassword,
    };
  }

  /**
   * AUTH: Login via loginMaster (RegistrationNo + Password hash).
   */
  async login(
    registrationNo: string,
    passwordString: string,
    meta?: { IpAddress?: string; MACAddress?: string },
  ) {
    const login = await this.prisma.loginMaster.findUnique({
      where: { RegistrationNo: registrationNo },
      include: {
        student: true,
      },
    });

    if (
      !login ||
      !login.IsActive ||
      !login.student ||
      login.student.IsDeleted ||
      !login.student.IsActive
    ) {
      throw new UnauthorizedException('Invalid credentials or account is disabled');
    }

    const isPasswordValid = await bcrypt.compare(passwordString, login.Password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials or account is disabled');
    }

    await this.prisma.loginMaster.update({
      where: { LoginId: login.LoginId },
      data: {
        LastLogin: new Date(),
        IpAddress: meta?.IpAddress || login.IpAddress,
        MACAddress: meta?.MACAddress || login.MACAddress,
        ModifyBy: 'System-Login',
      },
    });

    const payload = {
      sub: login.student.StudentRegistrationId,
      registrationNo: login.student.registrationNo,
      loginId: login.LoginId,
      roleId: login.RoleId,
    };
    const token = this.jwtService.sign(payload);

    const sanitized = this.sanitizeStudent({
      ...login.student,
      loginMaster: login,
    }) as any;
    delete sanitized.loginPasswordPlain;

    return {
      status: 'success',
      token,
      student: sanitized,
    };
  }

  async findAll() {
    const rows = await this.prisma.student.findMany({
      where: {
        IsDeleted: false,
      },
      include: {
        loginMaster: true,
      },
      orderBy: {
        CreatedOn: 'desc',
      },
    });
    return rows.map((s) => this.sanitizeStudent(s));
  }

  async findOne(StudentRegistrationId: number) {
    const student = await this.prisma.student.findFirst({
      where: {
        StudentRegistrationId,
        IsDeleted: false,
      },
      include: {
        program: {
          include: { programCategory: true },
        },
        admissionSession: true,
        loginMaster: true,
      },
    });

    if (!student) {
      throw new NotFoundException(
        `Student with Registration ID ${StudentRegistrationId} not found`,
      );
    }

    return this.sanitizeStudent(student);
  }

  async update(StudentRegistrationId: number, data: any) {
    await this.findOne(StudentRegistrationId);

    if (data.email) {
      const existingEmail = await this.prisma.student.findFirst({
        where: {
          email: data.email,
          NOT: { StudentRegistrationId },
        },
      });
      if (existingEmail) {
        throw new ConflictException('Email already in use by another student');
      }
    }

    if (data.registrationNo) {
      const existingReg = await this.prisma.student.findFirst({
        where: {
          registrationNo: data.registrationNo,
          NOT: { StudentRegistrationId },
        },
      });
      if (existingReg) {
        throw new ConflictException(
          'Registration number already in use by another student',
        );
      }
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const student = await tx.student.update({
        where: { StudentRegistrationId },
        data: {
          candidateName: data.candidateName,
          fatherName: data.fatherName,
          email: data.email,
          mobileNo: data.mobileNo,
          registrationNo: data.registrationNo,
          UpdatedBy: data.UpdatedBy,
          IsActive: data.IsActive,
          Remarks: data.Remarks,
        },
      });

      const login = await tx.loginMaster.findUnique({
        where: { StudentId: StudentRegistrationId },
      });

      if (login) {
        await tx.loginMaster.update({
          where: { LoginId: login.LoginId },
          data: {
            RegistrationNo: student.registrationNo,
            LoginName: student.candidateName,
            Mobile: student.mobileNo,
            EmailId: student.email,
            IsActive: student.IsActive,
            ModifyBy: data.UpdatedBy || null,
            Remarks: data.Remarks !== undefined ? data.Remarks : undefined,
          },
        });
      }

      return tx.student.findUnique({
        where: { StudentRegistrationId },
        include: { loginMaster: true },
      });
    });

    return this.sanitizeStudent(updated as any);
  }

  async updateStatus(StudentRegistrationId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(StudentRegistrationId);

    const updated = await this.prisma.$transaction(async (tx) => {
      const student = await tx.student.update({
        where: { StudentRegistrationId },
        data: {
          IsActive,
          UpdatedBy,
        },
      });

      await tx.loginMaster.updateMany({
        where: { StudentId: StudentRegistrationId },
        data: {
          IsActive,
          ModifyBy: UpdatedBy,
        },
      });

      return tx.student.findUnique({
        where: { StudentRegistrationId },
        include: { loginMaster: true },
      });
    });

    return this.sanitizeStudent(updated as any);
  }

  async softDelete(
    StudentRegistrationId: number,
    DeletedBy: string,
    DeletedRemarks?: string,
  ) {
    await this.findOne(StudentRegistrationId);

    const deleted = await this.prisma.$transaction(async (tx) => {
      const student = await tx.student.update({
        where: { StudentRegistrationId },
        data: {
          IsDeleted: true,
          IsActive: false,
          DeletedOn: new Date(),
          DeletedBy: DeletedBy,
          DeletedRemarks: DeletedRemarks || null,
        },
      });

      await tx.loginMaster.updateMany({
        where: { StudentId: StudentRegistrationId },
        data: {
          IsActive: false,
          ModifyBy: DeletedBy,
        },
      });

      return student;
    });

    return this.sanitizeStudent(deleted);
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const result = await this.prisma.$transaction(async (tx) => {
      const studentResult = await tx.student.updateMany({
        where: {
          StudentRegistrationId: { in: ids },
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

      await tx.loginMaster.updateMany({
        where: { StudentId: { in: ids } },
        data: {
          IsActive: false,
          ModifyBy: DeletedBy,
        },
      });

      return studentResult;
    });

    return {
      message: `Successfully soft-deleted ${result.count} student(s)`,
      count: result.count,
    };
  }

  async changePassword(
    registrationNo: string,
    currentPasswordString: string,
    newPasswordString: string,
  ) {
    const login = await this.prisma.loginMaster.findUnique({
      where: { RegistrationNo: registrationNo },
      include: { student: true },
    });

    if (!login || !login.student || login.student.IsDeleted) {
      return { status: 'error', message: 'Student account not found' };
    }

    const isPasswordValid = await bcrypt.compare(currentPasswordString, login.Password);
    if (!isPasswordValid) {
      return { status: 'error', message: 'Current password is incorrect' };
    }

    const hashedNewPassword = await bcrypt.hash(newPasswordString, 10);

    await this.prisma.loginMaster.update({
      where: { LoginId: login.LoginId },
      data: {
        OldPassword: login.PlainPassword || login.Password,
        Password: hashedNewPassword,
        PlainPassword: newPasswordString,
        IsPasswordUpdated: true,
        PasswordChangeOn: new Date(),
        ModifyBy: registrationNo,
      },
    });

    return { status: 'success', message: 'Password changed successfully' };
  }

  async adminResetPassword(StudentRegistrationId: number, UpdatedBy = 'Admin User') {
    const student = await this.prisma.student.findFirst({
      where: { StudentRegistrationId, IsDeleted: false },
      include: { loginMaster: true },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${StudentRegistrationId} not found`);
    }

    const plainTextPassword = this.generateRandomPassword();
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

    if (student.loginMaster) {
      await this.prisma.loginMaster.update({
        where: { LoginId: student.loginMaster.LoginId },
        data: {
          OldPassword: student.loginMaster.PlainPassword || student.loginMaster.Password,
          Password: hashedPassword,
          PlainPassword: plainTextPassword,
          IsPasswordUpdated: false,
          PasswordChangeOn: new Date(),
          ModifyBy: UpdatedBy,
        },
      });
    } else {
      await this.prisma.loginMaster.create({
        data: {
          StudentId: StudentRegistrationId,
          RegistrationNo: student.registrationNo,
          LoginName: student.candidateName,
          Mobile: student.mobileNo,
          EmailId: student.email,
          Password: hashedPassword,
          PlainPassword: plainTextPassword,
          IsPasswordUpdated: false,
          PasswordChangeOn: new Date(),
          RoleId: STUDENT_ROLE_ID,
          IsActive: true,
          CreatedBy: UpdatedBy,
          ModifyBy: UpdatedBy,
        },
      });
    }

    return {
      status: 'success',
      message: 'Password reset successfully',
      StudentRegistrationId,
      registrationNo: student.registrationNo,
      plainTextPassword,
    };
  }
}
