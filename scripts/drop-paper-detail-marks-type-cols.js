require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

function getDbConfig() {
  const databaseUrl = process.env.DATABASE_URL || '';
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

const adapter = new PrismaMariaDb(getDbConfig());
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Altering paperDetailMaster table to drop marksType columns...');
  
  // Drop foreign key if it exists
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE \`paperDetailMaster\` DROP FOREIGN KEY \`paperDetailMaster_marksTypeId_fkey\`;`);
    console.log('Dropped foreign key paperDetailMaster_marksTypeId_fkey');
  } catch (e) {
    console.log('Foreign key paperDetailMaster_marksTypeId_fkey not found or already dropped:', e.message);
  }

  // Drop index if it exists
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE \`paperDetailMaster\` DROP INDEX \`paperDetailMaster_marksTypeId_idx\`;`);
    console.log('Dropped index paperDetailMaster_marksTypeId_idx');
  } catch (e) {
    console.log('Index paperDetailMaster_marksTypeId_idx not found or already dropped:', e.message);
  }

  // Drop marksTypeId column
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE \`paperDetailMaster\` DROP COLUMN \`marksTypeId\`;`);
    console.log('Dropped column marksTypeId from paperDetailMaster');
  } catch (e) {
    console.log('Column marksTypeId not found or already dropped:', e.message);
  }

  // Drop marksTypeName column
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE \`paperDetailMaster\` DROP COLUMN \`marksTypeName\`;`);
    console.log('Dropped column marksTypeName from paperDetailMaster');
  } catch (e) {
    console.log('Column marksTypeName not found or already dropped:', e.message);
  }

  console.log('Database cleanup completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during DB alteration:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
