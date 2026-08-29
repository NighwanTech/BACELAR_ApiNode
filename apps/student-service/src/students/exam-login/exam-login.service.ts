import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

const DEFAULT_COLLEGE_NAME =
  '686-BHAGWAN AADINATH COLLEGE OF EDUCATION, MAHARRA, LALITPUR (U.P.)';

@Injectable()
export class ExamLoginService {
  constructor(private readonly prisma: PrismaService) {}

  private examLogin() {
    return (this.prisma as any).examLoginMaster;
  }

  private enrollment() {
    return (this.prisma as any).studentEnrollment;
  }

  private studentExam() {
    return (this.prisma as any).studentExam;
  }

  private studentExamPaper() {
    return (this.prisma as any).studentExamPaper;
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

  private parsePaperIds(csv: string | null | undefined): number[] {
    if (!csv) return [];
    return String(csv)
      .split(',')
      .map((v) => Number(String(v).trim()))
      .filter((n) => Number.isFinite(n) && n > 0);
  }

  private async loadStudentFull(studentId: number) {
    return this.prisma.student.findFirst({
      where: { StudentRegistrationId: studentId, IsDeleted: false },
      include: {
        studentProfile: true,
        program: { include: { programCategory: true } },
        year: true,
        semester: true,
        admissionSession: true,
        studentEnrollments: {
          include: {
            program: { include: { programCategory: true } },
            year: true,
            semester: true,
          },
          orderBy: { CreatedOn: 'desc' },
        },
        studentAttachments: true,
      },
    });
  }

  private pickAttachment(attachments: any[], type: string) {
    const match = (attachments || []).find(
      (a: any) => !a.IsDeleted && String(a.documentType || '').toUpperCase() === type,
    );
    if (!match?.fileUrl) return { url: null, name: null };
    const url = String(match.fileUrl);
    const name = url.split('/').pop() || null;
    return { url, name };
  }

  private async resolveExamTypeId(examTypeName: string) {
    try {
      const rows: any[] = await (this.prisma as any).examTypeMaster.findMany({
        where: { IsDeleted: false },
        select: { examTypeId: true, examTypeName: true },
      });
      const needle = String(examTypeName || '').trim().toUpperCase();
      const exact = rows.find((r) => String(r.examTypeName || '').toUpperCase() === needle);
      if (exact?.examTypeId) return exact.examTypeId as number;
      const fuzzy = rows.find((r) => String(r.examTypeName || '').toUpperCase().includes(needle));
      return fuzzy?.examTypeId || null;
    } catch {
      return null;
    }
  }

  private async resolveEnrollmentSnapshot(student: any) {
    const studentId = Number(student?.StudentRegistrationId);
    const enrollments = (student?.studentEnrollments || []).filter((e: any) => !e.IsDeleted);
    const enrollment: any = enrollments[0] || student?.studentEnrollments?.[0] || null;
    const examLogin: any = studentId
      ? await this.examLogin().findFirst({
          where: { studentId, IsDeleted: false },
        })
      : null;
    const enrollmentNo =
      enrollment?.enrollmentNo || examLogin?.enrollmentNo || null;
    return {
      enrollment,
      examLogin,
      enrollmentNo,
      enrollmentId: enrollment?.enrollmentId || examLogin?.enrollmentId || null,
    };
  }

  private async buildStudentExamSnapshot(student: any) {
    const profile: any = student?.studentProfile || {};
    const { enrollment, enrollmentNo } = await this.resolveEnrollmentSnapshot(student);
    const program: any = student?.program || enrollment?.program || null;
    const category: any = program?.programCategory || null;
    const photo = this.pickAttachment(student?.studentAttachments, 'PHOTO');
    const sign = this.pickAttachment(student?.studentAttachments, 'SIGNATURE');
    const examType = 'Regular';
    const examTypeId = await this.resolveExamTypeId(examType);

    let feeConfig: any = null;
    const programId = student?.programId || enrollment?.programId || program?.programId || null;
    const sessionId = student?.admissionSessionId || enrollment?.sessionId || null;
    if (programId && sessionId) {
      feeConfig = await (this.prisma as any).programFeeConfig.findFirst({
        where: {
          programId,
          admissionSessionId: sessionId,
          IsDeleted: false,
        },
      });
    }

    return {
      registrationNo: student?.registrationNo || enrollment?.registrationNo || null,
      enrollmentNo,
      studentNameEng: student?.candidateName || enrollment?.studentName || null,
      studentNameHindi: profile.studentNameHindi || null,
      fatherName: student?.fatherName || enrollment?.fatherName || null,
      motherName: profile.motherName || enrollment?.motherName || null,
      dob: profile.dateOfBirth || enrollment?.dateOfBirth || null,
      mobileNo: student?.mobileNo || profile.fatherMobileNumber || null,
      emailId: student?.email || enrollment?.emailId || null,
      rollNo: `ROLL${student.StudentRegistrationId}`,
      admissionNo: student?.registrationNo || null,
      examTypeId,
      examType,
      courseCategoryId: category?.programCategoryId || program?.programCategoryId || null,
      courseCategory: category?.programCategoryName || null,
      courseId: programId,
      courseShortName: program?.programName || null,
      yearId: student?.yearId || enrollment?.yearId || null,
      yearName: student?.year?.yearName || enrollment?.year?.yearName || null,
      semId: student?.semId || enrollment?.semId || null,
      semName: student?.semester?.semesterName || enrollment?.semester?.semesterName || null,
      sessionId,
      studentImgURL: photo.url,
      studentImgName: photo.name,
      studentSignImgURL: sign.url,
      studentSignImgName: sign.name,
      examFeeId: feeConfig?.feeConfigId || null,
      totalExamFee: feeConfig?.examinationFinal || feeConfig?.examinationBaseFee || 0,
    };
  }

  private async upsertStudentExamDraft(studentId: number, updatedBy: string) {
    const student = await this.loadStudentFull(studentId);
    if (!student) {
      throw new NotFoundException(`Student record not found for ID ${studentId}`);
    }

    const snapshot = await this.buildStudentExamSnapshot(student);
    const existing: any = await this.studentExam().findFirst({
      where: { studentId, IsDeleted: false },
      orderBy: { studentExamId: 'desc' },
    });

    if (existing) {
      const shouldSyncProgram =
        snapshot.courseId &&
        (existing.courseId !== snapshot.courseId || existing.courseShortName !== snapshot.courseShortName);
      const data: any = {
        registrationNo: snapshot.registrationNo,
        enrollmentNo: snapshot.enrollmentNo,
        studentNameEng: snapshot.studentNameEng,
        studentNameHindi: snapshot.studentNameHindi,
        fatherName: snapshot.fatherName,
        motherName: snapshot.motherName,
        dob: snapshot.dob,
        mobileNo: existing.mobileNo || snapshot.mobileNo,
        emailId: existing.emailId || snapshot.emailId,
        rollNo: existing.rollNo || snapshot.rollNo,
        admissionNo: snapshot.admissionNo,
        examTypeId: snapshot.examTypeId,
        examType: existing.examType || snapshot.examType,
        studentImgURL: snapshot.studentImgURL,
        studentImgName: snapshot.studentImgName,
        studentSignImgURL: snapshot.studentSignImgURL,
        studentSignImgName: snapshot.studentSignImgName,
        UpdatedBy: updatedBy,
      };
      if (shouldSyncProgram || !existing.courseId) {
        Object.assign(data, {
          courseCategoryId: snapshot.courseCategoryId,
          courseCategory: snapshot.courseCategory,
          courseId: snapshot.courseId,
          courseShortName: snapshot.courseShortName,
          yearId: snapshot.yearId,
          yearName: snapshot.yearName,
          semId: snapshot.semId,
          semName: snapshot.semName,
          sessionId: snapshot.sessionId,
          examFeeId: snapshot.examFeeId,
          totalExamFee: existing.isExamFeePaid ? existing.totalExamFee : snapshot.totalExamFee,
        });
      }
      return this.studentExam().update({
        where: { studentExamId: existing.studentExamId },
        data,
      });
    }

    return this.studentExam().create({
      data: {
        studentId,
        ...snapshot,
        IsActive: true,
        IsDeleted: false,
        CreatedBy: updatedBy,
      },
    });
  }

  private async replaceSelectedPapers(params: {
    studentExamId: number;
    studentId: number;
    enrollmentId?: number | null;
    enrollmentNo?: string | null;
    selectedPaperIds: number[];
    updatedBy: string;
  }) {
    const { studentExamId, studentId, enrollmentId, enrollmentNo, selectedPaperIds, updatedBy } = params;
    const uniqueIds = [
      ...new Set(
        selectedPaperIds
          .map((id) => Number(id))
          .filter((id) => Number.isFinite(id) && id > 0),
      ),
    ];

    const existingRows: any[] = await this.studentExamPaper().findMany({
      where: { studentExamId },
    });
    const existingByPaperId = new Map<number, any>(
      existingRows.filter((row) => row.paperId).map((row) => [Number(row.paperId), row]),
    );

    const papers: any[] = uniqueIds.length
      ? await (this.prisma as any).paperDetailMaster.findMany({
          where: { paperId: { in: uniqueIds }, IsDeleted: false },
          include: { paperTypeRelation: true },
        })
      : [];
    const paperById = new Map<number, any>(papers.map((p: any) => [p.paperId, p]));
    const keptIds: number[] = [];

    for (const paperId of uniqueIds) {
      const paper = paperById.get(paperId);
      const pCode = paper?.paperCode || String(paperId);
      const pName = paper?.paperName || 'SUBJECT / PAPER';
      const pType = paper?.paperTypeRelation?.name || paper?.paperType || 'THEORY';
      const payload = {
        studentExamId,
        studentId,
        enrollmentId: enrollmentId || null,
        enrollmentNo: enrollmentNo || null,
        paperId,
        paperType: pType,
        subjectName: paper?.subjectName || null,
        paperName: pName,
        paperCode: pCode,
        paperNameWithCode: `[${pCode}] ${String(pName).toUpperCase()}`,
        isChosen: true,
        IsActive: true,
        IsDeleted: false,
      };
      const existing = existingByPaperId.get(paperId);
      if (existing?.studentExamPaperId) {
        const updated = await this.studentExamPaper().update({
          where: { studentExamPaperId: existing.studentExamPaperId },
          data: {
            ...payload,
            UpdatedBy: updatedBy,
          },
        });
        keptIds.push(updated.studentExamPaperId);
      } else {
        const created = await this.studentExamPaper().create({
          data: {
            ...payload,
            CreatedBy: updatedBy,
          },
        });
        keptIds.push(created.studentExamPaperId);
      }
    }

    if (keptIds.length) {
      await this.studentExamPaper().updateMany({
        where: {
          studentExamId,
          studentExamPaperId: { notIn: keptIds },
        },
        data: {
          isChosen: false,
          IsDeleted: true,
          UpdatedBy: updatedBy,
        },
      });
    }

    await this.studentExam().update({
      where: { studentExamId },
      data: {
        selectedPaperIds: uniqueIds.join(','),
        UpdatedBy: updatedBy,
      },
    });
  }

  private async loadMasterPapers(programId: number | null, courseName: string | null) {
    let paperList: any[] = [];
    if (programId) {
      paperList = await (this.prisma as any).paperDetailMaster.findMany({
        where: { programId, IsDeleted: false },
        include: { paperTypeRelation: true, program: true, year: true, semester: true },
        orderBy: { paperId: 'asc' },
      });
    }
    if (!paperList.length && (programId || (courseName && courseName !== 'N/A'))) {
      paperList = await (this.prisma as any).paperDetailMaster.findMany({
        where: {
          OR: [
            ...(programId ? [{ programId }] : []),
            ...(courseName && courseName !== 'N/A' ? [{ program: { programName: courseName } }] : []),
          ],
          IsDeleted: false,
        },
        include: { paperTypeRelation: true, program: true, year: true, semester: true },
        orderBy: { paperId: 'asc' },
      });
    }
    return paperList;
  }

  private async latestExamPayment(studentId: number) {
    return this.prisma.studentPayment.findFirst({
      where: {
        studentId,
        feeType: 'EXAMINATION',
        IsDeleted: false,
      },
      orderBy: { CreatedOn: 'desc' },
    });
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
      student = await this.loadStudentFull(rawStudentId);
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
          student: true,
        },
      });
      if (enrollRec?.studentId) {
        student = await this.loadStudentFull(enrollRec.studentId);
      }
    }

    if (!student) {
      throw new NotFoundException(`Student record not found for enrollment "${dto.enrollmentNo}"`);
    }

    const studentId = student.StudentRegistrationId;
    const enrollmentRecord: any = student.studentEnrollments?.[0] || null;
    const profile: any = student.studentProfile || {};
    const enrollmentNo = dto.enrollmentNo || enrollmentRecord?.enrollmentNo || student.registrationNo;

    if (enrollmentRecord) {
      await this.enrollment().update({
        where: { enrollmentId: enrollmentRecord.enrollmentId },
        data: {
          examPassword: dto.password,
          UpdatedBy: 'Student Exam Registration',
        },
      });
    }

    const examLoginRecord: any = await this.examLogin().upsert({
      where: { studentId },
      update: {
        enrollmentId: enrollmentRecord?.enrollmentId || null,
        enrollmentNo,
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
        examType: 'Regular',
        collegeName: DEFAULT_COLLEGE_NAME,
        UpdatedBy: 'Student Exam Password Create',
      },
      create: {
        studentId,
        enrollmentId: enrollmentRecord?.enrollmentId || null,
        enrollmentNo,
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
        examType: 'Regular',
        collegeName: DEFAULT_COLLEGE_NAME,
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

    const isPasswordMatch =
      examLogin.password === dto.password ||
      examLogin.plainPassword === dto.password ||
      enrollmentRecord?.examPassword === dto.password ||
      enrollmentRecord?.loginPassword === dto.password ||
      loginMasterPwd === dto.password;

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid User ID or Password. Please check your password and try again.');
    }

    const examForm: any = await this.studentExam().findFirst({
      where: { studentId: examLogin.studentId, IsDeleted: false },
      orderBy: { studentExamId: 'desc' },
    });

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
        programId: examForm?.courseId || studentRecord?.programId || null,
        yearId: examForm?.yearId || studentRecord?.yearId || null,
        semId: examForm?.semId || studentRecord?.semId || null,
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

    const student: any = await this.loadStudentFull(sId);

    let examLoginRecord: any = await this.examLogin().findFirst({
      where: { studentId: sId, IsDeleted: false },
    });

    if (!examLoginRecord && student) {
      const liveEnrollments = (student.studentEnrollments || []).filter((e: any) => !e.IsDeleted);
      const enrollmentNo = liveEnrollments[0]?.enrollmentNo || student.registrationNo;
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

    let examForm: any = await this.studentExam().findFirst({
      where: { studentId: sId, IsDeleted: false },
      orderBy: { studentExamId: 'desc' },
    });
    if (!examForm && student) {
      examForm = {
        studentExamId: null,
        ...(await this.buildStudentExamSnapshot(student)),
        isExamFeePaid: false,
        isExamFormFinalSubmit: false,
        selectedPaperIds: null,
        examPaymentIds: null,
      };
    }
    if (!examForm) {
      throw new NotFoundException(`Student record not found for ID ${sId}`);
    }
    const profile: any = student?.studentProfile || {};
    const examPayment = await this.latestExamPayment(sId);
    const paymentStatus =
      examForm.isExamFeePaid || examPayment?.paymentStatus === 'SUCCESS'
        ? 'SUCCESS'
        : examPayment?.paymentStatus || 'PENDING';

    const studentDetails = {
      studentId: sId,
      studentExamId: examForm.studentExamId,
      registrationNo: examForm.registrationNo || examLoginRecord.registrationNo || student?.registrationNo || 'N/A',
      enrollmentNo: examForm.enrollmentNo || examLoginRecord.enrollmentNo || 'N/A',
      rollNo: examForm.rollNo || examLoginRecord.rollNo || `ROLL${sId}`,
      courseName: examForm.courseShortName || 'N/A',
      studentName: examForm.studentNameEng || examLoginRecord.studentName || student?.candidateName || 'N/A',
      fatherName: examForm.fatherName || examLoginRecord.fatherName || student?.fatherName || 'N/A',
      motherName: examForm.motherName || examLoginRecord.motherName || profile.motherName || 'N/A',
      category: examLoginRecord.category || profile.category || 'General',
      mobile: examForm.mobileNo || examLoginRecord.mobileNo || student?.mobileNo || profile.fatherMobileNumber || 'N/A',
      dateOfBirth: this.formatDate(examForm.dob || examLoginRecord.dateOfBirth || profile.dateOfBirth),
      emailId: examForm.emailId || examLoginRecord.emailId || student?.email || 'N/A',
      address: examLoginRecord.address || profile.CaddressLine1 || profile.PaddressLine1 || 'N/A',
      examType: examForm.examType || examLoginRecord.examType || 'Regular',
      examinationFees: examForm.totalExamFee || 0,
      collegeName: examLoginRecord.collegeName || DEFAULT_COLLEGE_NAME,
      isFormSubmitted: Boolean(examForm.isExamFormFinalSubmit),
      declarationAccepted: Boolean(examForm.isExamFormFinalSubmit),
      paymentStatus,
    };

    const savedPapers: any[] = examForm.studentExamId
      ? await this.studentExamPaper().findMany({
          where: { studentExamId: examForm.studentExamId },
          orderBy: { studentExamPaperId: 'asc' },
        })
      : [];
    const livePapers = savedPapers.filter((p) => !p.IsDeleted);
    const papersForUi = livePapers.length ? livePapers : savedPapers.filter((p) => p.isChosen);
    const selectedPaperIds = papersForUi.length
      ? papersForUi.filter((p) => p.isChosen).map((p) => p.paperId).filter(Boolean)
      : this.parsePaperIds(examForm.selectedPaperIds);

    const masterPapers = await this.loadMasterPapers(examForm.courseId || null, examForm.courseShortName || null);
    const masterById = new Map<number, any>(masterPapers.map((p: any) => [p.paperId, p]));
    const savedByPaperId = new Map<number, any>(
      papersForUi.filter((p) => p.paperId).map((p) => [p.paperId, p]),
    );

    const orderedIds: number[] = [];
    for (const paper of masterPapers) orderedIds.push(paper.paperId);
    for (const row of savedPapers) {
      if (row.paperId && !orderedIds.includes(row.paperId)) orderedIds.push(row.paperId);
    }

    const isBEdCourse =
      String(examForm.courseShortName || '').toUpperCase().includes('B.ED') ||
      String(examForm.courseShortName || '').toUpperCase().includes('BED');

    const paperDetails = orderedIds.map((paperId, index) => {
      const saved = savedByPaperId.get(paperId);
      const paper = masterById.get(paperId);
      const pCode = saved?.paperCode || paper?.paperCode || `${paperId}`;
      const pName = saved?.paperName || paper?.paperName || 'SUBJECT / PAPER';
      let pType = saved?.paperType || paper?.paperTypeRelation?.name || paper?.paperType || 'THEORY';

      if (
        isBEdCourse &&
        (String(pType).toUpperCase().includes('COMPULS') ||
          String(pType).toUpperCase().includes('MANDATORY') ||
          index === 0)
      ) {
        pType = 'MAJOR (COMPULSORY)';
      }

      const isChosen =
        selectedPaperIds.length === 0 ? true : selectedPaperIds.includes(paperId);

      return {
        sNo: index + 1,
        paperId,
        paperType: pType,
        subjectName: saved?.subjectName || paper?.subjectName || null,
        paperNameWithCode: saved?.paperNameWithCode || `[${pCode}] ${String(pName).toUpperCase()}`,
        paperCode: pCode,
        paperName: pName,
        isChosen,
      };
    });

    // Dynamic Master & Student Exam Queries for Exam Forms
    let masterExams: any[] = [];
    try {
      masterExams = await (this.prisma as any).examinationDetails.findMany({
        where: { IsDeleted: false, IsActive: true },
        orderBy: { examinationId: 'asc' },
      });
    } catch {
      masterExams = [];
    }

    let studentExams: any[] = [];
    try {
      studentExams = await this.studentExam().findMany({
        where: { studentId: sId, IsDeleted: false },
        include: { examinationDetail: true },
        orderBy: { studentExamId: 'asc' },
      });
    } catch {
      studentExams = [];
    }

    let examForms: any[] = [];

    if (studentExams.length > 0) {
      examForms = studentExams.map((se: any, idx: number) => {
        const isPaid = Boolean(se.isExamFeePaid || (idx === 0 && paymentStatus === 'SUCCESS'));
        return {
          srNo: idx + 1,
          studentExamId: se.studentExamId,
          enrollmentNo: se.enrollmentNo || examForm.enrollmentNo || student?.registrationNo || 'N/A',
          studentName: se.studentNameEng || examForm.studentNameEng || student?.candidateName || 'N/A',
          examType: (se.examType || se.examinationDetail?.examType || 'REGULAR').toUpperCase(),
          examName: se.examinationName || se.examinationDetail?.examinationName || examForm.examinationName || 'Jan 2026',
          isFormSubmitted: Boolean(se.isExamFormFinalSubmit),
          isFeePaid: isPaid,
          paymentStatus: isPaid ? 'SUCCESS' : 'PENDING',
          feeAmount: se.totalExamFee || examForm.totalExamFee || 0,
        };
      });
    } else if (masterExams.length > 0) {
      examForms = masterExams.map((me: any, idx: number) => {
        const isPaid = idx === 0 && paymentStatus === 'SUCCESS';
        return {
          srNo: idx + 1,
          studentExamId: examForm.studentExamId || null,
          enrollmentNo: examForm.enrollmentNo || examLoginRecord.enrollmentNo || student?.registrationNo || 'N/A',
          studentName: examForm.studentNameEng || examLoginRecord.studentName || student?.candidateName || 'N/A',
          examType: (me.examType || 'REGULAR').toUpperCase(),
          examName: me.examinationName || examForm.examinationName || 'Jan 2026',
          isFormSubmitted: Boolean(examForm.isExamFormFinalSubmit),
          isFeePaid: isPaid,
          paymentStatus: isPaid ? 'SUCCESS' : 'PENDING',
          feeAmount: examForm.totalExamFee || 0,
        };
      });
    } else {
      const isPaid = paymentStatus === 'SUCCESS';
      examForms = [
        {
          srNo: 1,
          studentExamId: examForm.studentExamId || null,
          enrollmentNo: examForm.enrollmentNo || examLoginRecord.enrollmentNo || student?.registrationNo || 'N/A',
          studentName: examForm.studentNameEng || examLoginRecord.studentName || student?.candidateName || 'N/A',
          examType: (examForm.examType || examLoginRecord.examType || 'REGULAR').toUpperCase(),
          examName: examForm.examinationName || 'Jan 2026',
          isFormSubmitted: Boolean(examForm.isExamFormFinalSubmit),
          isFeePaid: isPaid,
          paymentStatus: isPaid ? 'SUCCESS' : 'PENDING',
          feeAmount: examForm.totalExamFee || 0,
        },
      ];
    }

    return {
      studentDetails,
      paperDetails,
      examForms,
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

    const examForm: any = await this.studentExam().findFirst({
      where: { studentId: sId, IsDeleted: false },
      orderBy: { studentExamId: 'desc' },
    });
    if (examForm) {
      const examPayload: any = { UpdatedBy: 'Student Dashboard Update' };
      if (dto.emailId !== undefined) examPayload.emailId = dto.emailId;
      if (dto.mobileNo !== undefined) examPayload.mobileNo = dto.mobileNo;
      await this.studentExam().update({
        where: { studentExamId: examForm.studentExamId },
        data: examPayload,
      });
    }

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

    const student: any = await this.loadStudentFull(sId);
    if (!student) {
      throw new NotFoundException(`Student record not found for ID ${sId}`);
    }

    const examForm: any = await this.upsertStudentExamDraft(sId, 'Student Form Submit');
    const { enrollmentId, enrollmentNo } = await this.resolveEnrollmentSnapshot(student);
    const savedEnrollmentNo = enrollmentNo || examForm.enrollmentNo || null;

    await this.replaceSelectedPapers({
      studentExamId: examForm.studentExamId,
      studentId: sId,
      enrollmentId,
      enrollmentNo: savedEnrollmentNo,
      selectedPaperIds: dto.selectedPapers,
      updatedBy: 'Student Form Submit',
    });

    await this.studentExam().update({
      where: { studentExamId: examForm.studentExamId },
      data: {
        enrollmentNo: savedEnrollmentNo,
        isExamFormFinalSubmit: Boolean(dto.declarationAccepted),
        UpdatedBy: 'Student Form Submit',
      },
    });

    return {
      success: true,
      message: 'Examination form submitted successfully. Please proceed to fee payment.',
      studentExamId: examForm.studentExamId,
    };
  }
}
