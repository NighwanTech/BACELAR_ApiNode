import { Injectable, BadRequestException, ConflictException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

const CREATE_EMPLOYEE_DEPARTMENT_TABLE = `
CREATE TABLE IF NOT EXISTS \`employeeDepartmentMaster\` (
    \`employeeDepartmentId\` INTEGER NOT NULL AUTO_INCREMENT,
    \`employeeDepartmentName\` VARCHAR(100) NOT NULL,
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
    UNIQUE INDEX \`employeeDepartmentMaster_employeeDepartmentName_key\`(\`employeeDepartmentName\`),
    PRIMARY KEY (\`employeeDepartmentId\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
`;

const CREATE_DEPARTMENT_PROGRAM_TABLE = `
CREATE TABLE IF NOT EXISTS \`employeeDepartmentProgram\` (
    \`employeeDepartmentProgramId\` INTEGER NOT NULL AUTO_INCREMENT,
    \`employeeDepartmentId\` INTEGER NOT NULL,
    \`programId\` INTEGER NOT NULL,
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
    UNIQUE INDEX \`employeeDepartmentProgram_department_program_key\`(\`employeeDepartmentId\`, \`programId\`),
    INDEX \`employeeDepartmentProgram_programId_idx\`(\`programId\`),
    PRIMARY KEY (\`employeeDepartmentProgramId\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
`;

/** Master CRUD for employeeDepartmentMaster */
@Injectable()
export class EmployeeDepartmentService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.$executeRawUnsafe(CREATE_EMPLOYEE_DEPARTMENT_TABLE);
    await this.prisma.$executeRawUnsafe(CREATE_DEPARTMENT_PROGRAM_TABLE);
  }

  private programIdsOf(data: any, required: boolean): number[] | undefined {
    if (data.programIds === undefined) {
      if (required) throw new BadRequestException('Select at least one program');
      return undefined;
    }
    const raw = (Array.isArray(data.programIds) ? data.programIds : []) as unknown[];
    const ids = [...new Set(raw.map((id) => Number(id)).filter((id) => Number.isInteger(id) && id > 0))];
    if (!ids.length) throw new BadRequestException('Select at least one program');
    return ids;
  }

  private async assertPrograms(ids: number[]) {
    const rows = await this.prisma.$queryRaw<Array<{ programId: number }>>`
      SELECT programId FROM programs WHERE IsDeleted = false AND programId IN (${Prisma.join(ids)})
    `;
    if (rows.length !== ids.length) throw new BadRequestException('One or more programs were not found');
  }

  private async syncPrograms(employeeDepartmentId: number, programIds: number[], actor: string) {
    await this.assertPrograms(programIds);
    for (const programId of programIds) {
      await this.prisma.$executeRaw`
        INSERT INTO employeeDepartmentProgram (employeeDepartmentId, programId, CreatedBy, IsActive, IsDeleted)
        VALUES (${employeeDepartmentId}, ${programId}, ${actor}, true, false)
        ON DUPLICATE KEY UPDATE
          IsDeleted = false,
          IsActive = true,
          UpdatedBy = ${actor},
          UpdatedOn = CURRENT_TIMESTAMP(3),
          DeletedOn = NULL,
          DeletedBy = NULL
      `;
    }
    await this.prisma.$executeRaw`
      UPDATE employeeDepartmentProgram
      SET IsDeleted = true, IsActive = false, DeletedOn = CURRENT_TIMESTAMP(3), DeletedBy = ${actor}
      WHERE employeeDepartmentId = ${employeeDepartmentId}
        AND IsDeleted = false
        AND programId NOT IN (${Prisma.join(programIds)})
    `;
  }

  private async withPrograms<T extends { employeeDepartmentId: number }>(rows: T[]) {
    if (!rows.length) return rows.map((row) => ({ ...row, programs: [] as { programId: number; programName: string }[] }));
    const links = await this.prisma.$queryRaw<
      Array<{ employeeDepartmentId: number; programId: number; programName: string }>
    >`
      SELECT l.employeeDepartmentId, l.programId, p.programName
      FROM employeeDepartmentProgram l
      INNER JOIN programs p ON p.programId = l.programId
      WHERE l.IsDeleted = false AND l.employeeDepartmentId IN (${Prisma.join(rows.map((row) => row.employeeDepartmentId))})
      ORDER BY p.programName ASC
    `;
    const grouped = new Map<number, { programId: number; programName: string }[]>();
    for (const link of links) {
      const departmentId = Number(link.employeeDepartmentId);
      const list = grouped.get(departmentId) || [];
      list.push({ programId: Number(link.programId), programName: link.programName });
      grouped.set(departmentId, list);
    }
    return rows.map((row) => ({ ...row, programs: grouped.get(row.employeeDepartmentId) || [] }));
  }

  private get employeeDepartmentDb() {
    const db = (this.prisma as any).employeeDepartmentMaster;
    if (!db) {
      throw new Error(
        'Prisma model employeeDepartmentMaster is missing. Restart API after prisma generate.',
      );
    }
    return db;
  }

  async create(data: any) {
    const existingName = await this.employeeDepartmentDb.findFirst({
      where: { employeeDepartmentName: data.employeeDepartmentName, IsDeleted: false },
    });
    if (existingName) {
      throw new ConflictException('Employee department name already exists');
    }

    const programIds = this.programIdsOf(data, true)!;
    const created = await this.employeeDepartmentDb.create({
      data: {
        employeeDepartmentName: data.employeeDepartmentName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
    await this.syncPrograms(created.employeeDepartmentId, programIds, data.CreatedBy);
    const [row] = await this.withPrograms([created]);
    return row;
  }

  async findAll(activeOnly = false) {
    const rows = await this.employeeDepartmentDb.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: { employeeDepartmentName: 'asc' },
    });
    return this.withPrograms(rows);
  }

  async findOne(employeeDepartmentId: number) {
    const row = await this.employeeDepartmentDb.findFirst({
      where: { employeeDepartmentId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Employee department with ID ${employeeDepartmentId} not found`);
    }
    const [withPrograms] = await this.withPrograms([row]);
    return withPrograms;
  }

  async update(employeeDepartmentId: number, data: any) {
    await this.findOne(employeeDepartmentId);

    if (data.employeeDepartmentName) {
      const existingName = await this.employeeDepartmentDb.findFirst({
        where: {
          employeeDepartmentName: data.employeeDepartmentName,
          IsDeleted: false,
          NOT: { employeeDepartmentId },
        },
      });
      if (existingName) {
        throw new ConflictException('Employee department name already exists');
      }
    }

    const programIds = this.programIdsOf(data, false);
    const updated = await this.employeeDepartmentDb.update({
      where: { employeeDepartmentId },
      data: {
        employeeDepartmentName: data.employeeDepartmentName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
    if (programIds) await this.syncPrograms(employeeDepartmentId, programIds, data.UpdatedBy || 'Admin');
    const [row] = await this.withPrograms([updated]);
    return row;
  }

  async updateStatus(employeeDepartmentId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(employeeDepartmentId);
    return this.employeeDepartmentDb.update({
      where: { employeeDepartmentId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(employeeDepartmentId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(employeeDepartmentId);

    const deleted = await this.employeeDepartmentDb.update({
      where: { employeeDepartmentId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy: DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
    await this.prisma.$executeRaw`
      UPDATE employeeDepartmentProgram
      SET IsDeleted = true, IsActive = false, DeletedOn = CURRENT_TIMESTAMP(3), DeletedBy = ${DeletedBy}
      WHERE employeeDepartmentId = ${employeeDepartmentId} AND IsDeleted = false
    `;
    return deleted;
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const result = await this.employeeDepartmentDb.updateMany({
      where: {
        employeeDepartmentId: { in: ids },
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

    if (ids.length) {
      await this.prisma.$executeRaw`
        UPDATE employeeDepartmentProgram
        SET IsDeleted = true, IsActive = false, DeletedOn = CURRENT_TIMESTAMP(3), DeletedBy = ${DeletedBy}
        WHERE IsDeleted = false AND employeeDepartmentId IN (${Prisma.join(ids)})
      `;
    }

    return {
      message: `Successfully soft-deleted ${result.count} employee department(s)`,
      count: result.count,
    };
  }
}
