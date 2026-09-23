import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  OnModuleInit,
} from '@nestjs/common';
import { randomInt } from 'crypto';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

const SINGLE_DOC_TYPES = ['PROFILE_PHOTO', 'AADHAR', 'PAN', 'SIGNATURE', 'BANK_PASSBOOK'];
const ALLOWED_DOC_TYPES = [...SINGLE_DOC_TYPES, 'OTHER'];

const CREATE_FACULTY_TABLE = `
CREATE TABLE IF NOT EXISTS \`facultyMaster\` (
    \`facultyId\` INTEGER NOT NULL AUTO_INCREMENT,
    \`employeeId\` CHAR(6) NOT NULL,
    \`employeTypeId\` INTEGER NOT NULL,
    \`employeTypeName\` VARCHAR(100) NOT NULL,
    \`employeeCategoryId\` INTEGER NOT NULL,
    \`employeeCategoryName\` VARCHAR(100) NOT NULL,
    \`employeeDesignationId\` INTEGER NOT NULL,
    \`employeeDesignationName\` VARCHAR(100) NOT NULL,
    \`employeeDepartmentId\` INTEGER NOT NULL,
    \`employeeDepartmentName\` VARCHAR(100) NOT NULL,
    \`employeeName\` VARCHAR(255) NOT NULL,
    \`fatherOrHusbandName\` VARCHAR(255) NULL,
    \`gender\` VARCHAR(50) NULL,
    \`dateOfBirth\` DATETIME(3) NULL,
    \`aadharNo\` VARCHAR(50) NULL,
    \`panNo\` VARCHAR(20) NULL,
    \`maritalStatus\` VARCHAR(50) NULL,
    \`religion\` VARCHAR(100) NULL,
    \`category\` VARCHAR(100) NULL,
    \`bloodGroup\` VARCHAR(20) NULL,
    \`mobileNo\` VARCHAR(20) NULL,
    \`alternateMobileNo\` VARCHAR(20) NULL,
    \`personalEmail\` VARCHAR(255) NULL,
    \`officialEmail\` VARCHAR(255) NULL,
    \`address\` TEXT NULL,
    \`district\` VARCHAR(100) NULL,
    \`stateId\` INTEGER NULL,
    \`state\` VARCHAR(100) NULL,
    \`cityId\` INTEGER NULL,
    \`city\` VARCHAR(100) NULL,
    \`zipcodeId\` INTEGER NULL,
    \`pincode\` VARCHAR(20) NULL,
    \`dateOfJoining\` DATETIME(3) NULL,
    \`dateOfConfirmation\` DATETIME(3) NULL,
    \`bankName\` VARCHAR(255) NULL,
    \`ifscCode\` VARCHAR(20) NULL,
    \`accountNumber\` VARCHAR(30) NULL,
    \`branch\` VARCHAR(255) NULL,
    \`payScale\` VARCHAR(100) NULL,
    \`basicSalary\` DECIMAL(12, 2) NULL,
    \`pfApplicable\` BOOLEAN NOT NULL DEFAULT false,
    \`CreatedOn\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`CreatedBy\` VARCHAR(255) NOT NULL,
    \`UpdatedOn\` DATETIME(3) NULL,
    \`UpdatedBy\` VARCHAR(255) NULL,
    \`IsActive\` BOOLEAN NOT NULL DEFAULT true,
    \`IsDeleted\` BOOLEAN NOT NULL DEFAULT false,
    \`DeletedRemarks\` VARCHAR(255) NULL,
    \`DeletedOn\` DATETIME(3) NULL,
    \`DeletedBy\` VARCHAR(255) NULL,
    \`Remarks\` VARCHAR(255) NULL,
    UNIQUE INDEX \`facultyMaster_employeeId_key\`(\`employeeId\`),
    UNIQUE INDEX \`facultyMaster_aadharNo_key\`(\`aadharNo\`),
    UNIQUE INDEX \`facultyMaster_panNo_key\`(\`panNo\`),
    INDEX \`facultyMaster_employeTypeId_idx\`(\`employeTypeId\`),
    INDEX \`facultyMaster_employeeCategoryId_idx\`(\`employeeCategoryId\`),
    INDEX \`facultyMaster_employeeDesignationId_idx\`(\`employeeDesignationId\`),
    INDEX \`facultyMaster_employeeDepartmentId_idx\`(\`employeeDepartmentId\`),
    INDEX \`facultyMaster_stateId_idx\`(\`stateId\`),
    INDEX \`facultyMaster_cityId_idx\`(\`cityId\`),
    INDEX \`facultyMaster_zipcodeId_idx\`(\`zipcodeId\`),
    PRIMARY KEY (\`facultyId\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
`;

const ALTER_FACULTY_ACCOUNT = `
ALTER TABLE \`facultyMaster\`
  ADD COLUMN IF NOT EXISTS \`accountNumber\` VARCHAR(30) NULL AFTER \`ifscCode\`;
`;

const ALTER_FACULTY_ADDRESS = `
ALTER TABLE \`facultyMaster\`
  ADD COLUMN IF NOT EXISTS \`stateId\` INTEGER NULL AFTER \`district\`,
  ADD COLUMN IF NOT EXISTS \`cityId\` INTEGER NULL AFTER \`state\`,
  ADD COLUMN IF NOT EXISTS \`city\` VARCHAR(100) NULL AFTER \`cityId\`,
  ADD COLUMN IF NOT EXISTS \`zipcodeId\` INTEGER NULL AFTER \`city\`
`;

const CREATE_FACULTY_EDUCATION_TABLE = `
CREATE TABLE IF NOT EXISTS \`facultyEducation\` (
    \`facultyEducationId\` INTEGER NOT NULL AUTO_INCREMENT,
    \`facultyId\` INTEGER NOT NULL,
    \`qualification\` VARCHAR(255) NULL,
    \`degreeName\` VARCHAR(255) NULL,
    \`specializationSubject\` VARCHAR(255) NULL,
    \`university\` VARCHAR(255) NULL,
    \`collegeInstitute\` VARCHAR(255) NULL,
    \`passingYear\` INTEGER NULL,
    \`certificateUrl\` VARCHAR(2000) NULL,
    \`certificateName\` VARCHAR(255) NULL,
    \`CreatedOn\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`CreatedBy\` VARCHAR(255) NOT NULL,
    \`UpdatedOn\` DATETIME(3) NULL,
    \`UpdatedBy\` VARCHAR(255) NULL,
    \`IsActive\` BOOLEAN NOT NULL DEFAULT true,
    \`IsDeleted\` BOOLEAN NOT NULL DEFAULT false,
    \`DeletedRemarks\` VARCHAR(255) NULL,
    \`DeletedOn\` DATETIME(3) NULL,
    \`DeletedBy\` VARCHAR(255) NULL,
    \`Remarks\` VARCHAR(255) NULL,
    INDEX \`facultyEducation_facultyId_idx\`(\`facultyId\`),
    PRIMARY KEY (\`facultyEducationId\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
`;

const CREATE_FACULTY_EXPERIENCE_TABLE = `
CREATE TABLE IF NOT EXISTS \`facultyExperience\` (
    \`facultyExperienceId\` INTEGER NOT NULL AUTO_INCREMENT,
    \`facultyId\` INTEGER NOT NULL,
    \`schoolName\` VARCHAR(255) NULL,
    \`ctc\` DECIMAL(12, 2) NULL,
    \`startYear\` DATE NULL,
    \`endYear\` DATE NULL,
    \`experienceLetterUrl\` VARCHAR(2000) NULL,
    \`experienceLetterName\` VARCHAR(255) NULL,
    \`CreatedOn\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`CreatedBy\` VARCHAR(255) NOT NULL,
    \`UpdatedOn\` DATETIME(3) NULL,
    \`UpdatedBy\` VARCHAR(255) NULL,
    \`IsActive\` BOOLEAN NOT NULL DEFAULT true,
    \`IsDeleted\` BOOLEAN NOT NULL DEFAULT false,
    \`DeletedRemarks\` VARCHAR(255) NULL,
    \`DeletedOn\` DATETIME(3) NULL,
    \`DeletedBy\` VARCHAR(255) NULL,
    \`Remarks\` VARCHAR(255) NULL,
    INDEX \`facultyExperience_facultyId_idx\`(\`facultyId\`),
    PRIMARY KEY (\`facultyExperienceId\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
`;

const CREATE_FACULTY_RESEARCH_TABLE = `
CREATE TABLE IF NOT EXISTS \`facultyResearch\` (
    \`facultyResearchId\` INTEGER NOT NULL AUTO_INCREMENT,
    \`facultyId\` INTEGER NOT NULL,
    \`scholarId\` VARCHAR(100) NULL,
    \`vidwanId\` VARCHAR(100) NULL,
    \`orcid\` VARCHAR(50) NULL,
    \`scopusId\` VARCHAR(100) NULL,
    \`researcherId\` VARCHAR(100) NULL,
    \`researchArea\` VARCHAR(255) NULL,
    \`researchGateId\` VARCHAR(100) NULL,
    \`researchAcademicProfile\` TEXT NULL,
    \`CreatedOn\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`CreatedBy\` VARCHAR(255) NOT NULL,
    \`UpdatedOn\` DATETIME(3) NULL,
    \`UpdatedBy\` VARCHAR(255) NULL,
    \`IsActive\` BOOLEAN NOT NULL DEFAULT true,
    \`IsDeleted\` BOOLEAN NOT NULL DEFAULT false,
    \`DeletedRemarks\` VARCHAR(255) NULL,
    \`DeletedOn\` DATETIME(3) NULL,
    \`DeletedBy\` VARCHAR(255) NULL,
    \`Remarks\` VARCHAR(255) NULL,
    UNIQUE INDEX \`facultyResearch_facultyId_key\`(\`facultyId\`),
    PRIMARY KEY (\`facultyResearchId\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
`;

const CREATE_FACULTY_DOCUMENT_TABLE = `
CREATE TABLE IF NOT EXISTS \`facultyDocument\` (
    \`facultyDocumentId\` INTEGER NOT NULL AUTO_INCREMENT,
    \`facultyId\` INTEGER NOT NULL,
    \`documentType\` VARCHAR(50) NOT NULL,
    \`fileUrl\` VARCHAR(2000) NOT NULL,
    \`fileName\` VARCHAR(255) NULL,
    \`CreatedOn\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`CreatedBy\` VARCHAR(255) NOT NULL,
    \`UpdatedOn\` DATETIME(3) NULL,
    \`UpdatedBy\` VARCHAR(255) NULL,
    \`IsActive\` BOOLEAN NOT NULL DEFAULT true,
    \`IsDeleted\` BOOLEAN NOT NULL DEFAULT false,
    \`DeletedRemarks\` VARCHAR(255) NULL,
    \`DeletedOn\` DATETIME(3) NULL,
    \`DeletedBy\` VARCHAR(255) NULL,
    \`Remarks\` VARCHAR(255) NULL,
    INDEX \`facultyDocument_facultyId_idx\`(\`facultyId\`),
    INDEX \`facultyDocument_documentType_idx\`(\`documentType\`),
    PRIMARY KEY (\`facultyDocumentId\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
`;

function str(value: any): string | null {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  return text === '' ? null : text;
}

function parseDate(value: any): Date | null {
  if (value === undefined || value === null || value === '') return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function parseSalary(value: any) {
  if (value === undefined || value === null || value === '') return null;
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function parseOptionalInt(value: any): number | null {
  if (value === undefined || value === null || value === '') return null;
  const num = Number(value);
  return Number.isInteger(num) && num > 0 ? num : null;
}

function parseYear(value: any): number | null {
  if (value === undefined || value === null || value === '') return null;
  const num = Number(value);
  if (!Number.isInteger(num) || num < 1900 || num > 2100) return null;
  return num;
}

/** Faculty CRUD + facultyDocument metadata */
@Injectable()
export class FacultyService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.$executeRawUnsafe(CREATE_FACULTY_TABLE);
    await this.prisma.$executeRawUnsafe(CREATE_FACULTY_DOCUMENT_TABLE);
    await this.prisma.$executeRawUnsafe(ALTER_FACULTY_ADDRESS);
    await this.prisma.$executeRawUnsafe(ALTER_FACULTY_ACCOUNT);
    await this.prisma.$executeRawUnsafe(CREATE_FACULTY_EDUCATION_TABLE);
    await this.prisma.$executeRawUnsafe(CREATE_FACULTY_EXPERIENCE_TABLE);
    await this.prisma.$executeRawUnsafe(CREATE_FACULTY_RESEARCH_TABLE);
    await this.migrateLegacyEducationAndExperience();
    await this.migrateLegacyResearch();
    await this.migrateExperienceDates();
  }

  private async columnExists(table: string, column: string): Promise<boolean> {
    const rows = await this.prisma.$queryRawUnsafe<Array<{ ok: number }>>(
      `SELECT 1 AS ok FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = '${table}' AND COLUMN_NAME = '${column}' LIMIT 1`,
    );
    return Array.isArray(rows) && rows.length > 0;
  }

  private async migrateLegacyEducationAndExperience() {
    if (await this.columnExists('facultyMaster', 'qualification')) {
      await this.prisma.$executeRawUnsafe(`
        INSERT INTO \`facultyEducation\` (
          \`facultyId\`, \`qualification\`, \`degreeName\`, \`specializationSubject\`, \`university\`, \`collegeInstitute\`, \`CreatedBy\`
        )
        SELECT
          \`facultyId\`, \`qualification\`, \`degreeName\`, \`specializationSubject\`, \`university\`, \`collegeInstitute\`, \`CreatedBy\`
        FROM \`facultyMaster\`
        WHERE (
          \`qualification\` IS NOT NULL OR \`degreeName\` IS NOT NULL OR \`specializationSubject\` IS NOT NULL
          OR \`university\` IS NOT NULL OR \`collegeInstitute\` IS NOT NULL
        )
        AND NOT EXISTS (
          SELECT 1 FROM \`facultyEducation\` e
          WHERE e.\`facultyId\` = \`facultyMaster\`.\`facultyId\` AND e.\`IsDeleted\` = false
        )
      `);
      await this.prisma.$executeRawUnsafe(`
        ALTER TABLE \`facultyMaster\`
          DROP COLUMN IF EXISTS \`qualification\`,
          DROP COLUMN IF EXISTS \`degreeName\`,
          DROP COLUMN IF EXISTS \`specializationSubject\`,
          DROP COLUMN IF EXISTS \`university\`,
          DROP COLUMN IF EXISTS \`collegeInstitute\`
      `);
    }

    if (await this.columnExists('facultyMaster', 'experienceDetails')) {
      await this.prisma.$executeRawUnsafe(`
        INSERT INTO \`facultyExperience\` (\`facultyId\`, \`schoolName\`, \`CreatedBy\`)
        SELECT \`facultyId\`, LEFT(\`experienceDetails\`, 255), \`CreatedBy\`
        FROM \`facultyMaster\`
        WHERE \`experienceDetails\` IS NOT NULL AND TRIM(\`experienceDetails\`) <> ''
        AND NOT EXISTS (
          SELECT 1 FROM \`facultyExperience\` e
          WHERE e.\`facultyId\` = \`facultyMaster\`.\`facultyId\` AND e.\`IsDeleted\` = false
        )
      `);
      await this.prisma.$executeRawUnsafe(`
        ALTER TABLE \`facultyMaster\` DROP COLUMN IF EXISTS \`experienceDetails\`
      `);
    }
  }

  /** Converts old year numbers into calendar dates. */
  private async migrateExperienceDates() {
    const rows = await this.prisma.$queryRawUnsafe<Array<{ COLUMN_NAME: string; DATA_TYPE: string }>>(
      `SELECT COLUMN_NAME, DATA_TYPE FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'facultyExperience'
         AND COLUMN_NAME IN ('startYear', 'endYear')`,
    );
    for (const col of ['startYear', 'endYear']) {
      const info = rows.find((row) => row.COLUMN_NAME === col);
      if (!info || String(info.DATA_TYPE).toLowerCase() !== 'int') continue;
      await this.prisma.$executeRawUnsafe(`ALTER TABLE \`facultyExperience\` ADD COLUMN \`${col}Date\` DATE NULL`);
      await this.prisma.$executeRawUnsafe(
        `UPDATE \`facultyExperience\`
         SET \`${col}Date\` = STR_TO_DATE(CONCAT(\`${col}\`, '-01-01'), '%Y-%m-%d')
         WHERE \`${col}\` BETWEEN 1900 AND 2100`,
      );
      await this.prisma.$executeRawUnsafe(`ALTER TABLE \`facultyExperience\` DROP COLUMN \`${col}\``);
      await this.prisma.$executeRawUnsafe(`ALTER TABLE \`facultyExperience\` CHANGE \`${col}Date\` \`${col}\` DATE NULL`);
    }
  }

  private async migrateLegacyResearch() {
    if (!(await this.columnExists('facultyMaster', 'researchAcademicProfile'))) return;
    await this.prisma.$executeRawUnsafe(`
      INSERT INTO \`facultyResearch\` (\`facultyId\`, \`researchAcademicProfile\`, \`CreatedBy\`)
      SELECT \`facultyId\`, \`researchAcademicProfile\`, \`CreatedBy\`
      FROM \`facultyMaster\`
      WHERE \`researchAcademicProfile\` IS NOT NULL AND TRIM(\`researchAcademicProfile\`) <> ''
      AND NOT EXISTS (
        SELECT 1 FROM \`facultyResearch\` r
        WHERE r.\`facultyId\` = \`facultyMaster\`.\`facultyId\`
      )
    `);
    await this.prisma.$executeRawUnsafe(`
      ALTER TABLE \`facultyMaster\` DROP COLUMN IF EXISTS \`researchAcademicProfile\`
    `);
  }

  private get facultyDb() {
    const db = (this.prisma as any).facultyMaster;
    if (!db) {
      throw new Error('Prisma model facultyMaster is missing. Restart API after prisma generate.');
    }
    return db;
  }

  private get documentDb() {
    const db = (this.prisma as any).facultyDocument;
    if (!db) {
      throw new Error('Prisma model facultyDocument is missing. Restart API after prisma generate.');
    }
    return db;
  }

  private get educationDb() {
    const db = (this.prisma as any).facultyEducation;
    if (!db) {
      throw new Error('Prisma model facultyEducation is missing. Restart API after prisma generate.');
    }
    return db;
  }

  private get experienceDb() {
    const db = (this.prisma as any).facultyExperience;
    if (!db) {
      throw new Error('Prisma model facultyExperience is missing. Restart API after prisma generate.');
    }
    return db;
  }

  private get researchDb() {
    const db = (this.prisma as any).facultyResearch;
    if (!db) {
      throw new Error('Prisma model facultyResearch is missing. Run prisma generate and restart the API.');
    }
    return db;
  }

  private documentInclude = {
    where: { IsDeleted: false },
    orderBy: { CreatedOn: 'desc' as const },
  };

  private educationInclude = {
    where: { IsDeleted: false },
    orderBy: { facultyEducationId: 'asc' as const },
  };

  private experienceInclude = {
    where: { IsDeleted: false },
    orderBy: { facultyExperienceId: 'asc' as const },
  };

  private facultyInclude = {
    documents: this.documentInclude,
    educations: this.educationInclude,
    experiences: this.experienceInclude,
    research: true,
  };

  private presentFaculty(row: any) {
    if (!row) return row;
    const research = row.research && !row.research.IsDeleted ? row.research : null;
    return { ...row, research };
  }

  private async generateEmployeeId(): Promise<string> {
    for (let attempt = 0; attempt < 25; attempt++) {
      const employeeId = String(randomInt(100000, 1000000));
      const exists = await this.facultyDb.findFirst({ where: { employeeId } });
      if (!exists) return employeeId;
    }
    throw new ConflictException('Could not generate a unique 6-digit Employee ID');
  }

  private async resolveMasterNames(data: any) {
    const typeId = Number(data.employeTypeId);
    const categoryId = Number(data.employeeCategoryId);
    const designationId = Number(data.employeeDesignationId);
    const departmentId = Number(data.employeeDepartmentId);

    const [employeType, employeeCategory, employeeDesignation, employeeDepartment] = await Promise.all([
      (this.prisma as any).employeTypeMaster.findFirst({
        where: { employeTypeId: typeId, IsDeleted: false },
      }),
      (this.prisma as any).employeeCategoryMaster.findFirst({
        where: { employeeCategoryId: categoryId, IsDeleted: false },
      }),
      (this.prisma as any).employeeDesignationMaster.findFirst({
        where: { employeeDesignationId: designationId, IsDeleted: false },
      }),
      (this.prisma as any).employeeDepartmentMaster.findFirst({
        where: { employeeDepartmentId: departmentId, IsDeleted: false },
      }),
    ]);

    if (!employeType) throw new NotFoundException(`Employee type with ID ${typeId} not found`);
    if (!employeeCategory) throw new NotFoundException(`Employee category with ID ${categoryId} not found`);
    if (!employeeDesignation) throw new NotFoundException(`Employee designation with ID ${designationId} not found`);
    if (!employeeDepartment) throw new NotFoundException(`Employee department with ID ${departmentId} not found`);

    return {
      employeTypeId: typeId,
      employeTypeName: employeType.employeTypeName,
      employeeCategoryId: categoryId,
      employeeCategoryName: employeeCategory.employeeCategoryName,
      employeeDesignationId: designationId,
      employeeDesignationName: employeeDesignation.employeeDesignationName,
      employeeDepartmentId: departmentId,
      employeeDepartmentName: employeeDepartment.employeeDepartmentName,
    };
  }

  private async assertUniqueIds(data: any, facultyId?: number) {
    const aadharNo = str(data.aadharNo);
    const panNo = str(data.panNo);

    if (aadharNo) {
      const existing = await this.facultyDb.findFirst({
        where: {
          aadharNo,
          IsDeleted: false,
          ...(facultyId ? { NOT: { facultyId } } : {}),
        },
      });
      if (existing) throw new ConflictException('Aadhar number already exists');
    }

    if (panNo) {
      const existing = await this.facultyDb.findFirst({
        where: {
          panNo,
          IsDeleted: false,
          ...(facultyId ? { NOT: { facultyId } } : {}),
        },
      });
      if (existing) throw new ConflictException('PAN number already exists');
    }
  }

  private async resolveAddress(data: any) {
    let stateId = parseOptionalInt(data.stateId);
    let cityId = parseOptionalInt(data.cityId);
    let zipcodeId = parseOptionalInt(data.zipcodeId);
    let state = str(data.state);
    let city = str(data.city);
    let pincode = str(data.pincode);

    if (stateId) {
      const row = await (this.prisma as any).stateMaster.findFirst({
        where: { stateId, IsDeleted: false },
      });
      if (!row) stateId = null;
      else if (!state) state = row.stateName;
    }

    if (cityId) {
      const row = await (this.prisma as any).cityMaster.findFirst({
        where: { cityId, IsDeleted: false },
      });
      if (!row || (stateId && row.stateId !== stateId)) cityId = null;
      else if (!city) city = row.cityName;
    }

    if (zipcodeId) {
      const row = await (this.prisma as any).zipcodeMaster.findFirst({
        where: { zipcodeId, IsDeleted: false },
      });
      const stateMismatch = Boolean(stateId && row && row.stateId !== stateId);
      const cityMismatch = Boolean(cityId && row && row.cityId !== cityId);
      if (!row || stateMismatch || cityMismatch) zipcodeId = null;
      else if (!pincode) pincode = row.zipCode;
    }

    return {
      stateId,
      state,
      cityId,
      city,
      zipcodeId,
      pincode,
      district: str(data.district),
    };
  }

  private educationFields(row: any) {
    return {
      qualification: str(row.qualification),
      degreeName: str(row.degreeName),
      specializationSubject: str(row.specializationSubject),
      university: str(row.university),
      collegeInstitute: str(row.collegeInstitute),
      passingYear: parseYear(row.passingYear),
      certificateUrl: str(row.certificateUrl),
      certificateName: str(row.certificateName),
      Remarks: str(row.Remarks),
    };
  }

  private educationHasContent(row: any) {
    const fields = this.educationFields(row);
    return Object.values(fields).some((value) => value !== null);
  }

  private experienceFields(row: any) {
    return {
      schoolName: str(row.schoolName),
      ctc: parseSalary(row.ctc),
      startYear: parseDate(row.startYear),
      endYear: parseDate(row.endYear),
      experienceLetterUrl: str(row.experienceLetterUrl),
      experienceLetterName: str(row.experienceLetterName),
      Remarks: str(row.Remarks),
    };
  }

  private experienceHasContent(row: any) {
    const fields = this.experienceFields(row);
    return Object.values(fields).some((value) => value !== null);
  }

  private async syncEducations(facultyId: number, rows: any[] | undefined, actor: string) {
    if (!Array.isArray(rows)) return;
    const cleaned = rows.filter((row) => this.educationHasContent(row));
    const existing = await this.educationDb.findMany({
      where: { facultyId, IsDeleted: false },
    });
    const keepIds = new Set<number>();
    const saved: any[] = [];

    for (const row of cleaned) {
      const id = Number(row.facultyEducationId);
      const current = existing.find((item: any) => item.facultyEducationId === id);
      if (current) {
        const updated = await this.educationDb.update({
          where: { facultyEducationId: id },
          data: { ...this.educationFields(row), UpdatedBy: actor },
        });
        keepIds.add(id);
        saved.push(updated);
      } else {
        const created = await this.educationDb.create({
          data: {
            facultyId,
            ...this.educationFields(row),
            CreatedBy: actor,
            IsActive: true,
            IsDeleted: false,
          },
        });
        keepIds.add(created.facultyEducationId);
        saved.push(created);
      }
    }

    const dropIds = existing
      .map((item: any) => item.facultyEducationId)
      .filter((id: number) => !keepIds.has(id));
    if (dropIds.length) {
      await this.educationDb.updateMany({
        where: { facultyEducationId: { in: dropIds } },
        data: {
          IsDeleted: true,
          IsActive: false,
          DeletedOn: new Date(),
          DeletedBy: actor,
          DeletedRemarks: 'Removed from faculty form',
        },
      });
    }

    return saved;
  }

  private async syncExperiences(facultyId: number, rows: any[] | undefined, actor: string) {
    if (!Array.isArray(rows)) return;
    const cleaned = rows.filter((row) => this.experienceHasContent(row));
    const existing = await this.experienceDb.findMany({
      where: { facultyId, IsDeleted: false },
    });
    const keepIds = new Set<number>();
    const saved: any[] = [];

    for (const row of cleaned) {
      const id = Number(row.facultyExperienceId);
      const current = existing.find((item: any) => item.facultyExperienceId === id);
      if (current) {
        const updated = await this.experienceDb.update({
          where: { facultyExperienceId: id },
          data: { ...this.experienceFields(row), UpdatedBy: actor },
        });
        keepIds.add(id);
        saved.push(updated);
      } else {
        const created = await this.experienceDb.create({
          data: {
            facultyId,
            ...this.experienceFields(row),
            CreatedBy: actor,
            IsActive: true,
            IsDeleted: false,
          },
        });
        keepIds.add(created.facultyExperienceId);
        saved.push(created);
      }
    }

    const dropIds = existing
      .map((item: any) => item.facultyExperienceId)
      .filter((id: number) => !keepIds.has(id));
    if (dropIds.length) {
      await this.experienceDb.updateMany({
        where: { facultyExperienceId: { in: dropIds } },
        data: {
          IsDeleted: true,
          IsActive: false,
          DeletedOn: new Date(),
          DeletedBy: actor,
          DeletedRemarks: 'Removed from faculty form',
        },
      });
    }

    return saved;
  }

  private researchFields(row: any) {
    return {
      scholarId: str(row?.scholarId),
      vidwanId: str(row?.vidwanId),
      orcid: str(row?.orcid),
      scopusId: str(row?.scopusId),
      researcherId: str(row?.researcherId),
      researchArea: str(row?.researchArea),
      researchGateId: str(row?.researchGateId),
      researchAcademicProfile: str(row?.researchAcademicProfile),
    };
  }

  private async syncResearch(facultyId: number, row: any, actor: string) {
    if (row === undefined) return;
    const fields = this.researchFields(row);
    const hasContent = Object.values(fields).some((value) => value !== null);
    const existing = await this.researchDb.findFirst({ where: { facultyId } });

    if (!hasContent) {
      if (existing && !existing.IsDeleted) {
        await this.researchDb.update({
          where: { facultyResearchId: existing.facultyResearchId },
          data: {
            ...fields,
            IsDeleted: true,
            IsActive: false,
            DeletedOn: new Date(),
            DeletedBy: actor,
            DeletedRemarks: 'Removed from faculty form',
          },
        });
      }
      return null;
    }

    if (existing) {
      return this.researchDb.update({
        where: { facultyResearchId: existing.facultyResearchId },
        data: {
          ...fields,
          UpdatedBy: actor,
          IsActive: true,
          IsDeleted: false,
          DeletedOn: null,
          DeletedBy: null,
          DeletedRemarks: null,
        },
      });
    }

    return this.researchDb.create({
      data: {
        facultyId,
        ...fields,
        CreatedBy: actor,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  private facultyDataFrom(data: any, masters: any) {
    return {
      ...masters,
      employeeName: data.employeeName.trim(),
      fatherOrHusbandName: str(data.fatherOrHusbandName),
      gender: str(data.gender),
      dateOfBirth: parseDate(data.dateOfBirth),
      aadharNo: str(data.aadharNo),
      panNo: str(data.panNo),
      maritalStatus: str(data.maritalStatus),
      religion: str(data.religion),
      category: str(data.category),
      bloodGroup: str(data.bloodGroup),
      mobileNo: str(data.mobileNo),
      alternateMobileNo: str(data.alternateMobileNo),
      personalEmail: str(data.personalEmail),
      officialEmail: str(data.officialEmail),
      address: str(data.address),
      district: str(data.district),
      dateOfJoining: parseDate(data.dateOfJoining),
      dateOfConfirmation: parseDate(data.dateOfConfirmation),
      bankName: str(data.bankName),
      ifscCode: str(data.ifscCode),
      accountNumber: str(data.accountNumber),
      branch: str(data.branch),
      payScale: str(data.payScale),
      basicSalary: parseSalary(data.basicSalary),
      pfApplicable: data.pfApplicable === true || data.pfApplicable === 'true',
      Remarks: str(data.Remarks),
    };
  }

  async create(data: any) {
    const masters = await this.resolveMasterNames(data);
    await this.assertUniqueIds(data);

    const created = await this.facultyDb.create({
      data: {
        employeeId: await this.generateEmployeeId(),
        ...this.facultyDataFrom(data, masters),
        ...(await this.resolveAddress(data)),
        CreatedBy: data.CreatedBy,
        IsActive: true,
        IsDeleted: false,
      },
    });

    const educations = await this.syncEducations(created.facultyId, data.educations, data.CreatedBy);
    const experiences = await this.syncExperiences(created.facultyId, data.experiences, data.CreatedBy);
    await this.syncResearch(created.facultyId, data.research, data.CreatedBy);
    const row = await this.findOne(created.facultyId);
    return { ...row, educations: educations ?? row.educations, experiences: experiences ?? row.experiences };
  }

  async findAll(activeOnly = false) {
    const rows = await this.facultyDb.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      include: this.facultyInclude,
      orderBy: { employeeName: 'asc' },
    });
    return rows.map((row: any) => this.presentFaculty(row));
  }

  async findOne(facultyId: number) {
    const row = await this.facultyDb.findFirst({
      where: { facultyId, IsDeleted: false },
      include: this.facultyInclude,
    });
    if (!row) {
      throw new NotFoundException(`Faculty with ID ${facultyId} not found`);
    }
    return this.presentFaculty(row);
  }

  async update(facultyId: number, data: any) {
    await this.findOne(facultyId);
    await this.assertUniqueIds(data, facultyId);

    const hasMasterChange =
      data.employeTypeId !== undefined ||
      data.employeeCategoryId !== undefined ||
      data.employeeDesignationId !== undefined ||
      data.employeeDepartmentId !== undefined;

    let masters: any = {};
    if (hasMasterChange) {
      const current = await this.facultyDb.findFirst({ where: { facultyId } });
      masters = await this.resolveMasterNames({
        employeTypeId: data.employeTypeId ?? current.employeTypeId,
        employeeCategoryId: data.employeeCategoryId ?? current.employeeCategoryId,
        employeeDesignationId: data.employeeDesignationId ?? current.employeeDesignationId,
        employeeDepartmentId: data.employeeDepartmentId ?? current.employeeDepartmentId,
      });
    }

    const next: any = {
      ...masters,
      UpdatedBy: data.UpdatedBy,
    };

    if (data.employeeName !== undefined) next.employeeName = data.employeeName.trim();
    if (data.fatherOrHusbandName !== undefined) next.fatherOrHusbandName = str(data.fatherOrHusbandName);
    if (data.gender !== undefined) next.gender = str(data.gender);
    if (data.dateOfBirth !== undefined) next.dateOfBirth = parseDate(data.dateOfBirth);
    if (data.aadharNo !== undefined) next.aadharNo = str(data.aadharNo);
    if (data.panNo !== undefined) next.panNo = str(data.panNo);
    if (data.maritalStatus !== undefined) next.maritalStatus = str(data.maritalStatus);
    if (data.religion !== undefined) next.religion = str(data.religion);
    if (data.category !== undefined) next.category = str(data.category);
    if (data.bloodGroup !== undefined) next.bloodGroup = str(data.bloodGroup);
    if (data.mobileNo !== undefined) next.mobileNo = str(data.mobileNo);
    if (data.alternateMobileNo !== undefined) next.alternateMobileNo = str(data.alternateMobileNo);
    if (data.personalEmail !== undefined) next.personalEmail = str(data.personalEmail);
    if (data.officialEmail !== undefined) next.officialEmail = str(data.officialEmail);
    if (data.address !== undefined) next.address = str(data.address);
    if (
      data.district !== undefined ||
      data.state !== undefined ||
      data.stateId !== undefined ||
      data.city !== undefined ||
      data.cityId !== undefined ||
      data.zipcodeId !== undefined ||
      data.pincode !== undefined
    ) {
      const current = await this.facultyDb.findFirst({ where: { facultyId } });
      Object.assign(
        next,
        await this.resolveAddress({
          district: data.district !== undefined ? data.district : current.district,
          state: data.state !== undefined ? data.state : current.state,
          stateId: data.stateId !== undefined ? data.stateId : current.stateId,
          city: data.city !== undefined ? data.city : current.city,
          cityId: data.cityId !== undefined ? data.cityId : current.cityId,
          zipcodeId: data.zipcodeId !== undefined ? data.zipcodeId : current.zipcodeId,
          pincode: data.pincode !== undefined ? data.pincode : current.pincode,
        }),
      );
    }
    if (data.dateOfJoining !== undefined) next.dateOfJoining = parseDate(data.dateOfJoining);
    if (data.dateOfConfirmation !== undefined) next.dateOfConfirmation = parseDate(data.dateOfConfirmation);
    if (data.bankName !== undefined) next.bankName = str(data.bankName);
    if (data.ifscCode !== undefined) next.ifscCode = str(data.ifscCode);
    if (data.accountNumber !== undefined) next.accountNumber = str(data.accountNumber);
    if (data.branch !== undefined) next.branch = str(data.branch);
    if (data.payScale !== undefined) next.payScale = str(data.payScale);
    if (data.basicSalary !== undefined) next.basicSalary = parseSalary(data.basicSalary);
    if (data.pfApplicable !== undefined) next.pfApplicable = data.pfApplicable === true || data.pfApplicable === 'true';
    if (data.IsActive !== undefined) next.IsActive = data.IsActive;
    if (data.Remarks !== undefined) next.Remarks = str(data.Remarks);

    await this.facultyDb.update({
      where: { facultyId },
      data: next,
    });

    const educations = await this.syncEducations(facultyId, data.educations, data.UpdatedBy);
    const experiences = await this.syncExperiences(facultyId, data.experiences, data.UpdatedBy);
    await this.syncResearch(facultyId, data.research, data.UpdatedBy);
    const row = await this.findOne(facultyId);
    return { ...row, educations: educations ?? row.educations, experiences: experiences ?? row.experiences };
  }

  async updateStatus(facultyId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(facultyId);
    const row = await this.facultyDb.update({
      where: { facultyId },
      data: { IsActive, UpdatedBy },
      include: this.facultyInclude,
    });
    return this.presentFaculty(row);
  }

  async softDelete(facultyId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(facultyId);
    const stamp = {
      IsDeleted: true,
      IsActive: false,
      DeletedOn: new Date(),
      DeletedBy,
      DeletedRemarks: DeletedRemarks || null,
    };

    await this.documentDb.updateMany({
      where: { facultyId, IsDeleted: false },
      data: stamp,
    });
    await this.educationDb.updateMany({
      where: { facultyId, IsDeleted: false },
      data: stamp,
    });
    await this.experienceDb.updateMany({
      where: { facultyId, IsDeleted: false },
      data: stamp,
    });
    await this.researchDb.updateMany({
      where: { facultyId, IsDeleted: false },
      data: stamp,
    });

    return this.facultyDb.update({
      where: { facultyId },
      data: stamp,
    });
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const stamp = {
      IsDeleted: true,
      IsActive: false,
      DeletedOn: new Date(),
      DeletedBy,
      DeletedRemarks: DeletedRemarks || null,
    };

    await this.documentDb.updateMany({
      where: { facultyId: { in: ids }, IsDeleted: false },
      data: stamp,
    });
    await this.educationDb.updateMany({
      where: { facultyId: { in: ids }, IsDeleted: false },
      data: stamp,
    });
    await this.experienceDb.updateMany({
      where: { facultyId: { in: ids }, IsDeleted: false },
      data: stamp,
    });
    await this.researchDb.updateMany({
      where: { facultyId: { in: ids }, IsDeleted: false },
      data: stamp,
    });

    const result = await this.facultyDb.updateMany({
      where: { facultyId: { in: ids }, IsDeleted: false },
      data: stamp,
    });

    return {
      message: `Successfully soft-deleted ${result.count} faculty record(s)`,
      count: result.count,
    };
  }

  private normalizeDocumentType(documentType: string) {
    const type = String(documentType || '').trim().toUpperCase();
    if (!ALLOWED_DOC_TYPES.includes(type)) {
      throw new BadRequestException(
        `Invalid documentType. Allowed: ${ALLOWED_DOC_TYPES.join(', ')}`,
      );
    }
    return type;
  }

  async findDocuments(facultyId: number) {
    await this.findOne(facultyId);
    return this.documentDb.findMany({
      where: { facultyId, IsDeleted: false },
      orderBy: { CreatedOn: 'desc' },
    });
  }

  async createDocument(data: any) {
    const facultyId = Number(data.facultyId);
    await this.findOne(facultyId);
    const documentType = this.normalizeDocumentType(data.documentType);

    if (SINGLE_DOC_TYPES.includes(documentType)) {
      await this.documentDb.updateMany({
        where: { facultyId, documentType, IsDeleted: false },
        data: {
          IsDeleted: true,
          IsActive: false,
          DeletedOn: new Date(),
          DeletedBy: data.CreatedBy,
          DeletedRemarks: `Replaced by new ${documentType}`,
        },
      });
    }

    return this.documentDb.create({
      data: {
        facultyId,
        documentType,
        fileUrl: data.fileUrl,
        fileName: str(data.fileName),
        CreatedBy: data.CreatedBy,
        Remarks: str(data.Remarks),
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async softDeleteDocument(facultyDocumentId: number, DeletedBy: string, DeletedRemarks?: string) {
    const row = await this.documentDb.findFirst({
      where: { facultyDocumentId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Faculty document with ID ${facultyDocumentId} not found`);
    }

    return this.documentDb.update({
      where: { facultyDocumentId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  async uploadEducationCertificate(
    facultyId: number,
    facultyEducationId: number,
    fileUrl: string,
    fileName: string | null,
    UpdatedBy: string,
  ) {
    await this.findOne(facultyId);
    const row = await this.educationDb.findFirst({
      where: { facultyEducationId, facultyId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Faculty education with ID ${facultyEducationId} not found`);
    }
    return this.educationDb.update({
      where: { facultyEducationId },
      data: {
        certificateUrl: fileUrl,
        certificateName: str(fileName),
        UpdatedBy,
      },
    });
  }

  async uploadExperienceLetter(
    facultyId: number,
    facultyExperienceId: number,
    fileUrl: string,
    fileName: string | null,
    UpdatedBy: string,
  ) {
    await this.findOne(facultyId);
    const row = await this.experienceDb.findFirst({
      where: { facultyExperienceId, facultyId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Faculty experience with ID ${facultyExperienceId} not found`);
    }
    return this.experienceDb.update({
      where: { facultyExperienceId },
      data: {
        experienceLetterUrl: fileUrl,
        experienceLetterName: str(fileName),
        UpdatedBy,
      },
    });
  }
}
