import { Injectable, ConflictException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

const CREATE_EMPLOYEE_CATEGORY_TABLE = `
CREATE TABLE IF NOT EXISTS \`employeeCategoryMaster\` (
    \`employeeCategoryId\` INTEGER NOT NULL AUTO_INCREMENT,
    \`employeeCategoryName\` VARCHAR(100) NOT NULL,
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
    UNIQUE INDEX \`employeeCategoryMaster_employeeCategoryName_key\`(\`employeeCategoryName\`),
    PRIMARY KEY (\`employeeCategoryId\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
`;

/** Master CRUD for employeeCategoryMaster */
@Injectable()
export class EmployeeCategoryService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.$executeRawUnsafe(CREATE_EMPLOYEE_CATEGORY_TABLE);
  }

  private get employeeCategoryDb() {
    const db = (this.prisma as any).employeeCategoryMaster;
    if (!db) {
      throw new Error(
        'Prisma model employeeCategoryMaster is missing. Restart API after prisma generate.',
      );
    }
    return db;
  }

  async create(data: any) {
    const existingName = await this.employeeCategoryDb.findFirst({
      where: { employeeCategoryName: data.employeeCategoryName, IsDeleted: false },
    });
    if (existingName) {
      throw new ConflictException('Employee category name already exists');
    }

    return this.employeeCategoryDb.create({
      data: {
        employeeCategoryName: data.employeeCategoryName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.employeeCategoryDb.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: { employeeCategoryName: 'asc' },
    });
  }

  async findOne(employeeCategoryId: number) {
    const row = await this.employeeCategoryDb.findFirst({
      where: { employeeCategoryId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Employee category with ID ${employeeCategoryId} not found`);
    }
    return row;
  }

  async update(employeeCategoryId: number, data: any) {
    await this.findOne(employeeCategoryId);

    if (data.employeeCategoryName) {
      const existingName = await this.employeeCategoryDb.findFirst({
        where: {
          employeeCategoryName: data.employeeCategoryName,
          IsDeleted: false,
          NOT: { employeeCategoryId },
        },
      });
      if (existingName) {
        throw new ConflictException('Employee category name already exists');
      }
    }

    return this.employeeCategoryDb.update({
      where: { employeeCategoryId },
      data: {
        employeeCategoryName: data.employeeCategoryName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async updateStatus(employeeCategoryId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(employeeCategoryId);
    return this.employeeCategoryDb.update({
      where: { employeeCategoryId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(employeeCategoryId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(employeeCategoryId);

    return this.employeeCategoryDb.update({
      where: { employeeCategoryId },
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
    const result = await this.employeeCategoryDb.updateMany({
      where: {
        employeeCategoryId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} employee category(s)`,
      count: result.count,
    };
  }
}
