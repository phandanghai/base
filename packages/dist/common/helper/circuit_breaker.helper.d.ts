export declare class CircuitBreaker {
    private readonly failureThreshold;
    private readonly resetTimeout;
    private failureCount;
    private open;
    constructor(failureThreshold?: number, resetTimeout?: number);
    exec<T>(fn: () => Promise<T>): Promise<T>;
}
