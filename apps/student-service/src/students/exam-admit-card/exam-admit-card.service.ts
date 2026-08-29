import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class ExamAdmitCardService {
  constructor(private readonly prisma: PrismaService) {}

  private studentExam() {
    return (this.prisma as any).studentExam;
  }

  private roll() {
    return (this.prisma as any).studentRollNumber;
  }

  private enrollment() {
    return (this.prisma as any).studentEnrollment;
  }

  private examScheme() {
    return (this.prisma as any).examScheme;
  }

  private toNum(value: any): number | null {
    if (value === undefined || value === null || value === '') return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  private toDateInput(value: Date | string | null | undefined): string | null {
    if (!value) return null;
    const raw = String(value);
    if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return null;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  private pickRoll(student: any, exam: any) {
    const fromExam = String(exam?.rollNo || '').trim();
    const rolls = Array.isArray(student?.studentRollNumbers)
      ? student.studentRollNumbers.filter((row: any) => row && row.IsDeleted !== true)
      : [];
    const byYear = rolls.find(
      (row: any) => String(row.admissionYear || '') === String(exam?.session?.admissionSessionName || '').match(/(20\d{2})/)?.[1],
    );
    const latest = [...rolls].sort((a: any, b: any) => Number(b.rollId || 0) - Number(a.rollId || 0))[0];
    return String(fromExam || byYear?.rollNo || latest?.rollNo || '').trim();
  }

  private pickAttachment(attachments: any[], type: string) {
    const match = (attachments || []).find(
      (a: any) => !a.IsDeleted && String(a.documentType || '').toUpperCase() === type,
    );
    return match?.fileUrl ? String(match.fileUrl) : null;
  }

  private paperLabel(code?: string | null, name?: string | null, withCode?: string | null) {
    const pCode = String(code || '').trim();
    const pName = String(name || '').trim();
    if (pCode && pName) return `[${pCode}] ${pName}`;
    if (withCode) return String(withCode).trim();
    return pName || pCode || '';
  }

  private async schemePaperMap(params: {
    examinationDetailId?: number | null;
    programId?: number | null;
    yearId?: number | null;
    semId?: number | null;
  }) {
    const map = new Map<number, any>();
    if (!params.examinationDetailId || !params.programId || !params.yearId) return map;
    const scheme = await this.examScheme().findFirst({
      where: {
        examinationDetailId: params.examinationDetailId,
        programId: params.programId,
        yearId: params.yearId,
        semId: params.semId || null,
        IsDeleted: false,
      },
      include: {
        papers: { where: { IsDeleted: false } },
      },
    });
    for (const paper of scheme?.papers || []) {
      if (paper?.paperId) map.set(Number(paper.paperId), paper);
    }
    return map;
  }

  private mapRow(exam: any, schemeMap: Map<number, any>) {
    const student = exam.student || {};
    const profile = student.studentProfile || {};
    const program = exam.course || student.program || {};
    const category = exam.courseCategoryRelation || program.programCategory || {};
    const attachments = student.studentAttachments || [];
    const papers = (exam.papers || [])
      .filter((paper: any) => paper.IsDeleted !== true && paper.isChosen !== false)
      .map((paper: any) => {
        const scheme = paper.paperId ? schemeMap.get(Number(paper.paperId)) : null;
        return {
          paperId: paper.paperId || null,
          subjectName: paper.subjectName || null,
          paperName: paper.paperName || null,
          paperCode: paper.paperCode || null,
          paperNameWithCode: this.paperLabel(paper.paperCode, paper.paperName, paper.paperNameWithCode),
          paperType: paper.paperType || scheme?.paperType || null,
          examDate: this.toDateInput(scheme?.examDate),
          examTime: scheme?.examTime || null,
          shift: scheme?.shift || null,
        };
      });

    return {
      studentExamId: exam.studentExamId,
      studentId: exam.studentId,
      enrollmentNo: exam.enrollmentNo || null,
      rollNo: this.pickRoll(student, exam) || null,
      studentName: exam.studentNameEng || student.candidateName || null,
      fatherName: exam.fatherName || student.fatherName || profile.fatherNameHindi || null,
      motherName: exam.motherName || profile.motherName || null,
      gender: exam.gender || profile.gender || student.gender || null,
      mobileNo: exam.mobileNo || student.mobileNo || null,
      examType: exam.examType || exam.examTypeRelation?.examTypeName || null,
      programId: exam.courseId || program.programId || null,
      programName: exam.courseShortName || program.programShortName || program.programName || null,
      programFullName: program.programName || null,
      programCategoryId: exam.courseCategoryId || category.programCategoryId || null,
      pcShortName: category.pcShortName || null,
      programCategoryName: exam.courseCategory || category.programCategoryName || null,
      yearId: exam.yearId || null,
      yearName: exam.yearName || exam.year?.yearName || null,
      semId: exam.semId || null,
      semName: exam.semName || exam.semester?.semesterName || null,
      sessionId: exam.sessionId || null,
      sessionName: exam.session?.admissionSessionName || null,
      examinationDetailId: exam.examinationDetailId || null,
      examinationName: exam.examinationName || exam.examinationDetail?.examinationName || null,
      academicSessionId: exam.examinationDetail?.academicId || exam.examinationDetail?.academicSession?.academicSessionId || null,
      academicSessionName: exam.examinationDetail?.academicSession?.academicSessionName || null,
      studentImgURL: exam.studentImgURL || this.pickAttachment(attachments, 'PHOTO') || null,
      studentSignImgURL: exam.studentSignImgURL || this.pickAttachment(attachments, 'SIGNATURE') || null,
      papers,
    };
  }

  private examInclude() {
    return {
      student: {
        include: {
          studentProfile: true,
          studentAttachments: true,
          program: { include: { programCategory: true } },
          studentRollNumbers: {
            where: { IsDeleted: false },
            orderBy: { rollId: 'desc' },
          },
        },
      },
      course: { include: { programCategory: true } },
      courseCategoryRelation: true,
      year: true,
      semester: true,
      session: true,
      examinationDetail: { include: { academicSession: true } },
      examTypeRelation: true,
      papers: {
        where: { IsDeleted: false },
        orderBy: { studentExamPaperId: 'asc' },
      },
    };
  }

  async list(query: any) {
    const examinationDetailId = this.toNum(query.examinationDetailId);
    const academicSessionId = this.toNum(query.academicSessionId ?? query.sessionId);
    const programCategoryId = this.toNum(query.programCategoryId);
    const programId = this.toNum(query.programId);
    const yearId = this.toNum(query.yearId);
    const semId = this.toNum(query.semId);
    const examType = String(query.examType || '').trim().toLowerCase();
    const search = String(query.search || '').trim().toLowerCase();

    const enrollmentWhere: any = {
      IsDeleted: false,
      enrollmentNo: { not: null },
    };
    if (programId != null) enrollmentWhere.programId = programId;
    if (yearId != null) enrollmentWhere.yearId = yearId;
    if (semId != null) enrollmentWhere.semId = semId;

    const enrollments = await this.enrollment().findMany({
      where: enrollmentWhere,
      include: {
        student: {
          include: {
            studentProfile: true,
            studentAttachments: true,
            program: { include: { programCategory: true } },
          },
        },
        program: { include: { programCategory: true } },
        year: true,
        semester: true,
        session: true,
      },
      orderBy: { enrollmentId: 'asc' },
    });

    let rows = (enrollments || []).filter((e: any) => String(e.enrollmentNo || '').trim());
    if (programCategoryId != null) {
      rows = rows.filter((e: any) => {
        const catId =
          e.program?.programCategoryId ||
          e.student?.program?.programCategoryId ||
          e.program?.programCategory?.programCategoryId ||
          null;
        return Number(catId) === programCategoryId;
      });
    }

    const studentIds = Array.from(new Set(rows.map((e: any) => Number(e.studentId)).filter(Boolean)));
    const rolls = studentIds.length
      ? await this.roll().findMany({
          where: { IsDeleted: false, studentId: { in: studentIds } },
        })
      : [];
    const rollByStudent = new Map<number, any>();
    for (const roll of rolls) {
      const sid = Number(roll.studentId);
      const current = rollByStudent.get(sid);
      if (!current || Number(roll.rollId) > Number(current.rollId)) rollByStudent.set(sid, roll);
    }

    rows = rows.filter((e: any) => rollByStudent.get(Number(e.studentId))?.rollNo);

    const exams = studentIds.length
      ? await this.studentExam().findMany({
          where: { IsDeleted: false, studentId: { in: studentIds } },
          include: this.examInclude(),
          orderBy: { studentExamId: 'desc' },
        })
      : [];

    const examByStudent = new Map<number, any>();
    for (const exam of exams || []) {
      const sid = Number(exam.studentId);
      if (!examByStudent.has(sid)) examByStudent.set(sid, exam);
      const existing = examByStudent.get(sid);
      const e = rows.find((r: any) => Number(r.studentId) === sid);
      if (
        e &&
        Number(exam.courseId || 0) === Number(e.programId || 0) &&
        Number(exam.yearId || 0) === Number(e.yearId || 0) &&
        Number(exam.semId || 0) === Number(e.semId || 0)
      ) {
        examByStudent.set(sid, exam);
      } else if (existing && e) {
        const existingMatch =
          Number(existing.courseId || 0) === Number(e.programId || 0) &&
          Number(existing.yearId || 0) === Number(e.yearId || 0);
        const nextMatch =
          Number(exam.courseId || 0) === Number(e.programId || 0) &&
          Number(exam.yearId || 0) === Number(e.yearId || 0);
        if (nextMatch && !existingMatch) examByStudent.set(sid, exam);
      }
    }

    const examination = examinationDetailId
      ? await this.prisma.examinationDetails.findFirst({
          where: { examinationId: examinationDetailId, IsDeleted: false },
          include: { academicSession: true },
        })
      : null;

    const schemeCache = new Map<string, Map<number, any>>();
    const uniqueKeys: string[] = [
      ...new Set(
        rows.map(
          (e: any) =>
            `${examinationDetailId || examByStudent.get(Number(e.studentId))?.examinationDetailId || ''}:${e.programId}:${e.yearId}:${e.semId}`,
        ) as string[],
      ),
    ];
    for (const key of uniqueKeys) {
      const [exId, pId, yId, sId] = key.split(':');
      schemeCache.set(
        key,
        await this.schemePaperMap({
          examinationDetailId: this.toNum(exId),
          programId: this.toNum(pId),
          yearId: this.toNum(yId),
          semId: this.toNum(sId),
        }),
      );
    }

    let items = rows.map((e: any) => {
      const studentId = Number(e.studentId);
      const exam = examByStudent.get(studentId);
      const roll = rollByStudent.get(studentId);
      const schemeKey = [
        examinationDetailId || exam?.examinationDetailId,
        e.programId,
        e.yearId,
        e.semId,
      ].join(':');
      const mapped = exam
        ? this.mapRow(exam, schemeCache.get(schemeKey) || new Map())
        : this.mapEnrollmentRow(e, roll, schemeCache.get(schemeKey) || new Map());
      if (roll?.rollNo) mapped.rollNo = roll.rollNo;
      if (examination) {
        mapped.examinationDetailId = examination.examinationId;
        mapped.examinationName = examination.examinationName;
        mapped.academicSessionId = examination.academicId || mapped.academicSessionId;
        mapped.academicSessionName = examination.academicSession?.academicSessionName || mapped.academicSessionName;
      }
      if (!mapped.papers?.length) {
        const schemePapers = Array.from((schemeCache.get(schemeKey) || new Map()).values());
        mapped.papers = schemePapers.map((paper: any) => ({
          paperId: paper.paperId || null,
          subjectName: paper.subjectName || null,
          paperName: paper.paperName || null,
          paperCode: paper.paperCode || null,
          paperNameWithCode: this.paperLabel(paper.paperCode, paper.paperName, paper.paperNameWithCode),
          paperType: paper.paperType || null,
          examDate: this.toDateInput(paper.examDate),
          examTime: paper.examTime || null,
          shift: paper.shift || null,
        }));
      }
      return mapped;
    });

    if (academicSessionId != null) {
      items = items.filter((item: any) => {
        const rowSessionId = Number(item.academicSessionId);
        if (Number.isFinite(rowSessionId)) return rowSessionId === academicSessionId;
        return true;
      });
    }
    if (examType) {
      items = items.filter((item: any) => String(item.examType || '').trim().toLowerCase() === examType);
    }
    if (search) {
      items = items.filter((item: any) => {
        const hay = [
          item.enrollmentNo,
          item.rollNo,
          item.studentName,
          item.fatherName,
          item.motherName,
          item.mobileNo,
          item.programName,
          item.pcShortName,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return hay.includes(search);
      });
    }

    items.sort((a: any, b: any) =>
      String(a.studentName || '').localeCompare(String(b.studentName || ''), undefined, {
        sensitivity: 'base',
      }),
    );

    return { total: items.length, items };
  }

  private mapEnrollmentRow(e: any, roll: any, schemeMap: Map<number, any>) {
    const student = e.student || {};
    const profile = student.studentProfile || {};
    const program = e.program || student.program || {};
    const category = program.programCategory || {};
    const attachments = student.studentAttachments || [];
    return {
      studentExamId: null,
      studentId: Number(e.studentId),
      enrollmentId: e.enrollmentId,
      enrollmentNo: e.enrollmentNo || null,
      rollNo: roll?.rollNo || null,
      studentName: e.studentName || student.candidateName || null,
      fatherName: e.fatherName || student.fatherName || null,
      motherName: e.motherName || profile.motherName || null,
      gender: e.gender || profile.gender || student.gender || null,
      mobileNo: student.mobileNo || e.fatherMobNo || null,
      examType: 'Regular',
      programId: e.programId || program.programId || null,
      programName: program.programShortName || program.programName || null,
      programFullName: program.programName || null,
      programCategoryId: program.programCategoryId || category.programCategoryId || null,
      pcShortName: category.pcShortName || null,
      programCategoryName: category.programCategoryName || null,
      yearId: e.yearId || null,
      yearName: e.year?.yearName || null,
      semId: e.semId || null,
      semName: e.semester?.semesterName || null,
      sessionId: e.sessionId || null,
      sessionName: e.session?.admissionSessionName || null,
      examinationDetailId: null,
      examinationName: null,
      academicSessionId: null,
      academicSessionName: null,
      studentImgURL: this.pickAttachment(attachments, 'PHOTO'),
      studentSignImgURL: this.pickAttachment(attachments, 'SIGNATURE'),
      papers: Array.from(schemeMap.values()).map((paper: any) => ({
        paperId: paper.paperId || null,
        subjectName: paper.subjectName || null,
        paperName: paper.paperName || null,
        paperCode: paper.paperCode || null,
        paperNameWithCode: this.paperLabel(paper.paperCode, paper.paperName, paper.paperNameWithCode),
        paperType: paper.paperType || null,
        examDate: this.toDateInput(paper.examDate),
        examTime: paper.examTime || null,
        shift: paper.shift || null,
      })),
    };
  }

  async findOne(studentExamId: number) {
    const exam = await this.studentExam().findFirst({
      where: { studentExamId, IsDeleted: false },
      include: this.examInclude(),
    });
    if (!exam) throw new NotFoundException('Exam form not found');
    const schemeMap = await this.schemePaperMap({
      examinationDetailId: exam.examinationDetailId,
      programId: exam.courseId,
      yearId: exam.yearId,
      semId: exam.semId,
    });
    return this.mapRow(exam, schemeMap);
  }
}
