import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

const adminInclude = {
  role: true,
};

@Injectable()
export class AdminLoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private adminDb() {
    return (this.prisma as any).adminLoginMaster;
  }

  private sanitizeAdmin<T extends Record<string, any>>(row: T) {
    const { Password, OTP, ...rest } = row as T & { Password?: string; OTP?: string | null };
    return {
      ...rest,
      loginPasswordPlain: (row as any).PlainPassword ?? null,
    };
  }

  private async hashPassword(plain: string) {
    return bcrypt.hash(plain, 10);
  }

  async create(data: any) {
    const role = await (this.prisma as any).roleMaster.findFirst({
      where: { roleId: Number(data.RoleId), IsDeleted: false, IsActive: true },
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${data.RoleId} not found`);
    }

    const hashed = await this.hashPassword(data.Password);

    const created = await this.adminDb().create({
      data: {
        LoginName: data.LoginName.trim(),
        EmailId: data.EmailId.trim().toLowerCase(),
        Mobile: data.Mobile?.trim() || null,
        Password: hashed,
        PlainPassword: data.Password,
        RoleId: Number(data.RoleId),
        ClientId: data.ClientId != null ? Number(data.ClientId) : null,
        ProfilePhoto: data.ProfilePhoto || null,
        CreatedBy: data.CreatedBy,
        Remarks: data.Remarks || null,
        IsActive: true,
        IsDeleted: false,
      },
      include: adminInclude,
    });

    return this.sanitizeAdmin(created);
  }

  async login(login: string, passwordString: string, meta?: { IpAddress?: string; MACAddress?: string }) {
    const key = String(login || '').trim();
    const row = await this.adminDb().findFirst({
      where: {
        IsDeleted: false,
        OR: [
          { EmailId: key.toLowerCase() },
          { LoginName: key },
        ],
      },
      include: adminInclude,
    });

    if (!row || !row.IsActive || !row.role?.IsActive || row.role?.IsDeleted) {
      throw new UnauthorizedException('Invalid credentials or account is disabled');
    }

    const valid = await bcrypt.compare(passwordString, row.Password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials or account is disabled');
    }

    await this.adminDb().update({
      where: { LoginId: row.LoginId },
      data: {
        LastLogin: new Date(),
        IpAddress: meta?.IpAddress || row.IpAddress,
        MACAddress: meta?.MACAddress || row.MACAddress,
        ModifyBy: 'System-Login',
      },
    });

    const token = this.jwtService.sign({
      sub: row.LoginId,
      loginId: row.LoginId,
      loginName: row.LoginName,
      emailId: row.EmailId,
      roleId: row.RoleId,
      roleCode: row.role?.roleCode,
      accountType: 'admin',
    });

    return {
      status: 'success',
      token,
      admin: this.sanitizeAdmin(row),
    };
  }

  async findAll() {
    const rows = await this.adminDb().findMany({
      where: { IsDeleted: false },
      include: adminInclude,
      orderBy: { CreatedOn: 'desc' },
    });
    return rows.map((r: any) => this.sanitizeAdmin(r));
  }

  async findOne(LoginId: number) {
    const row = await this.adminDb().findFirst({
      where: { LoginId, IsDeleted: false },
      include: adminInclude,
    });
    if (!row) {
      throw new NotFoundException(`Admin login with ID ${LoginId} not found`);
    }
    return this.sanitizeAdmin(row);
  }

  async update(LoginId: number, data: any) {
    await this.findOne(LoginId);

    const payload: any = {
      ModifyBy: data.ModifyBy,
    };

    if (data.LoginName !== undefined) payload.LoginName = data.LoginName.trim();
    if (data.EmailId !== undefined) payload.EmailId = data.EmailId.trim().toLowerCase();
    if (data.Mobile !== undefined) payload.Mobile = data.Mobile?.trim() || null;
    if (data.RoleId !== undefined) payload.RoleId = Number(data.RoleId);
    if (data.ClientId !== undefined) payload.ClientId = data.ClientId != null ? Number(data.ClientId) : null;
    if (data.ProfilePhoto !== undefined) payload.ProfilePhoto = data.ProfilePhoto || null;
    if (data.IsActive !== undefined) payload.IsActive = data.IsActive;
    if (data.Remarks !== undefined) payload.Remarks = data.Remarks;

    if (data.Password !== undefined && String(data.Password).trim()) {
      const plain = String(data.Password).trim();
      const existing = await this.adminDb().findUnique({ where: { LoginId } });
      payload.OldPassword = existing?.PlainPassword || existing?.Password || null;
      payload.Password = await this.hashPassword(plain);
      payload.PlainPassword = plain;
      payload.IsPasswordUpdated = true;
      payload.PasswordChangeOn = new Date();
    }

    const updated = await this.adminDb().update({
      where: { LoginId },
      data: payload,
      include: adminInclude,
    });

    return this.sanitizeAdmin(updated);
  }

  async updateStatus(LoginId: number, IsActive: boolean, ModifyBy: string) {
    await this.findOne(LoginId);
    const updated = await this.adminDb().update({
      where: { LoginId },
      data: { IsActive, ModifyBy },
      include: adminInclude,
    });
    return this.sanitizeAdmin(updated);
  }

  async changePassword(
    LoginId: number,
    currentPassword: string,
    newPassword: string,
    ModifyBy: string,
  ) {
    const row = await this.adminDb().findFirst({
      where: { LoginId, IsDeleted: false },
    });
    if (!row) {
      throw new NotFoundException(`Admin login with ID ${LoginId} not found`);
    }

    const valid = await bcrypt.compare(String(currentPassword || ''), row.Password);
    if (!valid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const plain = String(newPassword || '').trim();
    if (plain.length < 6) {
      throw new BadRequestException('New password must be at least 6 characters');
    }

    const updated = await this.adminDb().update({
      where: { LoginId },
      data: {
        OldPassword: row.PlainPassword || row.Password,
        Password: await this.hashPassword(plain),
        PlainPassword: plain,
        IsPasswordUpdated: true,
        PasswordChangeOn: new Date(),
        ModifyBy,
      },
      include: adminInclude,
    });

    return {
      status: 'success',
      message: 'Password changed successfully',
      admin: this.sanitizeAdmin(updated),
    };
  }

  async updateProfile(LoginId: number, data: { LoginName?: string; ProfilePhoto?: string; ModifyBy: string }) {
    await this.findOne(LoginId);

    const payload: any = {
      ModifyBy: data.ModifyBy,
    };

    if (data.LoginName !== undefined) {
      const name = String(data.LoginName || '').trim();
      if (!name) {
        throw new BadRequestException('LoginName cannot be empty');
      }
      payload.LoginName = name;
    }

    if (data.ProfilePhoto !== undefined) {
      payload.ProfilePhoto = data.ProfilePhoto || null;
    }

    const updated = await this.adminDb().update({
      where: { LoginId },
      data: payload,
      include: adminInclude,
    });

    return {
      status: 'success',
      message: 'Profile updated successfully',
      admin: this.sanitizeAdmin(updated),
    };
  }

  async softDelete(LoginId: number, DeletedBy: string, DeletedRemarks?: string) {
    await this.findOne(LoginId);
    const deleted = await this.adminDb().update({
      where: { LoginId },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
        ModifyBy: DeletedBy,
      },
    });
    return this.sanitizeAdmin(deleted);
  }

  async bulkSoftDelete(ids: number[], DeletedBy: string, DeletedRemarks?: string) {
    const result = await this.adminDb().updateMany({
      where: {
        LoginId: { in: ids },
        IsDeleted: false,
      },
      data: {
        IsDeleted: true,
        IsActive: false,
        DeletedOn: new Date(),
        DeletedBy,
        DeletedRemarks: DeletedRemarks || null,
        ModifyBy: DeletedBy,
      },
    });

    return {
      message: `Successfully soft-deleted ${result.count} admin login user(s)`,
      count: result.count,
    };
  }
}
