import { NotFoundException } from '@nestjs/common';

type YearRow = { yearId: number; yearName: string };
type SemRow = { semId: number; semesterName: string; yearId?: number | null };

type MasterTx = {
  yearMaster: { findMany: Function };
  semesterMaster: { findMany: Function };
};

const isFirstYearName = (name: string) =>
  /^(year\s*)?(1|i|first|ist)\b/i.test(String(name || '').trim()) ||
  /\b(1st|first)\b/i.test(String(name || ''));

const isFirstSemName = (name: string) =>
  /^(sem(ester)?\s*)?(1|i|first)\b/i.test(String(name || '').trim()) ||
  /\b(1st|first)\b/i.test(String(name || ''));

const isPreviousYearName = (name: string) =>
  /previous/i.test(String(name || ''));

function programLabel(program: {
  programCode?: string | null;
  programName?: string | null;
  programShortName?: string | null;
  termType?: string | null;
}) {
  const code = String(program.programCode || '').trim();
  const termType = String(program.termType || '').trim().toUpperCase();
  const name = `${program.programName || ''} ${program.programShortName || ''}`
    .toLowerCase()
    .replace(/\s+/g, ' ');
  const isBped =
    code === '6' || /\bb\.?\s*p\.?\s*ed\b/.test(name) || /\bbped\b/.test(name);
  const isBed =
    !isBped &&
    (code === '7' ||
      ((/\bb\.?\s*ed\b/.test(name) || /\bbed\b/.test(name)) &&
        !/\bb\.?\s*a\b/.test(name) &&
        !/\bb\.?\s*sc\b/.test(name)));
  return { isBped, isBed, isAnnual: termType === 'ANNUAL' || isBed };
}

async function loadActiveYears(tx: MasterTx): Promise<YearRow[]> {
  const years = await tx.yearMaster.findMany({
    where: { IsDeleted: false, IsActive: true },
    orderBy: { yearId: 'asc' },
  });
  if (!years.length) {
    throw new NotFoundException(
      'No year found in yearMaster. Please add Year 1 in masters.',
    );
  }
  return years as YearRow[];
}

async function resolveFirstSemesterForYear(tx: MasterTx, year: YearRow) {
  const semsForYear = await tx.semesterMaster.findMany({
    where: {
      IsDeleted: false,
      IsActive: true,
      yearId: year.yearId,
    },
    orderBy: { semId: 'asc' },
  });

  const allSems: SemRow[] =
    semsForYear.length > 0
      ? semsForYear
      : await tx.semesterMaster.findMany({
          where: { IsDeleted: false, IsActive: true },
          orderBy: { semId: 'asc' },
        });

  if (!allSems.length) {
    throw new NotFoundException(
      'No semester found in semesterMaster. Please add Semester 1 in masters.',
    );
  }

  const semester =
    allSems.find((s) => isFirstSemName(s.semesterName)) || allSems[0];

  return {
    yearId: year.yearId,
    semId: semester.semId,
    yearName: year.yearName,
    semesterName: semester.semesterName,
  };
}

/** Pick Year 1 + Sem 1 from masters (name match, else first active row). */
export async function resolveFirstYearAndSemester(tx: MasterTx) {
  const years = await loadActiveYears(tx);
  const year = years.find((y) => isFirstYearName(y.yearName)) || years[0];
  return resolveFirstSemesterForYear(tx, year);
}

/**
 * Program-aware year/sem at academic save (when the course is chosen):
 * - B.P.Ed and B.Ed / ANNUAL → Previous Year, no semester
 * - Other semester programs → 1st Year + 1st Sem
 */
export async function resolveYearAndSemesterForProgram(
  tx: MasterTx,
  program: {
    programCode?: string | null;
    programName?: string | null;
    programShortName?: string | null;
    termType?: string | null;
  },
) {
  const years = await loadActiveYears(tx);
  const firstYear = years.find((y) => isFirstYearName(y.yearName)) || years[0];
  const { isBped, isAnnual } = programLabel(program);

  if (isBped || isAnnual) {
    const previousYear = years.find((y) => isPreviousYearName(y.yearName));
    if (!previousYear) {
      throw new NotFoundException(
        'No "Previous Year" found in yearMaster. Please add it for B.Ed / B.P.Ed.',
      );
    }
    return {
      yearId: previousYear.yearId,
      semId: null as number | null,
      yearName: previousYear.yearName,
      semesterName: null as string | null,
    };
  }

  return resolveFirstSemesterForYear(tx, firstYear);
}
