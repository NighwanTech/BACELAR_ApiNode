import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { isActiveOnly } from '../../common/active-only';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  private roleDb() {
    return (this.prisma as any).roleMaster;
  }

  async create(data: any) {
    return this.roleDb().create({
      data: {
        roleCode: String(data.roleCode).trim().toUpperCase(),
        roleName: data.roleName,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
    });
  }

  async findAll(activeOnly = false) {
    return this.roleDb().findMany({
      where: { IsDeleted: false, ...(isActiveOnly(activeOnly) ? { IsActive: true } : {}) },
      orderBy: [{ roleCode: 'asc' }],
    });
  }

  async findOne(roleId: number) {
    const role = await this.roleDb().findFirst({
      where: { roleId, IsDeleted: false },
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }
    return role;
  }

  async update(roleId: number, data: any) {
    await this.findOne(roleId);

    const payload: any = {
      UpdatedBy: data.UpdatedBy,
    };
    if (data.roleCode !== undefined) payload.roleCode = String(data.roleCode).trim().toUpperCase();
    if (data.roleName !== undefined) payload.roleName = data.roleName;
    if (data.IsActive !== undefined) payload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) payload.Remarks = data.Remarks;

    return this.roleDb().update({
      where: { roleId },
      data: payload,
    });
  }

  async updateStatus(roleId: number, IsActive: boolean, UpdatedBy: string) {
    await this.findOne(roleId);
    return this.roleDb().update({
      where: { roleId },
      data: { IsActive, UpdatedBy },
    });
  }

  async softDelete(roleId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(roleId);
    return this.roleDb().update({
      where: { roleId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const result = await this.roleDb().updateMany({
      where: {
        roleId: { in: ids },
        IsDeleted: false,
      },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
      },
    });

    return {
      message: `Successfully soft-deleted ${result.count} role(s)`,
      count: result.count,
    };
  }
}
