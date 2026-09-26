import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { ErrorLogService } from './error-log.service';

@Catch()
export class ErrorLogFilter extends BaseExceptionFilter implements ExceptionFilter {
  constructor(
    httpAdapterHost: HttpAdapterHost,
    private readonly errorLog: ErrorLogService,
  ) {
    super(httpAdapterHost.httpAdapter);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    if (host.getType() === 'http') {
      const status = statusOf(exception);
      if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        const request = host.switchToHttp().getRequest();
        void this.errorLog.record(buildEntry(exception, request, status)).catch((error) => {
          console.error('ErrorLog save failed', error instanceof Error ? error.message : error);
        });
      }
    }
    super.catch(exception, host);
  }
}

function statusOf(exception: unknown) {
  if (exception instanceof HttpException) return exception.getStatus();
  if (exception && typeof exception === 'object') {
    const raw = (exception as { statusCode?: unknown; status?: unknown }).statusCode ?? (exception as { status?: unknown }).status;
    const code = Number(raw);
    if (Number.isInteger(code) && code >= 400 && code < 600) return code;
  }
  return HttpStatus.INTERNAL_SERVER_ERROR;
}

function buildEntry(exception: unknown, request: any, status: number) {
  const described = describe(exception);
  return {
    source: sourceOf(request),
    description: described.message,
    stack: described.stack,
    apiUrl: pathOnly(request?.originalUrl || request?.url),
    httpMethod: textHeader(request?.method),
    statusCode: status,
    userId: userIdOf(request),
    loginBy: loginByOf(request),
    ipAddress: ipOf(request),
  };
}

function describe(exception: unknown) {
  if (exception instanceof HttpException) {
    const body = exception.getResponse();
    const message = typeof body === 'string' ? body : (body as { message?: unknown }).message;
    const text = Array.isArray(message) ? message.join('; ') : String(message || exception.message || 'Internal server error');
    return { message: text, stack: exception.stack ?? null };
  }
  if (exception instanceof Error) {
    return { message: exception.message || 'Internal server error', stack: exception.stack ?? null };
  }
  if (exception && typeof exception === 'object' && 'message' in exception) {
    return { message: String((exception as { message?: unknown }).message || 'Internal server error'), stack: null };
  }
  return { message: 'Internal server error', stack: null };
}

function sourceOf(request: any): 'Admin' | 'Website' {
  const header = textHeader(request?.headers?.['x-source'] || request?.headers?.['x-client']).toLowerCase();
  if (header === 'website') return 'Website';
  if (header === 'admin') return 'Admin';
  const path = String(request?.originalUrl || request?.url || '');
  if (path.includes('/website/') || path.includes('/public/')) return 'Website';
  return 'Admin';
}

function userIdOf(request: any) {
  const raw = textHeader(request?.headers?.['x-user-id']);
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function loginByOf(request: any) {
  const raw = textHeader(request?.headers?.['x-login-by']);
  if (!raw) return null;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function ipOf(request: any) {
  const forwarded = textHeader(request?.headers?.['x-forwarded-for']).split(',')[0];
  return forwarded || textHeader(request?.ip) || textHeader(request?.socket?.remoteAddress) || null;
}

function pathOnly(url: unknown) {
  const text = String(url || '').split('?')[0].trim();
  return text || null;
}

function textHeader(value: unknown) {
  if (Array.isArray(value)) return String(value[0] || '').trim();
  return String(value || '').trim();
}
