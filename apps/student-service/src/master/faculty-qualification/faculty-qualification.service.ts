import { Injectable, ConflictException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

const CREATE_FACULTY_QUALIFICATION_TABLE = `
CREATE TABLE IF NOT EXISTS \`facultyQualificationMaster\` (
    \`facultyQualificationId\` INTEGER NOT NULL AUTO_INCREMENT,
    \`qualificationName\` VARCHAR(100) NOT NULL,
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
    UNIQUE INDEX \`facultyQualificationMaster_qualificationName_key\`(\`qualificationName\`),
    PRIMARY KEY (\`facultyQualificationId\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
`;

/** Master CRUD for faculty qualification names. */
@Injectable()
export class FacultyQualificationService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.$executeRawUnsafe(CREATE_FACULTY_QUALIFICATION_TABLE);
  }

  private get facultyQualificationDb() {
    const db = (this.prisma as any).facultyQualificationMaster;
    if (!db) {
      throw new Error(
        'Prisma model facultyQualificationMaster is missing. Restart API after prisma generate.',
      );
    }
    return db;
  }

  async create(data: any) {
    const existingName = await this.facultyQualificationDb.findFirst({
      where: { qualificationName: data.qualificationName, IsDeleted: false },
    });
    if (existingName) {
      throw new ConflictException('Faculty Qualification name already exists');
    }

    return this.facultyQualificationDb.create({
      data: {
        qualificationName: data.qualificationName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.facultyQualificationDb.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: { qualificationName: 'asc' },
    });
  }

  async findOne(facultyQualificationId: number) {
    const row = await this.facultyQualificationDb.findFirst({
      where: { facultyQualificationId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Faculty Qualification with ID ${facultyQualificationId} not found`);
    }
    return row;
  }

  async update(facultyQualificationId: number, data: any) {
    await this.findOne(facultyQualificationId);

    if (data.qualificationName) {
      const existingName = await this.facultyQualificationDb.findFirst({
        where: {
          qualificationName: data.qualificationName,
          IsDeleted: false,
          NOT: { facultyQualificationId },
        },
      });
      if (existingName) {
        throw new ConflictException('Faculty Qualification name already exists');
      }
    }

    return this.facultyQualificationDb.update({
      where: { facultyQualificationId },
      data: {
        qualificationName: data.qualificationName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async updateStatus(facultyQualificationId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(facultyQualificationId);
    return this.facultyQualificationDb.update({
      where: { facultyQualificationId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(facultyQualificationId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(facultyQualificationId);

    return this.facultyQualificationDb.update({
      where: { facultyQualificationId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const result = await this.facultyQualificationDb.updateMany({
      where: {
        facultyQualificationId: { in: ids },
        IsDeleted: false,
      },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });

    return {
      message: `Successfully soft-deleted ${result.count} faculty qualification(s)`,
      count: result.count,
    };
  }
}
