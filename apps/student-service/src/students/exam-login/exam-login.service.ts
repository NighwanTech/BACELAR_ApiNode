import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class ExamLoginService {
  constructor(private readonly prisma: PrismaService) {}

  private examLogin() {
    return (this.prisma as any).examLoginMaster;
  }

  private enrollment() {
    return (this.prisma as any).studentEnrollment;
  }

  private formatDate(dateVal: any): string | null {
    if (!dateVal) return null;
    const d = new Date(dateVal);
    if (Number.isNaN(d.getTime())) return null;
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  private toIsoDateString(dateVal: any): string | null {
    if (!dateVal) return null;
    if (typeof dateVal === 'string' && /^\d{4}-\d{2}-\d{2}/.test(dateVal)) {
      return dateVal.slice(0, 10);
    }
    const d = new Date(dateVal);
    if (Number.isNaN(d.getTime())) return null;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  /**
   * 1. Verify Student Enrollment & Date of Birth (for Registration Pop-up)
   */
  async verifyEnrollment(dto: { enrollmentNo: string; dateOfBirth: string }) {
    const rawEnrollNo = String(dto.enrollmentNo || '').trim();
    if (!rawEnrollNo) {
      throw new BadRequestException('Please enter Enrollment Number');
    }
    if (!dto.dateOfBirth) {
      throw new BadRequestException('Please select Date of Birth');
    }

    const inputDobStr = this.toIsoDateString(dto.dateOfBirth);
    const bacePattern = rawEnrollNo.toUpperCase().startsWith('BACE')
      ? rawEnrollNo.toUpperCase()
      : `BACE${rawEnrollNo.toUpperCase()}`;
    const cleanInput = rawEnrollNo.replace(/^BACE/i, '').trim();

    let enrollmentRecord: any = await this.enrollment().findFirst({
      where: {
        OR: [
          { enrollmentNo: rawEnrollNo },
          { enrollmentNo: bacePattern },
          { enrollmentNo: cleanInput },
          { registrationNo: rawEnrollNo },
          { registrationNo: bacePattern },
          { registrationNo: cleanInput },
        ],
        IsDeleted: false,
      },
      include: {
        student: {
          include: {
            studentProfile: true,
            program: true,
            year: true,
            semester: true,
            admissionSession: true,
          },
        },
        program: true,
        year: true,
        semester: true,
        session: true,
      },
    });

    if (!enrollmentRecord) {
      // Fallback search directly in student table by registrationNo
      const student: any = await this.prisma.student.findFirst({
        where: {
          OR: [
            { registrationNo: rawEnrollNo },
            { registrationNo: bacePattern },
            { registrationNo: cleanInput },
          ],
          IsDeleted: false,
        },
        include: {
          studentProfile: true,
          program: true,
          year: true,
          semester: true,
          admissionSession: true,
          studentEnrollments: true,
        },
      });

      if (student) {
        enrollmentRecord = {
          studentId: student.StudentRegistrationId,
          enrollmentId: student.studentEnrollments[0]?.enrollmentId || null,
          enrollmentNo: student.studentEnrollments[0]?.enrollmentNo || rawEnrollNo,
          registrationNo: student.registrationNo,
          studentName: student.candidateName,
          fatherName: student.fatherName,
          motherName: student.studentProfile?.motherName || null,
          program: student.program,
          year: student.year,
          semester: student.semester,
          student: student,
          dateOfBirth: student.studentProfile?.dateOfBirth || null,
          emailId: student.email,
        };
      }
    }

    if (!enrollmentRecord) {
      throw new NotFoundException(`No Enrollment Number found matching "${rawEnrollNo}". Please check and try again.`);
    }

    const profile: any = enrollmentRecord.student?.studentProfile || {};
    const profileDob = enrollmentRecord.dateOfBirth || profile.dateOfBirth;

    if (profileDob && inputDobStr) {
      const profileDobStr = this.toIsoDateString(profileDob);
      if (profileDobStr && profileDobStr !== inputDobStr) {
        throw new BadRequestException(`Date of Birth does not match our records for Enrollment No. "${rawEnrollNo}".`);
      }
    }

    const targetStudentId = enrollmentRecord.studentId || enrollmentRecord.student?.StudentRegistrationId;

    const existingExamLogin: any = await this.examLogin().findFirst({
      where: {
        studentId: targetStudentId,
        IsDeleted: false,
      },
    });

    const isPasswordAlreadySet = Boolean(
      existingExamLogin?.isPasswordSet || enrollmentRecord.examPassword,
    );

    const student: any = enrollmentRecord.student || {};

    return {
      isFound: true,
      alreadyRegistered: isPasswordAlreadySet,
      studentId: targetStudentId,
      enrollmentId: enrollmentRecord.enrollmentId,
      registrationNo: enrollmentRecord.registrationNo || student.registrationNo || null,
      enrollmentNo: enrollmentRecord.enrollmentNo || rawEnrollNo,
      candidateName: enrollmentRecord.studentName || student.candidateName || null,
      fatherName: enrollmentRecord.fatherName || student.fatherName || null,
      motherName: enrollmentRecord.motherName || profile.motherName || null,
      programName: enrollmentRecord.program?.programName || student.program?.programName || null,
      yearName: enrollmentRecord.year?.yearName || student.year?.yearName || null,
      semesterName: enrollmentRecord.semester?.semesterName || student.semester?.semesterName || null,
      email: enrollmentRecord.emailId || student.email || null,
      mobileNo: profile.fatherMobileNumber || student.mobileNo || null,
      dateOfBirth: this.formatDate(profileDob),
    };
  }

  /**
   * 2. Create / Set Exam Password ONLY (ISOLATED FROM MAIN LOGIN MASTER)
   */
  async createPassword(dto: { studentId: number; enrollmentId?: number; enrollmentNo: string; password: string }) {
    const rawStudentId = Number(dto.studentId);
    let student: any = null;

    if (rawStudentId) {
      student = await this.prisma.student.findFirst({
        where: { StudentRegistrationId: rawStudentId, IsDeleted: false },
        include: {
          studentProfile: true,
          program: true,
          year: true,
          semester: true,
          admissionSession: true,
        },
      });
    }

    if (!student && dto.enrollmentNo) {
      const rawEnrollNo = dto.enrollmentNo.trim();
      const bacePattern = rawEnrollNo.toUpperCase().startsWith('BACE')
        ? rawEnrollNo.toUpperCase()
        : `BACE${rawEnrollNo.toUpperCase()}`;
      const cleanInput = rawEnrollNo.replace(/^BACE/i, '').trim();

      const enrollRec: any = await this.enrollment().findFirst({
        where: {
          OR: [
            { enrollmentNo: rawEnrollNo },
            { enrollmentNo: bacePattern },
            { enrollmentNo: cleanInput },
            { registrationNo: rawEnrollNo },
            { registrationNo: bacePattern },
            { registrationNo: cleanInput },
          ],
          IsDeleted: false,
        },
        include: {
          student: {
            include: {
              studentProfile: true,
              program: true,
              year: true,
              semester: true,
              admissionSession: true,
            },
          },
        },
      });
      student = enrollRec?.student;
    }

    if (!student) {
      throw new NotFoundException(`Student record not found for enrollment "${dto.enrollmentNo}"`);
    }

    const studentId = student.StudentRegistrationId;

    const enrollmentRecord: any = await this.enrollment().findFirst({
      where: { studentId, IsDeleted: false },
      orderBy: { CreatedOn: 'desc' },
    });

    const profile: any = student.studentProfile || {};
    const enrollmentNo = dto.enrollmentNo || enrollmentRecord?.enrollmentNo || student.registrationNo;

    // UPDATE EXAM PASSWORD ONLY in StudentEnrollment (Do NOT touch loginPassword!)
    if (enrollmentRecord) {
      await this.enrollment().update({
        where: { enrollmentId: enrollmentRecord.enrollmentId },
        data: {
          examPassword: dto.password,
          UpdatedBy: 'Student Exam Registration',
        },
      });
    }

    let examFee = 0;
    if (student.programId && student.admissionSessionId) {
      const feeConfig: any = await (this.prisma as any).programFeeConfig.findFirst({
        where: {
          programId: student.programId,
          admissionSessionId: student.admissionSessionId,
          IsDeleted: false,
        },
      });
      if (feeConfig) {
        examFee = feeConfig.examinationFinal || feeConfig.examinationBaseFee || 0;
      }
    }

    const resolvedProgramId = student.programId || enrollmentRecord?.programId || null;
    const resolvedCourseName = student.program?.programName || enrollmentRecord?.program?.programName || null;

    // Save ONLY into ExamLoginMaster
    const examLoginRecord: any = await this.examLogin().upsert({
      where: { studentId },
      update: {
        enrollmentId: enrollmentRecord?.enrollmentId || null,
        enrollmentNo: enrollmentNo,
        registrationNo: student.registrationNo || null,
        studentName: student.candidateName,
        fatherName: student.fatherName,
        motherName: profile.motherName || null,
        dateOfBirth: profile.dateOfBirth || null,
        gender: profile.gender || null,
        category: profile.category || 'General',
        emailId: student.email || null,
        mobileNo: student.mobileNo || profile.fatherMobileNumber || null,
        address: profile.CaddressLine1 || profile.PaddressLine1 || null,
        password: dto.password,
        plainPassword: dto.password,
        isPasswordSet: true,
        programId: resolvedProgramId,
        courseName: resolvedCourseName,
        yearId: student.yearId || null,
        semId: student.semId || null,
        sessionId: student.admissionSessionId || null,
        collegeName: '686-BHAGWAN AADINATH COLLEGE OF EDUCATION, MAHARRA, LALITPUR (U.P.)',
        examinationFees: examFee,
        UpdatedBy: 'Student Exam Password Create',
      },
      create: {
        studentId: studentId,
        enrollmentId: enrollmentRecord?.enrollmentId || null,
        enrollmentNo: enrollmentNo,
        registrationNo: student.registrationNo || null,
        rollNo: `ROLL${studentId}`,
        studentName: student.candidateName,
        fatherName: student.fatherName,
        motherName: profile.motherName || null,
        dateOfBirth: profile.dateOfBirth || null,
        gender: profile.gender || null,
        category: profile.category || 'General',
        emailId: student.email || null,
        mobileNo: student.mobileNo || profile.fatherMobileNumber || null,
        address: profile.CaddressLine1 || profile.PaddressLine1 || null,
        password: dto.password,
        plainPassword: dto.password,
        isPasswordSet: true,
        programId: resolvedProgramId,
        courseName: resolvedCourseName,
        yearId: student.yearId || null,
        semId: student.semId || null,
        sessionId: student.admissionSessionId || null,
        examType: 'Regular',
        collegeName: '686-BHAGWAN AADINATH COLLEGE OF EDUCATION, MAHARRA, LALITPUR (U.P.)',
        examinationFees: examFee,
        CreatedBy: 'Student Exam Password Create',
      },
    });

    return {
      success: true,
      message: 'Exam portal password created successfully. You can now login to Exam Portal.',
      enrollmentNo: examLoginRecord.enrollmentNo,
      studentId: examLoginRecord.studentId,
    };
  }

  /**
   * 3. Student Exam Portal Login (FLEXIBLE USER ID + MULTI-PASSWORD MATCHING)
   */
  async login(dto: { enrollmentNo: string; password: string }) {
    const rawInput = String(dto.enrollmentNo || '').trim();
    if (!rawInput || !dto.password) {
      throw new BadRequestException('Enrollment Number / Registration Number and Password are required');
    }

    const bacePattern = rawInput.toUpperCase().startsWith('BACE')
      ? rawInput.toUpperCase()
      : `BACE${rawInput.toUpperCase()}`;

    const cleanInput = rawInput.replace(/^BACE/i, '').trim();

    // 1. Search ExamLoginMaster by Enrollment No or Registration No or Clean Input
    let examLogin: any = await this.examLogin().findFirst({
      where: {
        OR: [
          { enrollmentNo: rawInput },
          { enrollmentNo: bacePattern },
          { enrollmentNo: cleanInput },
          { registrationNo: rawInput },
          { registrationNo: bacePattern },
          { registrationNo: cleanInput },
        ],
        IsDeleted: false,
      },
    });

    // 2. Search StudentEnrollment or Student table if not found in ExamLoginMaster
    let enrollmentRecord: any = null;
    let studentRecord: any = null;

    if (!examLogin) {
      enrollmentRecord = await this.enrollment().findFirst({
        where: {
          OR: [
            { enrollmentNo: rawInput },
            { enrollmentNo: bacePattern },
            { enrollmentNo: cleanInput },
            { registrationNo: rawInput },
            { registrationNo: bacePattern },
            { registrationNo: cleanInput },
          ],
          IsDeleted: false,
        },
      });

      if (enrollmentRecord) {
        studentRecord = await this.prisma.student.findFirst({
          where: { StudentRegistrationId: enrollmentRecord.studentId, IsDeleted: false },
          include: { loginMaster: true },
        });
      } else {
        studentRecord = await this.prisma.student.findFirst({
          where: {
            OR: [
              { registrationNo: rawInput },
              { registrationNo: bacePattern },
              { registrationNo: cleanInput },
            ],
            IsDeleted: false,
          },
          include: { loginMaster: true },
        });
      }

      const foundStudentId = enrollmentRecord?.studentId || studentRecord?.StudentRegistrationId;
      if (foundStudentId) {
        examLogin = await this.examLogin().findFirst({
          where: { studentId: foundStudentId, IsDeleted: false },
        });
      }
    }

    if (!examLogin && (enrollmentRecord || studentRecord)) {
      const targetStudentId = enrollmentRecord?.studentId || studentRecord?.StudentRegistrationId;
      const targetEnrollmentNo = enrollmentRecord?.enrollmentNo || studentRecord?.registrationNo || rawInput;

      // Auto create exam login entry if student exists but exam password hasn't been created in ExamLoginMaster yet
      const res = await this.createPassword({
        studentId: targetStudentId,
        enrollmentId: enrollmentRecord?.enrollmentId,
        enrollmentNo: targetEnrollmentNo,
        password: dto.password,
      });
      examLogin = await this.examLogin().findFirst({ where: { studentId: res.studentId } });
    }

    if (!examLogin) {
      throw new UnauthorizedException(`Student record not found for "${rawInput}". Please check your User ID / Registration No.`);
    }

    // Fetch Student & LoginMaster to check all password fields
    if (!studentRecord && examLogin.studentId) {
      studentRecord = await this.prisma.student.findFirst({
        where: { StudentRegistrationId: examLogin.studentId },
        include: { loginMaster: true },
      });
    }

    if (!enrollmentRecord && examLogin.studentId) {
      enrollmentRecord = await this.enrollment().findFirst({
        where: { studentId: examLogin.studentId, IsDeleted: false },
      });
    }

    const loginMasterPwd = studentRecord?.loginMaster?.PlainPassword || studentRecord?.loginMaster?.Password;

    // Check Exam Password OR LoginMaster Password OR StudentEnrollment passwords
    const isPasswordMatch =
      examLogin.password === dto.password ||
      examLogin.plainPassword === dto.password ||
      enrollmentRecord?.examPassword === dto.password ||
      enrollmentRecord?.loginPassword === dto.password ||
      loginMasterPwd === dto.password;

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid User ID or Password. Please check your password and try again.');
    }

    return {
      success: true,
      message: 'Exam Portal login successful',
      token: `EXAM_TOKEN_${examLogin.studentId}_${Date.now()}`,
      student: {
        studentId: examLogin.studentId,
        enrollmentId: examLogin.enrollmentId,
        enrollmentNo: examLogin.enrollmentNo,
        registrationNo: examLogin.registrationNo,
        studentName: examLogin.studentName,
        emailId: examLogin.emailId,
        mobileNo: examLogin.mobileNo,
        programId: examLogin.programId,
        yearId: examLogin.yearId,
        semId: examLogin.semId,
      },
    };
  }

  /**
   * 4. Get Dashboard Data (Personal Information + Real-Time Paper Details Table)
   */
  async getDashboardData(studentId: number) {
    const sId = Number(studentId);
    if (!sId) {
      throw new BadRequestException('Valid Student ID is required');
    }

    // 1. Fetch Student from DB to get latest programId & details
    const student: any = await this.prisma.student.findFirst({
      where: { StudentRegistrationId: sId },
      include: {
        studentProfile: true,
        program: true,
        year: true,
        semester: true,
        admissionSession: true,
        studentEnrollments: {
          include: {
            program: true,
            year: true,
            semester: true,
          },
        },
      },
    });

    let examLoginRecord: any = await this.examLogin().findFirst({
      where: { studentId: sId, IsDeleted: false },
    });

    if (!examLoginRecord && student) {
      const enrollmentNo = student.studentEnrollments?.[0]?.enrollmentNo || student.registrationNo;
      await this.createPassword({
        studentId: sId,
        enrollmentNo,
        password: student.studentEnrollments?.[0]?.examPassword || '123456',
      });
      examLoginRecord = await this.examLogin().findFirst({ where: { studentId: sId } });
    }

    if (!examLoginRecord) {
      throw new NotFoundException(`Student record not found for ID ${sId}`);
    }

    const enrollmentRec = student?.studentEnrollments?.[0];
    const profile: any = student?.studentProfile || {};

    const resolvedProgramId = student?.programId || enrollmentRec?.programId || examLoginRecord?.programId || null;
    const resolvedCourseName = student?.program?.programName || enrollmentRec?.program?.programName || examLoginRecord?.courseName || 'N/A';

    // DYNAMIC SYNC: Update ExamLoginMaster if programId was updated in Student table after initial registration!
    if (resolvedProgramId && (examLoginRecord.programId !== resolvedProgramId || examLoginRecord.courseName !== resolvedCourseName)) {
      await this.examLogin().update({
        where: { studentId: sId },
        data: {
          programId: resolvedProgramId,
          courseName: resolvedCourseName,
        },
      });
      examLoginRecord.programId = resolvedProgramId;
      examLoginRecord.courseName = resolvedCourseName;
    }

    const studentDetails = {
      studentId: examLoginRecord.studentId,
      registrationNo: examLoginRecord.registrationNo || student?.registrationNo || 'N/A',
      enrollmentNo: examLoginRecord.enrollmentNo || 'N/A',
      rollNo: examLoginRecord.rollNo || `BED${String(sId).padStart(6, '0')}`,
      courseName: examLoginRecord.courseName || resolvedCourseName,
      studentName: examLoginRecord.studentName || student?.candidateName || 'N/A',
      fatherName: examLoginRecord.fatherName || student?.fatherName || 'N/A',
      motherName: examLoginRecord.motherName || profile.motherName || 'N/A',
      category: examLoginRecord.category || profile.category || 'General',
      mobile: examLoginRecord.mobileNo || student?.mobileNo || profile.fatherMobileNumber || 'N/A',
      dateOfBirth: this.formatDate(examLoginRecord.dateOfBirth || profile.dateOfBirth),
      emailId: examLoginRecord.emailId || student?.email || 'N/A',
      address: examLoginRecord.address || profile.CaddressLine1 || profile.PaddressLine1 || 'N/A',
      examType: examLoginRecord.examType || 'Regular',
      examinationFees: examLoginRecord.examinationFees || 4350.0,
      collegeName: examLoginRecord.collegeName || '686-BHAGWAN AADINATH COLLEGE OF EDUCATION, MAHARRA, LALITPUR (U.P.)',
      isFormSubmitted: examLoginRecord.isFormSubmitted || false,
      declarationAccepted: examLoginRecord.declarationAccepted || false,
      paymentStatus: examLoginRecord.paymentStatus || 'PENDING',
    };

    // REAL-TIME DYNAMIC PAPER LOOKUP: Search papers by resolvedProgramId OR courseName!
    let paperList: any[] = [];

    if (resolvedProgramId) {
      paperList = await (this.prisma as any).paperDetailMaster.findMany({
        where: {
          programId: resolvedProgramId,
          IsDeleted: false,
        },
        include: {
          paperTypeRelation: true,
          program: true,
          year: true,
          semester: true,
        },
        orderBy: { paperId: 'asc' },
      });
    }

    // Fallback: If no papers found by programId number, match by program name or unassigned master papers
    if (!paperList || paperList.length === 0) {
      paperList = await (this.prisma as any).paperDetailMaster.findMany({
        where: {
          OR: [
            ...(resolvedProgramId ? [{ programId: resolvedProgramId }] : []),
            ...(resolvedCourseName !== 'N/A' ? [{ program: { programName: resolvedCourseName } }] : []),
          ],
          IsDeleted: false,
        },
        include: {
          paperTypeRelation: true,
          program: true,
          year: true,
          semester: true,
        },
        orderBy: { paperId: 'asc' },
      });
    }

    const selectedPaperIds: number[] = Array.isArray(examLoginRecord.selectedPapers)
      ? (examLoginRecord.selectedPapers as number[])
      : [];

    const paperDetails = paperList.map((paper: any, index: number) => {
      const pCode = paper.paperCode ? paper.paperCode : `${1490 + index + 1}`;
      const pName = paper.paperName || 'SUBJECT / PAPER';
      const pType = paper.paperTypeRelation?.name || paper.paperType || (index < 3 ? 'Compulsory' : 'Elective');

      return {
        sNo: index + 1,
        paperId: paper.paperId,
        paperType: pType,
        subjectName: paper.subjectName || null,
        paperNameWithCode: `[${pCode}] ${pName.toUpperCase()}`,
        paperCode: pCode,
        paperName: pName,
        isChosen: selectedPaperIds.length === 0 ? true : selectedPaperIds.includes(paper.paperId),
      };
    });

    return {
      studentDetails,
      paperDetails,
    };
  }

  /**
   * 5. Update Profile
   */
  async updateProfile(studentId: number, dto: { emailId?: string; mobileNo?: string; address?: string }) {
    const sId = Number(studentId);
    const payload: any = { UpdatedBy: 'Student Dashboard Update' };
    if (dto.emailId !== undefined) payload.emailId = dto.emailId;
    if (dto.mobileNo !== undefined) payload.mobileNo = dto.mobileNo;
    if (dto.address !== undefined) payload.address = dto.address;

    await this.examLogin().update({
      where: { studentId: sId },
      data: payload,
    });

    if (dto.emailId || dto.mobileNo) {
      await this.prisma.student.update({
        where: { StudentRegistrationId: sId },
        data: {
          ...(dto.emailId ? { email: dto.emailId } : {}),
          ...(dto.mobileNo ? { mobileNo: dto.mobileNo } : {}),
        },
      });
    }

    return {
      success: true,
      message: 'Profile details updated successfully',
    };
  }

  /**
   * 6. Submit Form
   */
  async submitForm(studentId: number, dto: { selectedPapers: number[]; declarationAccepted: boolean }) {
    const sId = Number(studentId);
    if (!dto.selectedPapers || dto.selectedPapers.length === 0) {
      throw new BadRequestException('At least one paper must be selected');
    }

    await this.examLogin().update({
      where: { studentId: sId },
      data: {
        selectedPapers: dto.selectedPapers,
        declarationAccepted: Boolean(dto.declarationAccepted),
        isFormSubmitted: true,
        UpdatedBy: 'Student Form Submit',
      },
    });

    return {
      success: true,
      message: 'Examination form submitted successfully. Please proceed to fee payment.',
    };
  }
}
