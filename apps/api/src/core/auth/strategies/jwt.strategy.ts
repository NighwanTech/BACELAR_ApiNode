import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@universityos/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET'),
      issuer: config.get<string>('JWT_ISSUER', 'universityos'),
      audience: config.get<string>('JWT_AUDIENCE', 'universityos-clients'),
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload.sub || !payload.tenantId) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return {
      id: payload.sub,
      tenantId: payload.tenantId,
      email: payload.email,
      type: payload.type,
      sessionId: payload.sessionId,
      jti: payload.jti,
    };
  }
}
