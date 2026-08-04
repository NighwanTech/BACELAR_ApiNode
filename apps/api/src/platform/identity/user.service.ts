import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { PasswordService } from '../../core/auth/password.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BusinessException } from '../../common/exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwords: PasswordService,
  ) {}

  async create(tenantId: string, dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { tenantId_email: { tenantId, email: dto.email } },
    });
    if (existing) {
      throw new BusinessException(
        ErrorCodes.EMAIL_ALREADY_EXISTS,
        'Email already exists in this tenant',
        409,
      );
    }

    const passwordHash = dto.password
      ? await this.passwords.hash(dto.password)
      : undefined;

    const user = await this.prisma.user.create({
      data: {
        tenantId,
        email: dto.email,
        phone: dto.phone,
        firstName: dto.firstName,
        lastName: dto.lastName,
        middleName: dto.middleName,
        gender: dto.gender,
        dateOfBirth: dto.dateOfBirth,
        passwordHash,
        type: (dto.type as any) || 'STAFF',
        status: (dto.status as any) || 'ACTIVE',
      },
    });

    if (dto.roleIds?.length) {
      await this.assignRoles(user.id, dto.roleIds);
    }

    return this.prisma.user.findUnique({
      where: { id: user.id },
      include: { roles: { include: { role: true } } },
    });
  }

  async findAll(tenantId: string, query: any) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const where: any = { tenantId, deletedAt: null };
    if (query.search) {
      where.OR = [
        { firstName: { contains: query.search, mode: 'insensitive' } },
        { lastName: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
      ];
    }
    if (query.status) where.status = query.status;
    if (query.type) where.type = query.type;

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { roles: { include: { role: true } } },
      }),
      this.prisma.user.count({ where }),
    ]);
    return { items, total, page, limit, totalPages: Math.ceil(total / limit) || 0 };
  }

  async findById(tenantId: string, id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: {
        roles: { include: { role: true } },
        addresses: true,
        emergencyContacts: true,
        devices: true,
      },
    });
    if (!user) {
      throw new BusinessException(ErrorCodes.RESOURCE_NOT_FOUND, 'User not found', 404);
    }
    return user;
  }

  async update(tenantId: string, id: string, dto: UpdateUserDto) {
    await this.findById(tenantId, id);
    const data: any = { ...dto };
    if (dto.password) {
      data.passwordHash = await this.passwords.hash(dto.password);
      delete data.password;
    }
    await this.prisma.user.update({ where: { id }, data });
    return this.findById(tenantId, id);
  }

  async assignRoles(userId: string, roleIds: string[]) {
    const existing = await this.prisma.userRole.findMany({
      where: { userId },
      select: { roleId: true },
    });
    const existingIds = existing.map((e) => e.roleId);
    const toAdd = roleIds.filter((r) => !existingIds.includes(r));
    if (toAdd.length) {
      await this.prisma.userRole.createMany({
        data: toAdd.map((roleId) => ({ userId, roleId })),
      });
    }
    return { added: toAdd.length };
  }

  async removeRole(userId: string, roleId: string) {
    await this.prisma.userRole.deleteMany({ where: { userId, roleId } });
    return { success: true };
  }

  async remove(tenantId: string, id: string) {
    await this.findById(tenantId, id);
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'DELETED' },
    });
    return { success: true };
  }
}
