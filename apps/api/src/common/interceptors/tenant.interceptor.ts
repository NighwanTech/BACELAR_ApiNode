import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TENANT_HEADER, TENANT_CODE_HEADER } from '@universityos/common';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const tenantId = req.headers?.[TENANT_HEADER];
    const tenantCode = req.headers?.[TENANT_CODE_HEADER];
    if (tenantId || tenantCode) {
      req.tenantContext = { id: tenantId, code: tenantCode };
    }
    return next.handle();
  }
}
