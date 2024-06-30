import { HttpSuccessResponse } from '@Common/types';
import { HttpStatus } from '@nestjs/common';

export function successResponse<T>(
  data: T,
  message?: string,
  statusCode?: number,
): HttpSuccessResponse<T> {
  return {
    statusCode: statusCode ?? HttpStatus.OK,
    data: data,
    message: message ?? 'success',
  };
}
