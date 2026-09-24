import { Injectable, ConflictException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

const CREATE_FACULTY_QUALIFICATION_TABLE = `
CREATE TABLE IF NOT EXISTS \`facultySpecializationMaster\` (
    \`facultySpecializationId\` INTEGER NOT NULL AUTO_INCREMENT,
    \`specializationName\` VARCHAR(100) NOT NULL,
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
    UNIQUE INDEX \`facultySpecializationMaster_specializationName_key\`(\`specializationName\`),
    PRIMARY KEY (\`facultySpecializationId\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
`;

/** Master CRUD for faculty specialization names. */
@Injectable()
export class FacultySpecializationService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.$executeRawUnsafe(CREATE_FACULTY_QUALIFICATION_TABLE);
  }

  private get facultySpecializationDb() {
    const db = (this.prisma as any).facultySpecializationMaster;
    if (!db) {
      throw new Error(
        'Prisma model facultySpecializationMaster is missing. Restart API after prisma generate.',
      );
    }
    return db;
  }

  async create(data: any) {
    const existingName = await this.facultySpecializationDb.findFirst({
      where: { specializationName: data.specializationName, IsDeleted: false },
    });
    if (existingName) {
      throw new ConflictException('Faculty Specialization name already exists');
    }

    return this.facultySpecializationDb.create({
      data: {
        specializationName: data.specializationName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.facultySpecializationDb.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: { specializationName: 'asc' },
    });
  }

  async findOne(facultySpecializationId: number) {
    const row = await this.facultySpecializationDb.findFirst({
      where: { facultySpecializationId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Faculty Specialization with ID ${facultySpecializationId} not found`);
    }
    return row;
  }

  async update(facultySpecializationId: number, data: any) {
    await this.findOne(facultySpecializationId);

    if (data.specializationName) {
      const existingName = await this.facultySpecializationDb.findFirst({
        where: {
          specializationName: data.specializationName,
          IsDeleted: false,
          NOT: { facultySpecializationId },
        },
      });
      if (existingName) {
        throw new ConflictException('Faculty Specialization name already exists');
      }
    }

    return this.facultySpecializationDb.update({
      where: { facultySpecializationId },
      data: {
        specializationName: data.specializationName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async updateStatus(facultySpecializationId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(facultySpecializationId);
    return this.facultySpecializationDb.update({
      where: { facultySpecializationId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(facultySpecializationId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(facultySpecializationId);

    return this.facultySpecializationDb.update({
      where: { facultySpecializationId },
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
    const result = await this.facultySpecializationDb.updateMany({
      where: {
        facultySpecializationId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} faculty specialization(s)`,
      count: result.count,
    };
  }
}
