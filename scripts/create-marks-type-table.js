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
  const sql = `
    CREATE TABLE IF NOT EXISTS \`marksTypeMaster\` (
      \`marksTypeId\` INT AUTO_INCREMENT PRIMARY KEY,
      \`marksTypeName\` VARCHAR(100) NOT NULL UNIQUE,
      \`CreatedOn\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      \`CreatedBy\` VARCHAR(255) NOT NULL,
      \`UpdatedOn\` DATETIME(3) NULL ON UPDATE CURRENT_TIMESTAMP(3),
      \`UpdatedBy\` VARCHAR(255) NULL,
      \`IsActive\` TINYINT(1) NOT NULL DEFAULT 1,
      \`IsDeleted\` TINYINT(1) NOT NULL DEFAULT 0,
      \`DeletedRemarks\` VARCHAR(255) NULL,
      \`DeletedOn\` DATETIME(3) NULL,
      \`DeletedBy\` VARCHAR(255) NULL,
      \`Remarks\` VARCHAR(255) NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;
  await prisma.$executeRawUnsafe(sql);
  console.log('SUCCESS: Table marksTypeMaster created in the MySQL database!');
}

main()
  .catch((e) => {
    console.error('Error creating table:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
