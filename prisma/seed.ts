import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as dotenv from 'dotenv';
dotenv.config();

const databaseUrl = process.env.DATABASE_URL || '';
let dbConfig: any = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bacelar',
};

try {
  if (databaseUrl) {
    const url = new URL(databaseUrl);
    dbConfig = {
      host: url.hostname,
      port: url.port ? Number(url.port) : 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.split('?')[0].replace(/^\//, ''),
    };
  }
} catch (e) {
  // Use fallback
}

const adapter = new PrismaMariaDb(dbConfig);
const prisma = new PrismaClient({ adapter });

function calculateFinal(base: number): number {
  if (!base || base <= 0) return 0;
  // pgCharge = base * 2%
  // gstOnPg = pgCharge * 18%
  // total = base + pgCharge + gstOnPg
  const pgCharge = base * 0.02;
  const gstOnPg = pgCharge * 0.18;
  return Number((base + pgCharge + gstOnPg).toFixed(3)); // Storing up to 3 decimal places as seen in Excel (e.g. 1627.524)
}

async function main() {
  console.log('Seeding initial masters...');

  // 1. Seed QualificationMaster
  const qualifications = [
    { qualificationName: '10th' },
    { qualificationName: '12th' },
    { qualificationName: 'Diploma' },
    { qualificationName: 'Graduation' },
    { qualificationName: 'Post Graduation' },
  ];

  for (const qual of qualifications) {
    await prisma.qualificationMaster.upsert({
      where: { qualificationName: qual.qualificationName },
      update: {},
      create: {
        qualificationName: qual.qualificationName,
        CreatedBy: 'System Seed',
        IsActive: true,
        IsDeleted: false,
      },
    });
  }
  console.log('Seeded QualificationMaster successfully!');

  // 2. Seed BoardMaster
  const boards = [
    { boardName: 'CBSE' },
    { boardName: 'UP Board' },
    { boardName: 'ICSE' },
    { boardName: 'Bihar Board' },
  ];

  for (const board of boards) {
    await prisma.boardMaster.upsert({
      where: { boardName: board.boardName },
      update: {},
      create: {
        boardName: board.boardName,
        CreatedBy: 'System Seed',
        IsActive: true,
        IsDeleted: false,
      },
    });
  }
  console.log('Seeded BoardMaster successfully!');

  // 3. Seed Program Categories
  const categories = [
    { programCategoryName: 'BACHELOR (UNDER-GRADUATE) PROGRAMMES', pcShortName: 'UG', sequenceNo: 1 },
    { programCategoryName: 'MASTER (POST-GRADIATION) PROGRAMMES', pcShortName: 'PG', sequenceNo: 2 },
    { programCategoryName: 'INTEGRATED TEACHER EDUCATION PROGRAMME (ITEP)', pcShortName: 'ITEP', sequenceNo: 3 },
    { programCategoryName: 'DIPLOMA PROGRAM', pcShortName: 'DIPLOMA', sequenceNo: 4 },
  ];

  const categoryMap = new Map<string, number>();

  for (const cat of categories) {
    let record = await prisma.programCategory.findFirst({
      where: { programCategoryName: cat.programCategoryName },
    });
    if (!record) {
      record = await prisma.programCategory.create({
        data: {
          programCategoryName: cat.programCategoryName,
          pcShortName: cat.pcShortName,
          sequenceNo: cat.sequenceNo,
          CreatedBy: 'System Seed',
          IsActive: true,
          IsDeleted: false,
        },
      });
    }
    categoryMap.set(cat.programCategoryName, record.programCategoryId);
  }
  console.log('Seeded Program Categories successfully!');

  // 4. Seed Programs
  const programsData = [
    { name: 'B.A.', code: '1', cat: 'BACHELOR (UNDER-GRADUATE) PROGRAMMES', years: 3, terms: 6, termType: 'SEMESTER', regFee: 50, examFee: 1375 },
    { name: 'B.Sc.', code: '2', cat: 'BACHELOR (UNDER-GRADUATE) PROGRAMMES', years: 3, terms: 6, termType: 'SEMESTER', regFee: 50, examFee: 1375 },
    { name: 'B.Com.', code: '3', cat: 'BACHELOR (UNDER-GRADUATE) PROGRAMMES', years: 3, terms: 6, termType: 'SEMESTER', regFee: 50, examFee: 1375 },
    { name: 'B.B.A.', code: '4', cat: 'BACHELOR (UNDER-GRADUATE) PROGRAMMES', years: 3, terms: 6, termType: 'SEMESTER', regFee: 1000, examFee: 1375 },
    { name: 'B.C.A.', code: '5', cat: 'BACHELOR (UNDER-GRADUATE) PROGRAMMES', years: 3, terms: 6, termType: 'SEMESTER', regFee: 1000, examFee: 1375 },
    { name: 'B.P.Ed.', code: '6', cat: 'BACHELOR (UNDER-GRADUATE) PROGRAMMES', years: 2, terms: 4, termType: 'SEMESTER', regFee: 1000, examFee: 1375 },
    { name: 'B.Ed.', code: '7', cat: 'BACHELOR (UNDER-GRADUATE) PROGRAMMES', years: 2, terms: 2, termType: 'ANNUAL', regFee: 0, examFee: 4250 },
    { name: 'B.Sc. Ag.', code: '8', cat: 'BACHELOR (UNDER-GRADUATE) PROGRAMMES', years: 4, terms: 8, termType: 'SEMESTER', regFee: 50, examFee: 1575 },
    { name: 'M.A. Hindi', code: '9', cat: 'MASTER (POST-GRADIATION) PROGRAMMES', years: 2, terms: 4, termType: 'SEMESTER', regFee: 50, examFee: 1590 },
    { name: 'M.A. History', code: '10', cat: 'MASTER (POST-GRADIATION) PROGRAMMES', years: 2, terms: 4, termType: 'SEMESTER', regFee: 50, examFee: 1590 },
    { name: 'M.A. Sociology', code: '11', cat: 'MASTER (POST-GRADIATION) PROGRAMMES', years: 2, terms: 4, termType: 'SEMESTER', regFee: 50, examFee: 1590 },
    { name: 'B.A. B.Ed.', code: '12', cat: 'INTEGRATED TEACHER EDUCATION PROGRAMME (ITEP)', years: 4, terms: 8, termType: 'SEMESTER', regFee: 100, examFee: 0 },
    { name: 'B.Sc. B.Ed.', code: '13', cat: 'INTEGRATED TEACHER EDUCATION PROGRAMME (ITEP)', years: 4, terms: 8, termType: 'SEMESTER', regFee: 100, examFee: 0 },
    { name: 'D.El.Ed.', code: '14', cat: 'DIPLOMA PROGRAM', years: 2, terms: 4, termType: 'SEMESTER', regFee: 0, examFee: 0 },
  ];

  // 5. Seed Academic Session
  const session = await prisma.academicSession.upsert({
    where: { sessionName: '2026-2027' },
    update: {},
    create: {
      sessionName: '2026-2027',
      CreatedBy: 'System Seed',
      IsActive: true,
      IsDeleted: false,
    },
  });
  console.log('Seeded Academic Session successfully!');

  let seq = 1;
  for (const prog of programsData) {
    const categoryId = categoryMap.get(prog.cat);
    if (!categoryId) continue;

    // Find or create program
    let programRecord = await prisma.program.findFirst({
      where: { programName: prog.name, programCategoryId: categoryId },
    });
    if (!programRecord) {
      programRecord = await prisma.program.create({
        data: {
          programCategoryId: categoryId,
          programName: prog.name,
          programShortName: prog.name,
          programCode: prog.code,
          durationYears: prog.years,
          termType: prog.termType,
          totalTerms: prog.terms,
          sequenceNo: seq++,
          CreatedBy: 'System Seed',
          IsActive: true,
          IsDeleted: false,
        },
      });
    }

    // Find or create associated fee config for session 2026-2027
    const feeConfig = await prisma.programFeeConfig.findFirst({
      where: { programId: programRecord.programId, sessionId: session.sessionId },
    });
    if (!feeConfig) {
      await prisma.programFeeConfig.create({
        data: {
          programId: programRecord.programId,
          sessionId: session.sessionId,
          registrationBaseFee: prog.regFee,
          registrationPgRate: 2.00,
          registrationGstRate: 18.00,
          registrationFinal: calculateFinal(prog.regFee),
          examinationBaseFee: prog.examFee,
          examinationPgRate: 2.00,
          examinationGstRate: 18.00,
          examinationFinal: calculateFinal(prog.examFee),
          CreatedBy: 'System Seed',
          IsActive: true,
          IsDeleted: false,
        },
      });
    }
  }

  console.log('Seeded Programs and Program Fee Configurations successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
