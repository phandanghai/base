export declare function retry<T>(fn: () => Promise<T>, retries?: number, delayMs?: number): Promise<T>;
