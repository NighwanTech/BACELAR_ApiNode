import { Injectable, ConflictException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

const CREATE_EMPLOYE_TYPE_TABLE = `
CREATE TABLE IF NOT EXISTS \`employeTypeMaster\` (
    \`employeTypeId\` INTEGER NOT NULL AUTO_INCREMENT,
    \`employeTypeName\` VARCHAR(100) NOT NULL,
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
    UNIQUE INDEX \`employeTypeMaster_employeTypeName_key\`(\`employeTypeName\`),
    PRIMARY KEY (\`employeTypeId\`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
`;

/** Master CRUD for employeTypeMaster */
@Injectable()
export class EmployeTypeService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.prisma.$executeRawUnsafe(CREATE_EMPLOYE_TYPE_TABLE);
  }

  private get employeTypeDb() {
    const db = (this.prisma as any).employeTypeMaster;
    if (!db) {
      throw new Error(
        'Prisma model employeTypeMaster is missing. Restart API after prisma generate.',
      );
    }
    return db;
  }

  async create(data: any) {
    const existingName = await this.employeTypeDb.findFirst({
      where: { employeTypeName: data.employeTypeName, IsDeleted: false },
    });
    if (existingName) {
      throw new ConflictException('Employee type name already exists');
    }

    return this.employeTypeDb.create({
      data: {
        employeTypeName: data.employeTypeName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.employeTypeDb.findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: { employeTypeName: 'asc' },
    });
  }

  async findOne(employeTypeId: number) {
    const row = await this.employeTypeDb.findFirst({
      where: { employeTypeId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Employee type with ID ${employeTypeId} not found`);
    }
    return row;
  }

  async update(employeTypeId: number, data: any) {
    await this.findOne(employeTypeId);

    if (data.employeTypeName) {
      const existingName = await this.employeTypeDb.findFirst({
        where: {
          employeTypeName: data.employeTypeName,
          IsDeleted: false,
          NOT: { employeTypeId },
        },
      });
      if (existingName) {
        throw new ConflictException('Employee type name already exists');
      }
    }

    return this.employeTypeDb.update({
      where: { employeTypeId },
      data: {
        employeTypeName: data.employeTypeName,
        UpdatedBy: data.UpdatedBy,
        IsActive: data.IsActive,
        Remarks: data.Remarks,
      },
    });
  }

  async updateStatus(employeTypeId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(employeTypeId);
    return this.employeTypeDb.update({
      where: { employeTypeId },
      data: {
        IsActive,
        UpdatedBy,
      },
    });
  }

  async softDelete(employeTypeId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(employeTypeId);

    return this.employeTypeDb.update({
      where: { employeTypeId },
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
    const result = await this.employeTypeDb.updateMany({
      where: {
        employeTypeId: { in: ids },
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
      message: `Successfully soft-deleted ${result.count} employee type(s)`,
      count: result.count,
    };
  }
}
