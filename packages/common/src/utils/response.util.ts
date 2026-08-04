import { ApiSuccessResponse, ApiMeta } from '../interfaces/api-response.interface';
import { PaginatedResult } from '../interfaces/pagination.interface';

export function success<T>(
  data: T,
  message = 'Success',
  meta?: ApiMeta,
): ApiSuccessResponse<T> {
  return {
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  };
}

export function paginated<T>(
  result: PaginatedResult<T>,
  message = 'Success',
): ApiSuccessResponse<T[]> {
  return success(result.items, message, {
    page: result.page,
    limit: result.limit,
    total: result.total,
    totalPages: result.totalPages,
  });
}

export function buildPagination(
  total: number,
  page: number,
  limit: number,
): { totalPages: number; skip: number } {
  const totalPages = Math.ceil(total / limit) || 0;
  const skip = (page - 1) * limit;
  return { totalPages, skip };
}
