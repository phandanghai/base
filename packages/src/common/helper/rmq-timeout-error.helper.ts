// rmq-timeout.error.ts
export class RmqTimeoutError extends Error {
  constructor(
    public readonly pattern: string,
    public readonly timeoutMs: number,
    public readonly sentAt: number,
  ) {
    super(`RMQ timeout: ${pattern} after ${timeoutMs}ms`);
    this.name = 'RmqTimeoutError';
  }
}
