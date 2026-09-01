import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

type ListFilters = {
  sessionId?: number | string | null;
  academicSessionId?: number | string | null;
  programCategoryId?: number | string | null;
  programId?: number | string | null;
  yearId?: number | string | null;
  semId?: number | string | null;
  search?: string | null;
  studentIds?: Array<number | string> | null;
};

type GeneratePayload = ListFilters & {
  CreatedBy?: string;
  Remarks?: string;
};

type MappedEnrollment = {
  enrollment: any;
  studentId: number;
  enrollmentId: number;
  studentName: string;
  fatherName: string;
  programId: number | null;
  programCode: string;
};

@Injectable()
export class StudentRollNumberService {
  constructor(private readonly prisma: PrismaService) {}

  private roll() {
    const delegate = (this.prisma as any).studentRollNumber;
    if (!delegate?.findMany) {
      throw new BadRequestException(
        'Prisma model studentRollNumber not loaded. Run: npx prisma generate && restart student-service. Also create table via prisma/sql/add_student_roll_number.sql',
      );
    }
    return delegate;
  }

  private enrollment() {
    const delegate = (this.prisma as any).studentEnrollment;
    if (!delegate?.findMany) {
      throw new BadRequestException('Prisma model studentEnrollment not loaded. Restart student-service.');
    }
    return delegate;
  }

  private toNum(value: any): number | null {
    if (value === undefined || value === null || value === '') return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }

  private sortName(value?: string | null) {
    return String(value || '')
      .trim()
      .toUpperCase()
      .replace(/\s+/g, ' ');
  }

  /** Student Name A–Z first; if same, Father Name A–Z */
  private compareAlpha(
    a: { studentName?: string | null; fatherName?: string | null },
    b: { studentName?: string | null; fatherName?: string | null },
  ) {
    const sa = this.sortName(a.studentName);
    const sb = this.sortName(b.studentName);
    if (sa < sb) return -1;
    if (sa > sb) return 1;
    const fa = this.sortName(a.fatherName);
    const fb = this.sortName(b.fatherName);
    if (fa < fb) return -1;
    if (fa > fb) return 1;
    return 0;
  }

  extractAdmissionYear(sessionName?: string | null): string {
    const m = String(sessionName || '').match(/(20\d{2})/);
    return m ? m[1] : '';
  }

  private async resolveRollYear(filters: ListFilters): Promise<string> {
    const academicSessionId = this.toNum(filters.academicSessionId);
    if (academicSessionId != null) {
      const academic = await this.prisma.academicSession.findFirst({
        where: { academicSessionId, IsDeleted: false },
      });
      if (!academic) throw new BadRequestException('Academic session not found');
      const year =
        this.extractAdmissionYear(academic.academicSessionName) ||
        (academic.startYear ? String(academic.startYear) : '');
      if (year && year.length === 4) return year;
      throw new BadRequestException('Academic session name must include year (e.g. 2026-27)');
    }

    const sessionId = this.toNum(filters.sessionId);
    if (sessionId != null) {
      const session = await (this.prisma as any).admissionSession.findFirst({
        where: { admissionSessionId: sessionId, IsDeleted: false },
      });
      return this.extractAdmissionYear(session?.admissionSessionName);
    }
    return '';
  }

  normalizeCollegeCode(code?: string | null): string {
    const digits = String(code || '').replace(/\D/g, '');
    if (!digits) return '686';
    if (digits.length >= 3) return digits.slice(0, 3);
    return digits.padStart(3, '0');
  }

  normalizeProgramCode(code?: string | null): string {
    const digits = String(code || '').replace(/\D/g, '');
    if (!digits) return '01';
    if (digits.length >= 2) return digits.slice(-2);
    return digits.padStart(2, '0');
  }

  normalizeSerial(serial: number): string {
    return String(Math.max(1, Math.floor(serial))).padStart(3, '0').slice(-3);
  }

  buildRollNo(collegeCode: string, admissionYear: string, programCode: string, serial: number) {
    return `${this.normalizeCollegeCode(collegeCode)}${admissionYear}${this.normalizeProgramCode(programCode)}${this.normalizeSerial(serial)}`;
  }

  private async resolveCollegeCode(): Promise<string> {
    const collegeDelegate = (this.prisma as any).collegeMaster;
    if (!collegeDelegate?.findMany) {
      return this.normalizeCollegeCode('686');
    }
    const colleges = await collegeDelegate.findMany({
      where: { IsDeleted: false },
      orderBy: { collegeId: 'asc' },
    });
    const active = colleges.find((c: any) => c.IsActive !== false && c.collegeCode) || colleges.find((c: any) => c.collegeCode);
    return this.normalizeCollegeCode(active?.collegeCode || '686');
  }

  private async loadEnrollments(filters: ListFilters) {
    const sessionId = this.toNum(filters.sessionId);
    const academicSessionId = this.toNum(filters.academicSessionId);
    const programId = this.toNum(filters.programId);
    const programCategoryId = this.toNum(filters.programCategoryId);
    const yearId = this.toNum(filters.yearId);
    const semId = this.toNum(filters.semId);
    const studentIds = Array.isArray(filters.studentIds)
      ? filters.studentIds.map((id) => this.toNum(id)).filter((id): id is number => id != null)
      : [];

    const where: any = {
      IsDeleted: false,
      enrollmentNo: { not: null },
    };
    if (academicSessionId != null) {
      where.student = { academicSessionId, IsDeleted: false };
    } else if (sessionId != null) {
      where.sessionId = sessionId;
    }
    if (programId != null) where.programId = programId;
    if (yearId != null) where.yearId = yearId;
    if (semId != null) where.semId = semId;
    if (studentIds.length) where.studentId = { in: studentIds };

    let rows = await this.enrollment().findMany({
      where,
      include: {
        student: {
          include: {
            studentProfile: true,
            program: { include: { programCategory: true } },
            academicSession: true,
          },
        },
        program: { include: { programCategory: true } },
        year: true,
        semester: true,
        session: true,
      },
      orderBy: { enrollmentId: 'asc' },
    });

    rows = (rows || []).filter((e: any) => String(e.enrollmentNo || '').trim());

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

    const q = String(filters.search || '').trim().toLowerCase();
    if (q) {
      rows = rows.filter((e: any) => {
        const hay = [
          e.enrollmentNo,
          e.studentName,
          e.student?.candidateName,
          e.fatherName,
          e.student?.fatherName,
          e.motherName,
          e.student?.studentProfile?.motherName,
          e.student?.mobileNo,
          e.fatherMobNo,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return hay.includes(q);
      });
    }

    return rows;
  }

  private mapListRow(e: any, rollMap: Map<string, any>, admissionYearFallback?: string) {
    const studentId = Number(e.studentId);
    const sessionName = e.session?.admissionSessionName || '';
    const admissionYear = this.extractAdmissionYear(sessionName) || admissionYearFallback || '';
    const roll = admissionYear ? rollMap.get(`${studentId}:${admissionYear}`) : null;
    const program = e.program || e.student?.program || null;
    const category = program?.programCategory || null;

    return {
      studentId,
      enrollmentId: e.enrollmentId,
      enrollmentNo: e.enrollmentNo || '',
      studentName: e.studentName || e.student?.candidateName || '',
      fatherName: e.fatherName || e.student?.fatherName || '',
      motherName: e.motherName || e.student?.studentProfile?.motherName || '',
      mobileNo:
        e.student?.mobileNo ||
        e.fatherMobNo ||
        e.student?.studentProfile?.fatherMobileNumber ||
        '',
      programId: e.programId || program?.programId || null,
      programCategoryId: program?.programCategoryId || category?.programCategoryId || null,
      programCode: this.normalizeProgramCode(program?.programCode),
      programName: program?.programShortName || program?.programName || '',
      yearId: e.yearId || null,
      yearName: e.year?.yearName || '',
      semId: e.semId || null,
      semName: e.semester?.semesterName || '',
      sessionId: e.sessionId || null,
      sessionName,
      admissionYear,
      rollId: roll?.rollId || null,
      rollNo: roll?.rollNo || null,
      collegeCode: roll?.collegeCode || null,
      serialNo: roll?.serialNo || null,
    };
  }

  async list(filters: ListFilters = {}) {
    const admissionYear = await this.resolveRollYear(filters);

    const enrollments = await this.loadEnrollments(filters);
    const studentIds = Array.from(new Set(enrollments.map((e: any) => Number(e.studentId)).filter(Boolean)));

    const rolls = studentIds.length
      ? await this.roll().findMany({
          where: {
            IsDeleted: false,
            studentId: { in: studentIds },
            ...(admissionYear ? { admissionYear } : {}),
          },
        })
      : [];

    const rollMap = new Map<string, any>();
    for (const r of rolls) {
      rollMap.set(`${r.studentId}:${r.admissionYear}`, r);
    }

    const rows = enrollments
      .map((e: any) => this.mapListRow(e, rollMap, admissionYear))
      .sort(this.compareAlpha.bind(this));

    return {
      collegeCode: await this.resolveCollegeCode(),
      admissionYear: admissionYear || null,
      total: rows.length,
      items: rows,
    };
  }

  private async nextSerial(
    collegeCode: string,
    admissionYear: string,
    programCode: string,
  ): Promise<number> {
    const prefix = `${this.normalizeCollegeCode(collegeCode)}${admissionYear}${this.normalizeProgramCode(programCode)}`;
    const existing = await this.roll().findMany({
      where: {
        IsDeleted: false,
        admissionYear,
        collegeCode: this.normalizeCollegeCode(collegeCode),
        programCode: this.normalizeProgramCode(programCode),
      },
      select: { rollNo: true },
    });
    let max = 0;
    for (const row of existing) {
      const roll = String(row.rollNo || '');
      if (roll.length === 12 && roll.startsWith(prefix)) {
        const serial = Number(roll.slice(9, 12));
        if (Number.isFinite(serial) && serial > max) max = serial;
      }
    }
    return max + 1;
  }

  async generate(payload: GeneratePayload) {
    const sessionId = this.toNum(payload.sessionId);
    const academicSessionId = this.toNum(payload.academicSessionId);
    if (sessionId == null && academicSessionId == null) {
      throw new BadRequestException('academicSessionId or sessionId is required');
    }

    if (sessionId != null) {
      const session = await (this.prisma as any).admissionSession.findFirst({
        where: { admissionSessionId: sessionId, IsDeleted: false },
      });
      if (!session) {
        throw new BadRequestException('Admission session not found');
      }
    }

    const admissionYear = await this.resolveRollYear(payload);
    if (!admissionYear || admissionYear.length !== 4) {
      throw new BadRequestException(
        academicSessionId != null
          ? 'Academic session name must include year (e.g. 2026-27)'
          : 'Session name must include admission year (e.g. 2025-26)',
      );
    }

    const CreatedBy = String(payload.CreatedBy || 'Admin User').trim() || 'Admin User';
    const collegeCode = await this.resolveCollegeCode();
    const enrollments = await this.loadEnrollments(payload);

    if (!enrollments.length) {
      throw new BadRequestException('No enrolled students found for selected filters');
    }

    const mapped: MappedEnrollment[] = enrollments
      .map((e: any): MappedEnrollment => {
        const program = e.program || e.student?.program || null;
        return {
          enrollment: e,
          studentId: Number(e.studentId),
          enrollmentId: e.enrollmentId,
          studentName: e.studentName || e.student?.candidateName || '',
          fatherName: e.fatherName || e.student?.fatherName || '',
          programId: e.programId || program?.programId || null,
          programCode: this.normalizeProgramCode(program?.programCode),
        };
      })
      .sort(this.compareAlpha.bind(this));

    const existing = await this.roll().findMany({
      where: {
        IsDeleted: false,
        admissionYear,
        studentId: { in: mapped.map((m: MappedEnrollment) => m.studentId) },
      },
    });
    const existingByStudent = new Map<number, any>();
    for (const r of existing) existingByStudent.set(Number(r.studentId), r);

    const usedRolls = new Set<string>(
      (
        await this.roll().findMany({
          where: { IsDeleted: false, admissionYear },
          select: { rollNo: true },
        })
      ).map((r: any) => String(r.rollNo || '')),
    );

    const byProgram = new Map<string, typeof mapped>();
    for (const row of mapped) {
      const list = byProgram.get(row.programCode) || [];
      list.push(row);
      byProgram.set(row.programCode, list);
    }

    let assigned = 0;
    let skipped = 0;
    const items: any[] = [];

    for (const [programCode, group] of byProgram.entries()) {
      let serial = await this.nextSerial(collegeCode, admissionYear, programCode);

      for (const row of group) {
        const already = existingByStudent.get(row.studentId);
        if (already?.rollNo) {
          skipped += 1;
          items.push({
            studentId: row.studentId,
            enrollmentId: row.enrollmentId,
            studentName: row.studentName,
            fatherName: row.fatherName,
            rollNo: already.rollNo,
            alreadyHadRoll: true,
          });
          continue;
        }

        let rollNo = '';
        let guard = 0;
        while (guard < 1000) {
          rollNo = this.buildRollNo(collegeCode, admissionYear, programCode, serial);
          if (!usedRolls.has(rollNo)) break;
          serial += 1;
          guard += 1;
        }
        if (!rollNo || usedRolls.has(rollNo)) {
          throw new BadRequestException('Could not generate a unique roll number');
        }

        const created = await this.roll().create({
          data: {
            studentId: row.studentId,
            enrollmentId: row.enrollmentId,
            sessionId,
            programId: row.programId,
            admissionYear,
            collegeCode,
            programCode,
            serialNo: this.normalizeSerial(serial),
            rollNo,
            CreatedBy,
            Remarks: payload.Remarks || null,
            IsActive: true,
            IsDeleted: false,
          },
        });

        usedRolls.add(rollNo);
        existingByStudent.set(row.studentId, created);
        assigned += 1;
        serial += 1;
        items.push({
          studentId: row.studentId,
          enrollmentId: row.enrollmentId,
          studentName: row.studentName,
          fatherName: row.fatherName,
          rollNo,
          alreadyHadRoll: false,
        });
      }
    }

    // Keep list order: Student Name A–Z then Father Name
    items.sort(this.compareAlpha.bind(this));

    return {
      assigned,
      skipped,
      collegeCode,
      admissionYear,
      total: items.length,
      items,
    };
  }

  async remove(payload: { rollId?: number | string; DeletedBy?: string; DeletedRemarks?: string }) {
    const rollId = this.toNum(payload.rollId);
    if (rollId == null) {
      throw new BadRequestException('rollId is required');
    }

    const existing = await this.roll().findFirst({
      where: { rollId, IsDeleted: false },
    });
    if (!existing) {
      throw new BadRequestException('Roll number not found');
    }

    // Hard delete so the same student can get a new roll (unique studentId+year / rollNo).
    await this.roll().delete({ where: { rollId } });
    return {
      message: 'Roll number deleted',
      rollId,
      rollNo: existing.rollNo,
    };
  }

  async bulkRemove(payload: { ids?: Array<number | string>; DeletedBy?: string; DeletedRemarks?: string }) {
    const ids = Array.isArray(payload.ids)
      ? payload.ids.map((id) => this.toNum(id)).filter((id): id is number => id != null)
      : [];
    if (!ids.length) {
      throw new BadRequestException('ids are required');
    }

    const result = await this.roll().deleteMany({
      where: { rollId: { in: ids }, IsDeleted: false },
    });
    return {
      message: `Successfully deleted ${result.count} roll number(s)`,
      count: result.count,
    };
  }
}
