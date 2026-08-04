import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '@universityos/common';

export class BusinessException extends HttpException {
  constructor(
    code: ErrorCode | string,
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    details?: unknown,
  ) {
    super(
      {
        code,
        message,
        ...(details ? { details } : {}),
      },
      status,
    );
  }
}
