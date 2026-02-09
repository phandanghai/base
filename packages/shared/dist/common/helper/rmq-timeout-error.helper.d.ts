export declare class RmqTimeoutError extends Error {
    readonly pattern: string;
    readonly timeoutMs: number;
    readonly sentAt: number;
    constructor(pattern: string, timeoutMs: number, sentAt: number);
}
