import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { TimeoutInterceptor } from '@/shared/interceptor';

/**
 * Timeout decorator để set timeout cho specific endpoint
 * @param timeoutMs - Timeout in milliseconds (default: 5000ms)
 */
export function Timeout(timeoutMs: number = 5000) {
  return applyDecorators(
    UseInterceptors(new TimeoutInterceptor(timeoutMs))
  );
}