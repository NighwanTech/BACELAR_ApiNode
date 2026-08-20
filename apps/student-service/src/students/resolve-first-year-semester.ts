import { NotFoundException } from '@nestjs/common';

/** Pick Year 1 + Sem 1 from masters (name match, else first active row). */
export async function resolveFirstYearAndSemester(tx: {
  yearMaster: { findMany: Function };
  semesterMaster: { findMany: Function };
}) {
  const years = await tx.yearMaster.findMany({
    where: { IsDeleted: false, IsActive: true },
    orderBy: { yearId: 'asc' },
  });
  if (!years.length) {
    throw new NotFoundException(
      'No year found in yearMaster. Please add Year 1 in masters.',
    );
  }

  const isFirstYear = (name: string) =>
    /^(year\s*)?(1|i|first|ist)\b/i.test(String(name || '').trim()) ||
    /\b(1st|first)\b/i.test(String(name || ''));

  const year = years.find((y: any) => isFirstYear(y.yearName)) || years[0];

  const semsForYear = await tx.semesterMaster.findMany({
    where: {
      IsDeleted: false,
      IsActive: true,
      yearId: year.yearId,
    },
    orderBy: { semId: 'asc' },
  });

  const allSems =
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

  const isFirstSem = (name: string) =>
    /^(sem(ester)?\s*)?(1|i|first)\b/i.test(String(name || '').trim()) ||
    /\b(1st|first)\b/i.test(String(name || ''));

  const semester =
    allSems.find((s: any) => isFirstSem(s.semesterName)) || allSems[0];

  return {
    yearId: year.yearId as number,
    semId: semester.semId as number,
    yearName: year.yearName as string,
    semesterName: semester.semesterName as string,
  };
}
