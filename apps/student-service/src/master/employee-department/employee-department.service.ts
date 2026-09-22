import { Injectable, ConflictException, NotFoundException, OnModuleInit } from '@nestjs/common';
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

/** Master CRUD for employeeDepartmentMaster */
@Injectable()
export class EmployeeDepartmentService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.$executeRawUnsafe(CREATE_EMPLOYEE_DEPARTMENT_TABLE);
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

    return this.employeeDepartmentDb.create({
      data: {
        employeeDepartmentName: data.employeeDepartmentName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.employeeDepartmentDb.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: { employeeDepartmentName: 'asc' },
    });
  }

  async findOne(employeeDepartmentId: number) {
    const row = await this.employeeDepartmentDb.findFirst({
      where: { employeeDepartmentId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Employee department with ID ${employeeDepartmentId} not found`);
    }
    return row;
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

    return this.employeeDepartmentDb.update({
      where: { employeeDepartmentId },
      data: {
        employeeDepartmentName: data.employeeDepartmentName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
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

    return this.employeeDepartmentDb.update({
      where: { employeeDepartmentId },
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

    return {
      message: `Successfully soft-deleted ${result.count} employee department(s)`,
      count: result.count,
    };
  }
}
