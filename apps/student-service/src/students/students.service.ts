import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StudentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Helper to generate a random 8-character password containing 4 digits and 4 uppercase letters.
   */
  private generateRandomPassword(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    let pwd = '';
    
    // Pick 4 random uppercase letters
    for (let i = 0; i < 4; i++) {
      pwd += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    // Pick 4 random digits
    for (let i = 0; i < 4; i++) {
      pwd += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return pwd;
  }

  /**
   * Helper to generate a unique Registration Number in case the client did not send one.
   * Format: yyyymmddXXXX (12 digits, where XXXX is a 4-digit serial resetting every April 1st)
   */
  private async generateRegistrationNumber(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed: 3 = April

    // Financial/Academic year cycle starts April 1st
    const cycleStartYear = month >= 3 ? year : year - 1;
    const cycleStartDate = new Date(cycleStartYear, 3, 1, 0, 0, 0, 0);

    // Count how many students were registered after or on the cycle start date
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

    // Loop to ensure uniqueness in case of race conditions
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
   * 1. CREATE Operation: Register a new student
   */
  async create(data: any) {
    // Check if email already exists
    const existingEmail = await this.prisma.student.findUnique({
      where: { email: data.email },
    });
    if (existingEmail) {
      throw new ConflictException('Email already registered');
    }

    // Determine registration number
    let regNo = data.registrationNo;
    if (!regNo) {
      regNo = await this.generateRegistrationNumber();
    } else {
      // Check if user-provided registration number already exists
      const existingReg = await this.prisma.student.findUnique({
        where: { registrationNo: regNo },
      });
      if (existingReg) {
        throw new ConflictException('Registration number already exists');
      }
    }

    // Generate 8-character plain-text password
    const plainTextPassword = this.generateRandomPassword();
    // Hash password using bcrypt before saving
    const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

    // Save in MySQL database using Prisma
    const newStudent = await this.prisma.student.create({
      data: {
        candidateName: data.candidateName,
        fatherName: data.fatherName,
        email: data.email,
        mobileNo: data.mobileNo,
        registrationNo: regNo,
        password: hashedPassword, // Store the secure hash
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks,
        IsActive: true,
        IsDeleted: false,
      },
    });

    // Return the student info ALONG WITH the plain-text password
    // so the client application can display it in the verification slip
    return {
      ...newStudent,
      plainTextPassword,
    };
  }

  /**
   * AUTHENTICATION: Login student using Registration Number and Password
   */
  async login(registrationNo: string, passwordString: string) {
    const student = await this.prisma.student.findUnique({
      where: { registrationNo },
    });

    // Verify user exists, is active, and not deleted
    if (!student || student.IsDeleted || !student.IsActive) {
      throw new UnauthorizedException('Invalid credentials or account is disabled');
    }

    // Compare plain password with stored bcrypt hash
    const isPasswordValid = await bcrypt.compare(passwordString, student.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials or account is disabled');
    }

    // Password matches, generate JWT Token
    const payload = { sub: student.StudentRegistrationId, registrationNo: student.registrationNo };
    const token = this.jwtService.sign(payload);

    // Return sanitized student record and the token
    const { password, ...sanitizedStudent } = student;
    return {
      status: 'success',
      token,
      student: sanitizedStudent,
    };
  }

  /**
   * 2. READ (Find All) Operation: Get all active students
   * Filtering: Only returns records where IsDeleted is false
   */
  async findAll() {
    return this.prisma.student.findMany({
      where: {
        IsDeleted: false,
      },
      orderBy: {
        CreatedOn: 'desc',
      },
    });
  }

  /**
   * 3. READ (Find One) Operation: Get student details by ID
   * Filtering: Checks if the record is active and not deleted
   */
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
        session: true,
      },
    });

    if (!student) {
      throw new NotFoundException(`Student with Registration ID ${StudentRegistrationId} not found`);
    }

    return student;
  }

  /**
   * 4. UPDATE Operation: Modify student details
   */
  async update(StudentRegistrationId: number, data: any) {
    // Verify student exists and is active
    await this.findOne(StudentRegistrationId);

    // If updating email, check for duplicate conflicts
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

    // If updating registration number, check for duplicates
    if (data.registrationNo) {
      const existingReg = await this.prisma.student.findFirst({
        where: {
          registrationNo: data.registrationNo,
          NOT: { StudentRegistrationId },
        },
      });
      if (existingReg) {
        throw new ConflictException('Registration number already in use by another student');
      }
    }

    // Update in MySQL database
    return this.prisma.student.update({
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
  }

  /**
   * 5. DELETE Operation: Soft delete a student
   * Instead of hard deleting, we update IsDeleted=true and keep audit tracking fields.
   */
  async softDelete(StudentRegistrationId: number, DeletedBy: string, DeletedRemarks?: string) {
    // Verify student exists
    await this.findOne(StudentRegistrationId);

    // Perform soft delete
    return this.prisma.student.update({
      where: { StudentRegistrationId },
      data: {
        IsDeleted: true,
        IsActive: false, // Turn off active status
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  /**
   * 6. BULK DELETE Operation: Soft delete multiple students at once
   */
  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    // Perform bulk updateMany to soft delete matching ids
    const result = await this.prisma.student.updateMany({
      where: {
        StudentRegistrationId: { in: ids },
        IsDeleted: false, // Only update those that aren't already deleted
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
      message: `Successfully soft-deleted ${result.count} student(s)`,
      count: result.count,
    };
  }

  /**
   * 7. CHANGE PASSWORD: Change student password
   */
  async changePassword(registrationNo: string, currentPasswordString: string, newPasswordString: string) {
    const student = await this.prisma.student.findUnique({
      where: { registrationNo },
    });

    if (!student || student.IsDeleted) {
      return { status: 'error', message: 'Student account not found' };
    }

    // Compare current password with stored hash
    const isPasswordValid = await bcrypt.compare(currentPasswordString, student.password);
    if (!isPasswordValid) {
      return { status: 'error', message: 'Current password is incorrect' };
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPasswordString, 10);

    // Update in database
    await this.prisma.student.update({
      where: { StudentRegistrationId: student.StudentRegistrationId },
      data: {
        password: hashedNewPassword,
      },
    });

    return { status: 'success', message: 'Password changed successfully' };
  }
}
