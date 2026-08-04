import { ApiErrorResponse } from '../interfaces/api-response.interface';
import { ErrorCode } from '../constants/error-codes.constant';

export function error(
  code: ErrorCode | string,
  message: string,
  details?: unknown,
): ApiErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  };
}
