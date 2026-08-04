export interface AuthUser {
  id: string;
  tenantId: string;
  email: string;
  firstName: string;
  lastName: string;
  type: string;
  roles: string[];
  permissions: string[];
  sessionId?: string;
  deviceId?: string;
}

export interface JwtPayload {
  sub: string;
  tenantId: string;
  email: string;
  type: string;
  sessionId?: string;
  jti?: string;
  iat?: number;
  exp?: number;
}
