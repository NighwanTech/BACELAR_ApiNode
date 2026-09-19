/**
 * Bundelkhand University (Jhansi) 10-point letter grades.
 *
 * Two charts, picked from the student's program (not category):
 *
 *   Group A (pass at 40%): MA, BBA, BCA, B.Sc. Ag., B.P.Ed.
 *   Group B (pass at 33%): BA, B.Sc., B.Com.
 *
 * 75-mark theory tables in the university note are the same % bands
 * applied to 75. We always grade on percentage so 50/75/100 max all work.
 *
 * B.Ed. / ITEP / D.El.Ed. are not in either chart — grade stays null.
 */

export type GradeSchemeId = 'PASS_40' | 'PASS_33';

export type LetterGrade = {
  grade: string;
  gradePoint: number;
  performance: string;
};

/** Program master codes from prisma/seed.ts (1–14). */
const PASS_40_PROGRAM_CODES = new Set([4, 5, 6, 8, 9, 10, 11]); // BBA, BCA, BPEd, B.Sc.Ag, MA*
const PASS_33_PROGRAM_CODES = new Set([1, 2, 3]); // BA, B.Sc., B.Com.

export function resolveGradeScheme(program?: {
  programCode?: string | null;
  programShortName?: string | null;
  programName?: string | null;
} | null): GradeSchemeId | null {
  if (!program) return null;

  const codeNum = Number(String(program.programCode || '').replace(/\D/g, ''));
  if (PASS_40_PROGRAM_CODES.has(codeNum)) return 'PASS_40';
  if (PASS_33_PROGRAM_CODES.has(codeNum)) return 'PASS_33';

  const fromName = (raw?: string | null): GradeSchemeId | null => {
    const key = String(raw || '')
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, '');
    if (!key) return null;
    if (key.includes('BSCBED') || key.includes('BABED') || key === 'BED' || key.includes('DELED')) {
      return null;
    }
    if (key.includes('BSCAG') || key.includes('BBA') || key.includes('BCA') || key.includes('BPED') || key.startsWith('MA')) {
      return 'PASS_40';
    }
    if (key.includes('BCOM') || key === 'BSC' || key === 'BA') {
      return 'PASS_33';
    }
    return null;
  };

  return fromName(program.programShortName) ?? fromName(program.programName);
}

/**
 * Letter grade from overall %. Same bands 90→50 for both groups;
 * only the pass (P) / fail (F) cut-off changes.
 */
export function gradeFromPercentage(percentage: number, scheme: GradeSchemeId): LetterGrade {
  if (percentage >= 90) return { grade: 'O', gradePoint: 10, performance: 'Outstanding' };
  if (percentage >= 80) return { grade: 'A+', gradePoint: 9, performance: 'Excellent' };
  if (percentage >= 70) return { grade: 'A', gradePoint: 8, performance: 'Very Good' };
  if (percentage >= 60) return { grade: 'B+', gradePoint: 7, performance: 'Good' };
  if (percentage >= 50) return { grade: 'B', gradePoint: 6, performance: 'Above Average' };

  if (scheme === 'PASS_40') {
    // MA / BBA / BCA / B.Sc. Ag. / B.P.Ed.
    if (percentage >= 45) return { grade: 'C', gradePoint: 5, performance: 'Average' };
    if (percentage >= 40) return { grade: 'P', gradePoint: 4, performance: 'Satisfactory' };
    return { grade: 'F', gradePoint: 0, performance: 'Unsatisfactory' };
  }

  // BA / B.Sc. / B.Com.
  if (percentage >= 40) return { grade: 'C', gradePoint: 5, performance: 'Average' };
  if (percentage >= 33) return { grade: 'P', gradePoint: 4, performance: 'Satisfactory' };
  return { grade: 'F', gradePoint: 0, performance: 'Unsatisfactory' };
}

function pct(obt: number | null, max: number | null): number | null {
  if (obt == null || max == null || max <= 0) return null;
  return (obt / max) * 100;
}

export type PaperMarkParts = {
  theoryExternalObt?: number | null;
  theoryExternalMax?: number | null;
  sessionalInternalObt?: number | null;
  sessionalInternalMax?: number | null;
  practicalObt?: number | null;
  practicalMax?: number | null;
  attendanceStatus?: string | null;
  creditMax?: number | null;
  paperType?: string | null;
};

export type PaperGradeResult = {
  totalMarks: number | null;
  percentage: number | null;
  grade: string | null;
  gradePoint: number | null;
  result: string | null;
  creditObt: number | null;
};

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

/**
 * Paper %:
 * - Internal (sessional) + End-sem (theory) both filled → 30% IA + 70% ESE (university weightage)
 * - Only one component filled → that component's %
 * - Practical: extra rule — must be at least 40% or the paper is FAIL
 */
export function computePaperGrade(
  marks: PaperMarkParts,
  scheme: GradeSchemeId | null,
): PaperGradeResult {
  const empty: PaperGradeResult = {
    totalMarks: null,
    percentage: null,
    grade: null,
    gradePoint: null,
    result: null,
    creditObt: null,
  };

  const theoryObt = marks.theoryExternalObt ?? null;
  const theoryMax = marks.theoryExternalMax ?? null;
  const iaObt = marks.sessionalInternalObt ?? null;
  const iaMax = marks.sessionalInternalMax ?? null;
  const pracObt = marks.practicalObt ?? null;
  const pracMax = marks.practicalMax ?? null;

  const theoryPct = pct(theoryObt, theoryMax);
  const iaPct = pct(iaObt, iaMax);
  const pracPct = pct(pracObt, pracMax);

  const obtainedParts = [theoryObt, iaObt, pracObt].filter((v): v is number => v != null);
  if (!obtainedParts.length) return empty;

  const totalMarks = round2(obtainedParts.reduce((s, v) => s + v, 0));

  let percentage: number | null = null;
  if (theoryPct != null && iaPct != null) {
    percentage = theoryPct * 0.7 + iaPct * 0.3;
  } else if (theoryPct != null) {
    percentage = theoryPct;
  } else if (iaPct != null) {
    percentage = iaPct;
  } else if (pracPct != null) {
    percentage = pracPct;
  }

  if (percentage == null) return { ...empty, totalMarks };
  percentage = round2(percentage);

  const absent = String(marks.attendanceStatus || '').trim().toUpperCase() === 'A';
  if (!scheme) {
    return {
      totalMarks,
      percentage,
      grade: null,
      gradePoint: null,
      result: absent ? 'FAIL' : null,
      creditObt: null,
    };
  }

  let letter = absent
    ? { grade: 'F', gradePoint: 0, performance: 'Unsatisfactory' }
    : gradeFromPercentage(percentage, scheme);

  // Practical / lab: minimum 40% on both charts, even if overall % is a pass.
  const practicalFailed = pracPct != null && pracPct < 40;
  if (practicalFailed || absent) {
    letter = { grade: 'F', gradePoint: 0, performance: 'Unsatisfactory' };
  }

  const failed = letter.grade === 'F';
  const creditMax = marks.creditMax != null && Number.isFinite(Number(marks.creditMax))
    ? Number(marks.creditMax)
    : null;

  return {
    totalMarks,
    percentage,
    grade: letter.grade,
    gradePoint: letter.gradePoint,
    result: failed ? 'FAIL' : 'PASS',
    creditObt: creditMax == null ? null : failed ? 0 : creditMax,
  };
}
