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

/** Program master codes from prisma/seed.ts (1–14). Lookup is by programCode only. */
const PASS_40_PROGRAM_CODES = new Set([4, 5, 6, 8, 9, 10, 11]); // BBA, BCA, BPEd, B.Sc.Ag, MA*
const PASS_33_PROGRAM_CODES = new Set([1, 2, 3]); // BA, B.Sc., B.Com.

export function resolveGradeScheme(program?: {
  programCode?: string | null;
  programId?: number | null;
} | null): GradeSchemeId | null {
  if (!program) return null;
  const codeNum = Number(String(program.programCode || '').replace(/\D/g, ''));
  if (!Number.isFinite(codeNum) || codeNum <= 0) return null;
  if (PASS_40_PROGRAM_CODES.has(codeNum)) return 'PASS_40';
  if (PASS_33_PROGRAM_CODES.has(codeNum)) return 'PASS_33';
  return null;
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
  theoryExternalMin?: number | null;
  sessionalInternalObt?: number | null;
  sessionalInternalMax?: number | null;
  sessionalInternalMin?: number | null;
  practicalObt?: number | null;
  practicalMax?: number | null;
  practicalMin?: number | null;
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

function belowMin(obt: number | null, min: number | null) {
  if (obt == null || min == null) return false;
  return obt < min;
}

function isAbsentStatus(attendance?: string | null) {
  const att = String(attendance || '').trim().toUpperCase();
  return att === 'A' || att === 'ABS' || att.includes('ABSENT');
}

/** Back paper: API result, absent, or any filled component below min. */
export function isBackPaper(row: {
  result?: string | null;
  grade?: string | null;
  attendanceStatus?: string | null;
  theoryExternalObt?: number | null;
  theoryExternalMin?: number | null;
  sessionalInternalObt?: number | null;
  sessionalInternalMin?: number | null;
  practicalObt?: number | null;
  practicalMin?: number | null;
}) {
  const r = String(row.result || '').trim().toUpperCase();
  if (r.includes('BACK') || r === 'F' || r === 'FAIL' || r === 'BP') return true;
  const g = String(row.grade || '').trim().toUpperCase();
  if (g === 'F') return true;
  if (isAbsentStatus(row.attendanceStatus)) return true;
  return (
    belowMin(row.theoryExternalObt ?? null, row.theoryExternalMin ?? null) ||
    belowMin(row.sessionalInternalObt ?? null, row.sessionalInternalMin ?? null) ||
    belowMin(row.practicalObt ?? null, row.practicalMin ?? null)
  );
}

export function remarkPaperCodes(
  rows: Array<{ paperCode?: string | null } & Parameters<typeof isBackPaper>[0]>,
) {
  const seen = new Set<string>();
  const codes: string[] = [];
  for (const row of rows) {
    if (!isBackPaper(row)) continue;
    const code = String(row.paperCode || '').trim();
    if (!code || seen.has(code)) continue;
    seen.add(code);
    codes.push(code);
  }
  return codes;
}

export function overallResultFromPapers(
  rows: Array<Parameters<typeof isBackPaper>[0]>,
) {
  if (!rows.length) return null;
  return rows.some(isBackPaper) ? 'PROMOTED WITH BACK' : 'PASS';
}

/**
 * Paper %:
 * - Internal (sessional) + End-sem (theory) both filled → 30% IA + 70% ESE (university weightage)
 * - Only one component filled → that component's %
 * - Practical: extra rule — must be at least 40% or the paper is PROMOTED WITH BACK
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
  const theoryMin = marks.theoryExternalMin ?? null;
  const iaObt = marks.sessionalInternalObt ?? null;
  const iaMax = marks.sessionalInternalMax ?? null;
  const iaMin = marks.sessionalInternalMin ?? null;
  const pracObt = marks.practicalObt ?? null;
  const pracMax = marks.practicalMax ?? null;
  const pracMin = marks.practicalMin ?? null;

  const theoryPct = pct(theoryObt, theoryMax);
  const iaPct = pct(iaObt, iaMax);
  const pracPct = pct(pracObt, pracMax);

  const obtainedParts = [theoryObt, iaObt, pracObt].filter((v): v is number => v != null);
  const absent = isAbsentStatus(marks.attendanceStatus);
  if (!obtainedParts.length && !absent) return empty;

  const totalMarks = obtainedParts.length
    ? round2(obtainedParts.reduce((s, v) => s + v, 0))
    : null;

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
  if (percentage != null) percentage = round2(percentage);

  const minFailed =
    belowMin(theoryObt, theoryMin) ||
    belowMin(iaObt, iaMin) ||
    belowMin(pracObt, pracMin);

  if (!scheme) {
    const failed = absent || minFailed;
    return {
      totalMarks,
      percentage,
      grade: null,
      gradePoint: null,
      result: failed ? 'PROMOTED WITH BACK' : obtainedParts.length ? 'PASS' : null,
      creditObt: null,
    };
  }

  if (percentage == null && !absent) return { ...empty, totalMarks };

  let letter = absent || percentage == null
    ? { grade: 'F', gradePoint: 0, performance: 'Unsatisfactory' }
    : gradeFromPercentage(percentage, scheme);

  const practicalFailed = pracPct != null && pracPct < 40;
  if (practicalFailed || absent || minFailed) {
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
    result: failed ? 'PROMOTED WITH BACK' : 'PASS',
    creditObt: creditMax == null ? null : failed ? 0 : creditMax,
  };
}
