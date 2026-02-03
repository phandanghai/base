export class CircuitBreaker {
  private failureCount = 0;
  private open = false;

  constructor(
    private readonly failureThreshold = 5000,
    private readonly resetTimeout = 2000,
  ) {}

  async exec<T>(fn: () => Promise<T>): Promise<T> {
    if (this.open) {
      throw new Error('RabbitMQ circuit breaker is OPEN');
    }

    try {
      const result = await fn();
      this.failureCount = 0;
      return result;
    } catch (err) {
      this.failureCount++;

      if (this.failureCount >= this.failureThreshold) {
        this.open = true;
        setTimeout(() => {
          this.open = false;
          this.failureCount = 0;
        }, this.resetTimeout);
      }

      throw err;
    }
  }
}
