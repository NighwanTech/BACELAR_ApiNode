import { Injectable, ConflictException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

const CREATE_EMPLOYEE_DESIGNATION_TABLE = `
CREATE TABLE IF NOT EXISTS \`employeeDesignationMaster\` (
    \`employeeDesignationId\` INTEGER NOT NULL AUTO_INCREMENT,
    \`employeeDesignationName\` VARCHAR(100) NOT NULL,
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
    UNIQUE INDEX \`employeeDesignationMaster_employeeDesignationName_key\`(\`employeeDesignationName\`),
    PRIMARY KEY (\`employeeDesignationId\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
`;

/** Master CRUD for employeeDesignationMaster */
@Injectable()
export class EmployeeDesignationService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.$executeRawUnsafe(CREATE_EMPLOYEE_DESIGNATION_TABLE);
  }

  private get employeeDesignationDb() {
    const db = (this.prisma as any).employeeDesignationMaster;
    if (!db) {
      throw new Error(
        'Prisma model employeeDesignationMaster is missing. Restart API after prisma generate.',
      );
    }
    return db;
  }

  async create(data: any) {
    const existingName = await this.employeeDesignationDb.findFirst({
      where: { employeeDesignationName: data.employeeDesignationName, IsDeleted: false },
    });
    if (existingName) {
      throw new ConflictException('Employee designation name already exists');
    }

    return this.employeeDesignationDb.create({
      data: {
        employeeDesignationName: data.employeeDesignationName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.employeeDesignationDb.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: { employeeDesignationName: 'asc' },
    });
  }

  async findOne(employeeDesignationId: number) {
    const row = await this.employeeDesignationDb.findFirst({
      where: { employeeDesignationId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Employee designation with ID ${employeeDesignationId} not found`);
    }
    return row;
  }

  async update(employeeDesignationId: number, data: any) {
    await this.findOne(employeeDesignationId);

    if (data.employeeDesignationName) {
      const existingName = await this.employeeDesignationDb.findFirst({
        where: {
          employeeDesignationName: data.employeeDesignationName,
          IsDeleted: false,
          NOT: { employeeDesignationId },
        },
      });
      if (existingName) {
        throw new ConflictException('Employee designation name already exists');
      }
    }

    return this.employeeDesignationDb.update({
      where: { employeeDesignationId },
      data: {
        employeeDesignationName: data.employeeDesignationName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async updateStatus(employeeDesignationId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(employeeDesignationId);
    return this.employeeDesignationDb.update({
      where: { employeeDesignationId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(employeeDesignationId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(employeeDesignationId);

    return this.employeeDesignationDb.update({
      where: { employeeDesignationId },
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
    const result = await this.employeeDesignationDb.updateMany({
      where: {
        employeeDesignationId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} employee designation(s)`,
      count: result.count,
    };
  }
}
