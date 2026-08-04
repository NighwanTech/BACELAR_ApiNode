import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { PasswordService } from './password.service';
import { TokenService } from './token.service';
import { RedisService } from '../redis/redis.service';
import { ErrorCodes, JwtPayload } from '@universityos/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { generateId } from '@universityos/common';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly passwords: PasswordService,
    private readonly tokens: TokenService,
    private readonly redis: RedisService,
  ) {}

  async validateUser(tenantId: string, email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { tenantId_email: { tenantId, email } },
      include: {
        roles: {
          include: {
            role: {
              include: { rolePermissions: { include: { permission: true } } },
            },
          },
        },
      },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException({
        code: ErrorCodes.INVALID_CREDENTIALS,
        message: 'Invalid credentials',
      });
    }

    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException({
        code: ErrorCodes.ACCOUNT_SUSPENDED,
        message: `Account is ${user.status.toLowerCase()}`,
      });
    }

    const valid = await this.passwords.compare(password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException({
        code: ErrorCodes.INVALID_CREDENTIALS,
        message: 'Invalid credentials',
      });
    }

    const roles = user.roles.map((ur) => ur.role.slug);
    const permissions = user.roles.flatMap((ur) =>
      ur.role.rolePermissions.map((rp) => rp.permission.slug),
    );

    return { user, roles, permissions };
  }

  async login(dto: LoginDto, ipAddress?: string, userAgent?: string) {
    const tenant = await this.resolveTenant(dto.tenantId, dto.tenantCode);
    const { user, roles, permissions } = await this.validateUser(
      tenant.id,
      dto.email,
      dto.password,
    );

    const sessionId = generateId();
    const jti = crypto.randomUUID();
    const payload: JwtPayload = {
      sub: user.id,
      tenantId: tenant.id,
      email: user.email,
      type: user.type,
      sessionId,
      jti,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.tokens.generateAccessToken(payload),
      this.tokens.generateRefreshToken({ ...payload, sub: user.id }),
    ]);

    // Store session
    await this.prisma.session.create({
      data: {
        tenantId: tenant.id,
        userId: user.id,
        tokenId: jti,
        refreshTokenId: `rt-${jti}`,
        userAgent,
        ipAddress,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // Store refresh token hash
    const refreshHash = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');
    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshHash,
        sessionId,
        userAgent,
        ipAddress,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date(), lastLoginIp: ipAddress },
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 900,
      tokenType: 'Bearer',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
        roles,
        permissions,
      },
    };
  }

  async register(dto: RegisterDto, tenantId: string) {
    const existing = await this.prisma.user.findUnique({
      where: { tenantId_email: { tenantId, email: dto.email } },
    });
    if (existing) {
      const err: any = new Error('Email already registered');
      err.code = ErrorCodes.EMAIL_ALREADY_EXISTS;
      err.status = 409;
      throw err;
    }

    const passwordHash = await this.passwords.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        tenantId,
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        middleName: dto.middleName,
        phone: dto.phone,
        passwordHash,
        type: (dto.type as any) || 'STAFF',
      },
    });

    // Assign default role
    const defaultRole = await this.prisma.role.findFirst({
      where: { tenantId, slug: dto.type?.toLowerCase() === 'student' ? 'student' : 'staff' },
    });
    if (defaultRole) {
      await this.prisma.userRole.create({
        data: { userId: user.id, roleId: defaultRole.id },
      });
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async refresh(dto: RefreshTokenDto) {
    const payload = await this.tokens.verifyRefreshToken(dto.refreshToken);
    const refreshHash = crypto
      .createHash('sha256')
      .update(dto.refreshToken)
      .digest('hex');

    const stored = await this.prisma.refreshToken.findUnique({
      where: { tokenHash: refreshHash },
    });

    if (!stored || stored.revokedAt) {
      throw new UnauthorizedException({
        code: ErrorCodes.REFRESH_TOKEN_INVALID,
        message: 'Refresh token is invalid or revoked',
      });
    }

    if (new Date(stored.expiresAt) < new Date()) {
      throw new UnauthorizedException({
        code: ErrorCodes.TOKEN_EXPIRED,
        message: 'Refresh token has expired',
      });
    }

    const newJti = crypto.randomUUID();
    const newPayload: JwtPayload = {
      sub: payload.sub,
      tenantId: payload.tenantId,
      email: payload.email,
      type: payload.type,
      sessionId: payload.sessionId,
      jti: newJti,
    };

    const accessToken = await this.tokens.generateAccessToken(newPayload);
    const refreshToken = await this.tokens.generateRefreshToken(newPayload);

    // Rotate token
    const newHash = crypto
      .createHash('sha256')
      .update(refreshToken)
      .digest('hex');
    await this.prisma.refreshToken.update({
      where: { id: stored.id },
      data: { revokedAt: new Date(), replacedBy: newHash },
    });
    await this.prisma.refreshToken.create({
      data: {
        userId: payload.sub,
        tokenHash: newHash,
        sessionId: payload.sessionId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 900,
      tokenType: 'Bearer',
    };
  }

  async logout(userId: string, sessionId?: string) {
    if (sessionId) {
      await this.tokens.revokeToken(sessionId);
      await this.prisma.refreshToken.updateMany({
        where: { sessionId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      await this.prisma.session.updateMany({
        where: { userId, tokenId: sessionId, status: 'ACTIVE' },
        data: { status: 'REVOKED', revokedAt: new Date() },
      });
    }
    return { success: true };
  }

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: { include: { role: true } },
        addresses: true,
      },
    });
  }

  private async resolveTenant(tenantId?: string, tenantCode?: string) {
    let tenant;
    if (tenantId) {
      tenant = await this.prisma.tenant.findFirst({
        where: { id: tenantId, deletedAt: null },
      });
    } else if (tenantCode) {
      tenant = await this.prisma.tenant.findUnique({
        where: { code: tenantCode },
      });
    }
    if (!tenant || tenant.status !== 'ACTIVE') {
      throw new UnauthorizedException({
        code: ErrorCodes.TENANT_NOT_FOUND,
        message: 'Tenant not found or inactive',
      });
    }
    return tenant;
  }
}
