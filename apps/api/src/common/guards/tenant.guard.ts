import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { BusinessException } from '../exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const tenant = request.tenantContext;
    if (!tenant?.id && !tenant?.code) {
      throw new BusinessException(
        ErrorCodes.TENANT_NOT_FOUND,
        'Tenant context is required. Provide x-tenant-id or x-tenant-code header.',
      );
    }
    return true;
  }
}
