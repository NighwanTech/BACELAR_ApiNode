import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../common/active-only';

@Injectable()
export class ExamResultService {
  constructor(private readonly prisma: PrismaService) {}

  private examResultDb() {
    return (this.prisma as any).examResult;
  }

  private toNum(value: any): number | null {
    if (value === undefined || value === null || value === '') return null;
    const n = Number(value);
    return Number.isNaN(n) ? null : n;
  }

  private toDate(value: any): Date | null {
    if (!value) return null;
    const d = value instanceof Date ? value : new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  private async snapshotStudent(studentId: number) {
    let student = await this.prisma.student.findFirst({
      where: { StudentRegistrationId: studentId, IsDeleted: false },
      include: {
        studentProfile: true,
        studentEnrollments: {
          where: { IsDeleted: false },
          orderBy: { enrollmentId: 'desc' },
          take: 1,
        },
        studentRollNumbers: {
          where: { IsDeleted: false },
          orderBy: { rollId: 'desc' },
          take: 1,
        },
      },
    });
    if (!student) {
      student = await this.prisma.student.findFirst({
        where: { StudentRegistrationId: studentId },
        include: {
          studentProfile: true,
          studentEnrollments: {
            orderBy: { enrollmentId: 'desc' },
            take: 1,
          },
          studentRollNumbers: {
            orderBy: { rollId: 'desc' },
            take: 1,
          },
        },
      });
    }
    if (!student) {
      return {
        studentId,
        enrolmentNo: null,
        rollNo: null,
        studentName: null,
        fatherName: null,
        motherName: null,
        gender: null,
        castCategory: null,
        dob: null,
        mobileNo: null,
        fatherMobileNo: null,
        emailId: null,
      };
    }
    const profile = student.studentProfile;
    const enrollment = student.studentEnrollments?.[0];
    const roll = student.studentRollNumbers?.[0];
    return {
      studentId,
      enrolmentNo: enrollment?.enrollmentNo || student.registrationNo || null,
      rollNo: roll?.rollNo || null,
      studentName: student.candidateName || null,
      fatherName: student.fatherName || null,
      motherName: profile?.motherName || enrollment?.motherName || null,
      gender: profile?.gender || enrollment?.gender || null,
      castCategory: profile?.category || null,
      dob: profile?.dateOfBirth || enrollment?.dateOfBirth || null,
      mobileNo: student.mobileNo || null,
      fatherMobileNo: profile?.fatherMobileNumber || enrollment?.fatherMobNo || null,
      emailId: student.email || enrollment?.emailId || null,
    };
  }

  private async snapshotMasters(data: any) {
    const snapshot: Record<string, any> = {};

    if (data.academicSessionId) {
      const session = await this.prisma.academicSession.findFirst({
        where: { academicSessionId: Number(data.academicSessionId), IsDeleted: false },
      });
      snapshot.academicSessionId = Number(data.academicSessionId);
      if (session) snapshot.sessionalName = session.academicSessionName;
    }

    if (data.examinationDetailId) {
      const exam = await this.prisma.examinationDetails.findFirst({
        where: { examinationId: Number(data.examinationDetailId), IsDeleted: false },
      });
      snapshot.examinationDetailId = Number(data.examinationDetailId);
      if (exam) snapshot.examinationName = exam.examinationName;
    }

    if (data.yearId) {
      const year = await this.prisma.yearMaster.findFirst({
        where: { yearId: Number(data.yearId), IsDeleted: false },
      });
      snapshot.yearId = Number(data.yearId);
      if (year) snapshot.yearName = year.yearName;
    }

    if (data.semId) {
      const sem = await this.prisma.semesterMaster.findFirst({
        where: { semId: Number(data.semId), IsDeleted: false },
      });
      snapshot.semId = Number(data.semId);
      if (sem) snapshot.semesterName = sem.semesterName;
    }

    if (data.programId) {
      const program = await this.prisma.program.findFirst({
        where: { programId: Number(data.programId), IsDeleted: false },
        include: { programCategory: true },
      });
      snapshot.programId = Number(data.programId);
      if (program) {
        snapshot.programName = program.programName;
        snapshot.programCategoryId = program.programCategoryId;
        snapshot.programCategoryName = program.programCategory?.programCategoryName || null;
      }
    } else if (data.programCategoryId) {
      const category = await this.prisma.programCategory.findFirst({
        where: { programCategoryId: Number(data.programCategoryId), IsDeleted: false },
      });
      snapshot.programCategoryId = Number(data.programCategoryId);
      if (category) snapshot.programCategoryName = category.programCategoryName;
    }

    if (data.examTypeId) {
      const examType = await this.prisma.examTypeMaster.findFirst({
        where: { examTypeId: Number(data.examTypeId), IsDeleted: false },
      });
      snapshot.examTypeId = Number(data.examTypeId);
      if (examType) snapshot.examTypeName = examType.examTypeName;
    }

    if (data.paperId) {
      let paper = await this.prisma.paperDetailMaster.findFirst({
        where: { paperId: Number(data.paperId), IsDeleted: false },
      });
      if (!paper && data.paperCode) {
        paper = await this.prisma.paperDetailMaster.findFirst({
          where: { paperCode: String(data.paperCode), IsDeleted: false },
        });
      }
      snapshot.paperId = Number(data.paperId);
      if (paper) {
        snapshot.paperCode = paper.paperCode;
        snapshot.subjectName = paper.subjectName;
        snapshot.paperName = paper.paperName;
        snapshot.paperType = paper.paperType;
        snapshot.totalMax = paper.totalMarksMax;
        snapshot.totalMin = paper.totalMarksMin;
        snapshot.theoryExternalMax = paper.theoryMarksMax;
        snapshot.theoryExternalMin = paper.theoryMarksMin;
        snapshot.sessionalInternalMax = paper.sessionalMarksMax;
        snapshot.sessionalInternalMin = paper.sessionalMarksMin;
        snapshot.practicalMax = paper.externalPracticalMarksMax ?? paper.internalPracticalMarksMax;
        snapshot.practicalMin = paper.externalPracticalMarksMin ?? paper.internalPracticalMarksMin;
        snapshot.creditMax = paper.creditMax;
      } else {
        if (data.paperCode) snapshot.paperCode = data.paperCode;
        if (data.subjectName) snapshot.subjectName = data.subjectName;
        if (data.paperName) snapshot.paperName = data.paperName;
        if (data.paperType) snapshot.paperType = data.paperType;
      }
    }

    return snapshot;
  }

  private buildPayload(data: any, extras: Record<string, any> = {}) {
    return {
      academicSessionId: this.toNum(data.academicSessionId),
      sessionalName: data.sessionalName ?? extras.sessionalName ?? null,
      examinationDetailId: this.toNum(data.examinationDetailId),
      examinationName: data.examinationName ?? extras.examinationName ?? null,
      yearId: this.toNum(data.yearId),
      yearName: data.yearName ?? extras.yearName ?? null,
      semId: this.toNum(data.semId),
      semesterName: data.semesterName ?? extras.semesterName ?? null,
      programCategoryId: this.toNum(data.programCategoryId) ?? extras.programCategoryId ?? null,
      programCategoryName: data.programCategoryName ?? extras.programCategoryName ?? null,
      programId: this.toNum(data.programId),
      programName: data.programName ?? extras.programName ?? null,
      examTypeId: this.toNum(data.examTypeId),
      examTypeName: data.examTypeName ?? extras.examTypeName ?? null,
      studentId: Number(data.studentId),
      enrolmentNo: data.enrolmentNo ?? extras.enrolmentNo ?? null,
      rollNo: data.rollNo ?? extras.rollNo ?? null,
      studentName: data.studentName ?? extras.studentName ?? null,
      fatherName: data.fatherName ?? extras.fatherName ?? null,
      motherName: data.motherName ?? extras.motherName ?? null,
      gender: data.gender ?? extras.gender ?? null,
      castCategory: data.castCategory ?? extras.castCategory ?? null,
      dob: this.toDate(data.dob) ?? extras.dob ?? null,
      mobileNo: data.mobileNo ?? extras.mobileNo ?? null,
      fatherMobileNo: data.fatherMobileNo ?? extras.fatherMobileNo ?? null,
      emailId: data.emailId ?? extras.emailId ?? null,
      paperId: this.toNum(data.paperId),
      paperCode: data.paperCode ?? extras.paperCode ?? null,
      subjectName: data.subjectName ?? extras.subjectName ?? null,
      paperName: data.paperName ?? extras.paperName ?? null,
      paperType: data.paperType ?? extras.paperType ?? null,
      examAttendanceId: this.toNum(data.examAttendanceId),
      examAttendanceDetailId: this.toNum(data.examAttendanceDetailId),
      attendanceStatus: data.attendanceStatus ?? null,
      totalMax: this.toNum(data.totalMax) ?? extras.totalMax ?? null,
      totalMin: this.toNum(data.totalMin) ?? extras.totalMin ?? null,
      theoryExternalMax: this.toNum(data.theoryExternalMax) ?? extras.theoryExternalMax ?? null,
      theoryExternalMin: this.toNum(data.theoryExternalMin) ?? extras.theoryExternalMin ?? null,
      theoryExternalObt: this.toNum(data.theoryExternalObt),
      sessionalInternalMax: this.toNum(data.sessionalInternalMax) ?? extras.sessionalInternalMax ?? null,
      sessionalInternalMin: this.toNum(data.sessionalInternalMin) ?? extras.sessionalInternalMin ?? null,
      sessionalInternalObt: this.toNum(data.sessionalInternalObt),
      practicalMax: this.toNum(data.practicalMax) ?? extras.practicalMax ?? null,
      practicalMin: this.toNum(data.practicalMin) ?? extras.practicalMin ?? null,
      practicalObt: this.toNum(data.practicalObt),
      creditMax: this.toNum(data.creditMax) ?? extras.creditMax ?? null,
      creditObt: this.toNum(data.creditObt),
      totalMarks: this.toNum(data.totalMarks),
      percentage: this.toNum(data.percentage),
      grade: data.grade ?? null,
      gradePoint: this.toNum(data.gradePoint),
      sgpa: this.toNum(data.sgpa),
      ygpa: this.toNum(data.ygpa),
      cgpa: this.toNum(data.cgpa),
      resultDeclareDate: this.toDate(data.resultDeclareDate),
      result: data.result ?? null,
      Remarks: data.Remarks ?? null,
    };
  }

  async create(data: any) {
    if (!data?.studentId) {
      throw new NotFoundException('studentId is required');
    }

    const studentSnap = await this.snapshotStudent(Number(data.studentId));
    const masterSnap = await this.snapshotMasters(data);
    const extras = { ...studentSnap, ...masterSnap };
    const payload = this.buildPayload(data, extras);

    const existing = await this.examResultDb().findFirst({
      where: {
        academicSessionId: payload.academicSessionId,
        examinationDetailId: payload.examinationDetailId,
        programId: payload.programId,
        yearId: payload.yearId,
        semId: payload.semId,
        paperId: payload.paperId,
        studentId: payload.studentId,
        IsDeleted: false,
      },
    });
    if (existing) {
      throw new ConflictException('Exam result already exists for this student and paper');
    }

    return this.examResultDb().create({
      data: {
        ...payload,
        CreatedBy: data.CreatedBy,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(filters: any = {}) {
    const where: Record<string, any> = { IsDeleted: false };
    if (isActiveOnly(filters.activeOnly)) {
      where.IsActive = true;
    }
    const idFilters = [
      'academicSessionId',
      'examinationDetailId',
      'programId',
      'programCategoryId',
      'yearId',
      'semId',
      'examTypeId',
      'studentId',
      'paperId',
    ];
    for (const key of idFilters) {
      if (filters[key] !== undefined && filters[key] !== null && String(filters[key]).trim() !== '') {
        where[key] = Number(filters[key]);
      }
    }
    if (filters.enrolmentNo) {
      where.enrolmentNo = String(filters.enrolmentNo).trim();
    }
    if (filters.rollNo) {
      where.rollNo = String(filters.rollNo).trim();
    }

    return this.examResultDb().findMany({
      where,
      orderBy: [{ studentName: 'asc' }, { paperCode: 'asc' }, { examResultId: 'asc' }],
    });
  }

  async findOne(examResultId: number) {
    const record = await this.examResultDb().findFirst({
      where: { examResultId, IsDeleted: false },
    });
    if (!record) {
      throw new NotFoundException(`Exam result with ID ${examResultId} not found`);
    }
    return record;
  }

  async findByStudent(studentId: number, filters: any = {}) {
    return this.findAll({ ...filters, studentId });
  }

  private isQualifyingPaper(paperType?: string | null) {
    return String(paperType || '').toLowerCase().includes('qualifying');
  }

  private firstFilled(values: any[]) {
    return values.find((v) => v !== null && v !== undefined && String(v).trim() !== '') ?? null;
  }

  private mapPaperColumn(source: {
    paperId?: number | null;
    srNo?: number | null;
    paperCode?: string | null;
    paperName?: string | null;
    subjectName?: string | null;
    paperType?: string | null;
    totalMax?: number | null;
    totalMin?: number | null;
    theoryExternalMax?: number | null;
    theoryExternalMin?: number | null;
    sessionalInternalMax?: number | null;
    sessionalInternalMin?: number | null;
    practicalMax?: number | null;
    practicalMin?: number | null;
    creditMax?: number | null;
  }, srNo: number) {
    const paperType = source.paperType || null;
    return {
      paperId: source.paperId ?? null,
      srNo: source.srNo || srNo,
      paperCode: source.paperCode || null,
      paperName: source.paperName || null,
      subjectName: source.subjectName || null,
      paperType,
      isQualifying: this.isQualifyingPaper(paperType),
      totalMax: source.totalMax ?? null,
      totalMin: source.totalMin ?? null,
      theoryExternalMax: source.theoryExternalMax ?? null,
      theoryExternalMin: source.theoryExternalMin ?? null,
      sessionalInternalMax: source.sessionalInternalMax ?? null,
      sessionalInternalMin: source.sessionalInternalMin ?? null,
      practicalMax: source.practicalMax ?? null,
      practicalMin: source.practicalMin ?? null,
      creditMax: source.creditMax ?? null,
    };
  }

  private async resolveTabulationPapers(params: {
    examinationDetailId: number | null;
    programId: number;
    yearId: number | null;
    semId: number | null;
    rows: any[];
  }) {
    const { examinationDetailId, programId, yearId, semId, rows } = params;

    if (examinationDetailId && yearId) {
      const schemeWhere: Record<string, any> = {
        examinationDetailId,
        programId,
        yearId,
        IsDeleted: false,
      };
      if (semId) schemeWhere.semId = semId;

      const scheme = await this.prisma.examScheme.findFirst({
        where: schemeWhere,
        include: {
          papers: {
            where: { IsDeleted: false },
            orderBy: { srNo: 'asc' },
            include: {
              paper: true,
              paperTypeRelation: true,
            },
          },
        },
      });

      if (scheme?.papers?.length) {
        return scheme.papers.map((item, index) =>
          this.mapPaperColumn(
            {
              paperId: item.paperId,
              srNo: item.srNo,
              paperCode: item.paperCode || item.paper?.paperCode,
              paperName: item.paperName || item.paper?.paperName,
              subjectName: item.subjectName || item.paper?.subjectName,
              paperType:
                item.paperType ||
                item.paperTypeRelation?.name ||
                item.paper?.paperType ||
                null,
              totalMax: item.paper?.totalMarksMax ?? null,
              totalMin: item.paper?.totalMarksMin ?? null,
              theoryExternalMax: item.paper?.theoryMarksMax ?? null,
              theoryExternalMin: item.paper?.theoryMarksMin ?? null,
              sessionalInternalMax: item.paper?.sessionalMarksMax ?? null,
              sessionalInternalMin: item.paper?.sessionalMarksMin ?? null,
              practicalMax:
                item.paper?.externalPracticalMarksMax ??
                item.paper?.internalPracticalMarksMax ??
                null,
              practicalMin:
                item.paper?.externalPracticalMarksMin ??
                item.paper?.internalPracticalMarksMin ??
                null,
              creditMax: item.paper?.creditMax ?? null,
            },
            index + 1,
          ),
        );
      }
    }

    const seen = new Map<string, ReturnType<ExamResultService['mapPaperColumn']>>();
    for (const row of rows) {
      const key = String(row.paperId || row.paperCode || '');
      if (!key || seen.has(key)) continue;
      seen.set(
        key,
        this.mapPaperColumn(
          {
            paperId: row.paperId,
            paperCode: row.paperCode,
            paperName: row.paperName,
            subjectName: row.subjectName,
            paperType: row.paperType,
            totalMax: row.totalMax,
            totalMin: row.totalMin,
            theoryExternalMax: row.theoryExternalMax,
            theoryExternalMin: row.theoryExternalMin,
            sessionalInternalMax: row.sessionalInternalMax,
            sessionalInternalMin: row.sessionalInternalMin,
            practicalMax: row.practicalMax,
            practicalMin: row.practicalMin,
            creditMax: row.creditMax,
          },
          seen.size + 1,
        ),
      );
    }
    if (seen.size) return Array.from(seen.values());

    const paperWhere: Record<string, any> = {
      programId,
      IsDeleted: false,
      IsActive: true,
    };
    if (yearId) paperWhere.OR = [{ yearId }, { yearId: null }];
    if (semId) {
      paperWhere.AND = [{ OR: [{ semId }, { semId: null }] }];
    }

    const masterPapers = await this.prisma.paperDetailMaster.findMany({
      where: paperWhere,
      include: { paperTypeRelation: true },
      orderBy: { paperId: 'asc' },
    });

    return masterPapers.map((paper, index) =>
      this.mapPaperColumn(
        {
          paperId: paper.paperId,
          paperCode: paper.paperCode,
          paperName: paper.paperName,
          subjectName: paper.subjectName,
          paperType: paper.paperTypeRelation?.name || paper.paperType,
          totalMax: paper.totalMarksMax,
          totalMin: paper.totalMarksMin,
          theoryExternalMax: paper.theoryMarksMax,
          theoryExternalMin: paper.theoryMarksMin,
          sessionalInternalMax: paper.sessionalMarksMax,
          sessionalInternalMin: paper.sessionalMarksMin,
          practicalMax: paper.externalPracticalMarksMax ?? paper.internalPracticalMarksMax,
          practicalMin: paper.externalPracticalMarksMin ?? paper.internalPracticalMarksMin,
          creditMax: paper.creditMax,
        },
        index + 1,
      ),
    );
  }

  private pivotTabulationStudents(rows: any[], papers: Array<{ paperId: number | null }>) {
    const grouped = new Map<number, any[]>();
    for (const row of rows) {
      const studentId = Number(row.studentId);
      if (!grouped.has(studentId)) grouped.set(studentId, []);
      grouped.get(studentId)!.push(row);
    }

    const students = Array.from(grouped.entries()).map(([studentId, studentRows]) => {
      const first = studentRows[0];
      const paperMap: Record<string, any> = {};
      let creditTotal = 0;

      for (const row of studentRows) {
        if (row.paperId == null) continue;
        paperMap[String(row.paperId)] = {
          examResultId: row.examResultId,
          paperId: row.paperId,
          paperCode: row.paperCode,
          paperName: row.paperName,
          paperType: row.paperType,
          attendanceStatus: row.attendanceStatus,
          theoryExternalObt: row.theoryExternalObt,
          sessionalInternalObt: row.sessionalInternalObt,
          practicalObt: row.practicalObt,
          totalMarks: row.totalMarks,
          grade: row.grade,
          gradePoint: row.gradePoint,
          creditObt: row.creditObt,
          result: row.result,
        };
        if (!this.isQualifyingPaper(row.paperType) && row.totalMarks != null) {
          creditTotal += Number(row.totalMarks) || 0;
        }
      }

      for (const paper of papers) {
        if (paper.paperId == null) continue;
        const key = String(paper.paperId);
        if (paperMap[key] === undefined) paperMap[key] = null;
      }

      return {
        studentId,
        rollNo: first.rollNo || null,
        enrolmentNo: first.enrolmentNo || null,
        studentName: first.studentName || null,
        fatherName: first.fatherName || null,
        motherName: first.motherName || null,
        papers: paperMap,
        totalMarks: creditTotal,
        result: this.firstFilled(studentRows.map((row) => row.result)),
        sgpa: this.firstFilled(studentRows.map((row) => row.sgpa)),
        ygpa: this.firstFilled(studentRows.map((row) => row.ygpa)),
        cgpa: this.firstFilled(studentRows.map((row) => row.cgpa)),
        percentage: this.firstFilled(studentRows.map((row) => row.percentage)),
        remarks: this.firstFilled(studentRows.map((row) => row.Remarks)),
      };
    });

    students.sort((a, b) =>
      String(a.rollNo || '').localeCompare(String(b.rollNo || ''), undefined, { numeric: true }),
    );
    return students;
  }

  async getTabulation(filters: any = {}) {
    const programId = this.toNum(filters.programId);
    const programCategoryId = this.toNum(filters.programCategoryId);
    if (!programId) throw new BadRequestException('programId is required');
    if (!programCategoryId) throw new BadRequestException('programCategoryId is required');

    const academicSessionId = this.toNum(filters.academicSessionId);
    const examinationDetailId = this.toNum(filters.examinationDetailId);
    const yearId = this.toNum(filters.yearId);
    const semId = this.toNum(filters.semId);
    const examTypeId = this.toNum(filters.examTypeId);
    const resultDeclarationId = this.toNum(filters.resultDeclarationId);

    const program = await this.prisma.program.findFirst({
      where: { programId, IsDeleted: false },
      include: { programCategory: true },
    });
    if (!program) throw new NotFoundException('Program not found');
    if (Number(program.programCategoryId) !== programCategoryId) {
      throw new BadRequestException('programId does not belong to the selected programCategoryId');
    }

    const [session, year, semester, examination, examType] = await Promise.all([
      academicSessionId
        ? this.prisma.academicSession.findFirst({
            where: { academicSessionId, IsDeleted: false },
            include: {
              college: {
                select: {
                  collegeId: true,
                  collegeCode: true,
                  collegeName: true,
                  shortName: true,
                  collegeAddress: true,
                },
              },
            },
          })
        : Promise.resolve(null),
      yearId
        ? this.prisma.yearMaster.findFirst({ where: { yearId, IsDeleted: false } })
        : Promise.resolve(null),
      semId
        ? this.prisma.semesterMaster.findFirst({ where: { semId, IsDeleted: false } })
        : Promise.resolve(null),
      examinationDetailId
        ? this.prisma.examinationDetails.findFirst({
            where: { examinationId: examinationDetailId, IsDeleted: false },
          })
        : Promise.resolve(null),
      examTypeId
        ? this.prisma.examTypeMaster.findFirst({
            where: { examTypeId, IsDeleted: false },
          })
        : Promise.resolve(null),
    ]);

    const declarationWhere: Record<string, any> = { IsDeleted: false, IsActive: true };
    let declaration: any = null;
    if (resultDeclarationId) {
      declaration = await (this.prisma as any).resultDeclaration.findFirst({
        where: { resultDeclarationId, IsDeleted: false },
      });
    } else {
      declarationWhere.programId = programId;
      if (academicSessionId) declarationWhere.academicSessionId = academicSessionId;
      if (yearId) declarationWhere.yearId = yearId;
      if (semId) declarationWhere.semId = semId;
      if (examinationDetailId) declarationWhere.examinationDetailId = examinationDetailId;
      declaration = await (this.prisma as any).resultDeclaration.findFirst({
        where: declarationWhere,
        orderBy: [{ resultDeclarationId: 'desc' }],
      });
    }

    const rows = await this.findAll({
      programId,
      academicSessionId,
      examinationDetailId,
      yearId,
      semId,
      examTypeId,
      activeOnly: filters.activeOnly !== undefined ? filters.activeOnly : true,
    });

    const papers = await this.resolveTabulationPapers({
      examinationDetailId,
      programId,
      yearId,
      semId,
      rows,
    });
    const students = this.pivotTabulationStudents(rows, papers);
    const first = rows[0];
    const college = session?.college || null;

    const programName = program.programName || first?.programName || null;
    const semesterName = semester?.semesterName || first?.semesterName || null;
    const examinationName = examination?.examinationName || first?.examinationName || null;
    const sessionalName = session?.academicSessionName || first?.sessionalName || null;
    const examTypeName = examType?.examTypeName || first?.examTypeName || null;
    const yearName = year?.yearName || first?.yearName || null;
    const subtitleParts = [programName, semesterName].filter(Boolean);
    const subtitle = [
      subtitleParts.join(' '),
      examinationName,
    ]
      .filter(Boolean)
      .join(' - ');

    return {
      header: {
        title: 'Tabulation Chart',
        collegeId: college?.collegeId ?? null,
        collegeName: college?.collegeName ?? null,
        collegeCode: college?.collegeCode ?? null,
        collegeShortName: college?.shortName ?? null,
        collegeAddress: college?.collegeAddress ?? null,
        collegeDisplay: [college?.collegeName, college?.collegeAddress].filter(Boolean).join(', ') || null,
        programCategoryId,
        programCategoryName:
          program.programCategory?.programCategoryName || first?.programCategoryName || null,
        programId,
        programName,
        programShortName: program.programShortName || null,
        academicSessionId,
        sessionalName,
        yearId,
        yearName,
        semId,
        semesterName,
        examinationDetailId,
        examinationName,
        examTypeId,
        examTypeName,
        examCategory: examTypeName || null,
        declareDate: declaration?.declareDate || first?.resultDeclareDate || null,
        resultDeclarationId: declaration?.resultDeclarationId || null,
        subtitle: subtitle || null,
      },
      papers,
      creditPapers: papers.filter((paper) => !paper.isQualifying),
      qualifyingPapers: papers.filter((paper) => paper.isQualifying),
      students,
      counts: {
        paperCount: papers.length,
        studentCount: students.length,
      },
    };
  }

  async update(examResultId: number, data: any) {
    await this.findOne(examResultId);

    const existing = await this.examResultDb().findFirst({
      where: { examResultId },
    });

    const studentSnap = data.studentId
      ? await this.snapshotStudent(Number(data.studentId))
      : {};
    const masterSnap = await this.snapshotMasters({
      academicSessionId: data.academicSessionId ?? existing.academicSessionId,
      examinationDetailId: data.examinationDetailId ?? existing.examinationDetailId,
      yearId: data.yearId ?? existing.yearId,
      semId: data.semId ?? existing.semId,
      programId: data.programId ?? existing.programId,
      programCategoryId: data.programCategoryId ?? existing.programCategoryId,
      examTypeId: data.examTypeId ?? existing.examTypeId,
      paperId: data.paperId ?? existing.paperId,
    });

    const merged = {
      ...existing,
      ...data,
      studentId: data.studentId ?? existing.studentId,
    };
    const payload = this.buildPayload(merged, { ...studentSnap, ...masterSnap });

    return this.examResultDb().update({
      where: { examResultId },
      data: {
        ...payload,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive !== undefined ? data.IsActive : existing.IsActive,
        Remarks: data.Remarks !== undefined ? data.Remarks : existing.Remarks,
      },
    });
  }

  async updateStatus(examResultId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(examResultId);
    return this.examResultDb().update({
      where: { examResultId },
      data: { IsActive, UpdatedBy },
    });
  }

  async softDelete(examResultId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(examResultId);
    return this.examResultDb().update({
      where: { examResultId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const result = await this.examResultDb().updateMany({
      where: {
        examResultId: { in: ids },
        IsDeleted: false,
      },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });

    return {
      message: `Successfully soft-deleted ${result.count} exam result(s)`,
      count: result.count,
    };
  }
}
