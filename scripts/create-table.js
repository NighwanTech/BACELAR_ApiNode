const fs = require('fs');
const path = require('path');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const { PrismaClient } = require('@prisma/client');

function getDbConfig() {
  const databaseUrl = process.env.DATABASE_URL || 'mysql://u963801592_bacelar_User:Bacelar%40123@srv1100.hstgr.io:3306/u963801592_bacelar_Dev';
  try {
    const url = new URL(databaseUrl);
    return {
      host: url.hostname,
      port: url.port ? Number(url.port) : 3306,
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: decodeURIComponent(url.pathname.split('?')[0].replace(/^\//, '')),
      connectionLimit: 2,
      connectTimeout: 30000,
      acquireTimeout: 30000,
      ssl: false,
      allowPublicKeyRetrieval: true,
    };
  } catch {
    return {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
      database: 'backend_db',
    };
  }
}

async function main() {
  const adapter = new PrismaMariaDb(getDbConfig());
  const prisma = new PrismaClient({ adapter });

  const sqlPath = path.join(__dirname, '../prisma/sql/create-attendance-days.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');
  console.log('Connecting to database and executing SQL to create attendanceDays table...');
  await prisma.$executeRawUnsafe(sql);

  // Add column studentEnrollmentId if table already existed
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE attendanceDays ADD COLUMN studentEnrollmentId INT NULL AFTER studentId;`);
    console.log('Added studentEnrollmentId column.');
  } catch (err) {
    console.log('Column studentEnrollmentId already exists or added.');
  }

  try {
    await prisma.$executeRawUnsafe(`CREATE INDEX attendanceDays_studentEnrollmentId_idx ON attendanceDays(studentEnrollmentId);`);
    console.log('Added index for studentEnrollmentId.');
  } catch (err) {
    console.log('Index for studentEnrollmentId already exists.');
  }

  console.log('SUCCESS: Table "attendanceDays" updated successfully in live database!');
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error('FAILED:', err);
  process.exit(1);
});
