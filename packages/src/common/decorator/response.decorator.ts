import { applyDecorators, SetMetadata } from '@nestjs/common';

export const RESPONSE_MESSAGE = 'response_message';

export const STATUS_CODES = 'status_code';

export const ApiResponse = (message: string, status: number) => {
  return applyDecorators(
    SetMetadata(RESPONSE_MESSAGE, message),
    SetMetadata(STATUS_CODES, status ?? 200),
  );
};
