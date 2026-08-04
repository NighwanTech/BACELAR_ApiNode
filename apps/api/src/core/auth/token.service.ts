import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@universityos/common';
import { RedisService } from '../redis/redis.service';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly redis: RedisService,
  ) {}

  async generateAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(payload: JwtPayload): Promise<string> {
    const refreshSecret = this.config.get<string>('JWT_REFRESH_SECRET');
    const expiresIn = this.config.get<string>('JWT_REFRESH_EXPIRES_IN', '7d');
    return this.jwtService.signAsync(payload, {
      secret: refreshSecret,
      expiresIn,
    });
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token);
    } catch {
      throw new UnauthorizedException({
        code: ErrorCodes.INVALID_TOKEN,
        message: 'Invalid or expired access token',
      });
    }
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    const refreshSecret = this.config.get<string>('JWT_REFRESH_SECRET');
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: refreshSecret,
      });
    } catch {
      throw new UnauthorizedException({
        code: ErrorCodes.REFRESH_TOKEN_INVALID,
        message: 'Invalid or expired refresh token',
      });
    }
  }

  async revokeToken(sessionId: string): Promise<void> {
    await this.redis.set(`revoked:${sessionId}`, true, 86400);
  }

  async isRevoked(sessionId: string): Promise<boolean> {
    return this.redis.exists(`revoked:${sessionId}`);
  }
}
