import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FEATURE_KEY } from '../decorators/feature.decorator';
import { BusinessException } from '../exceptions/business.exception';
import { ErrorCodes } from '@universityos/common';

@Injectable()
export class FeatureFlagGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredFeature = this.reflector.getAllAndOverride<string>(FEATURE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredFeature) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const tenant = request.tenantContext;
    const features = tenant?.features || {};
    // Super admin bypass
    if (request.user?.type === 'SUPER_ADMIN') {
      return true;
    }
    if (features[requiredFeature] === false) {
      throw new BusinessException(
        ErrorCodes.FEATURE_DISABLED,
        `Feature '${requiredFeature}' is disabled for this tenant.`,
      );
    }
    return true;
  }
}
