export interface RmqSendOptions {
    retries?: number;
    retryDelay?: number;
    timeout?: number;
}
export interface RmqPayload<T> {
    pattern: string;
    data: T;
}
