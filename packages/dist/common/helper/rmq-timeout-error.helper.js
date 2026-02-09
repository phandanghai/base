"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RmqTimeoutError = void 0;
class RmqTimeoutError extends Error {
    constructor(pattern, timeoutMs, sentAt) {
        super(`RMQ timeout: ${pattern} after ${timeoutMs}ms`);
        this.pattern = pattern;
        this.timeoutMs = timeoutMs;
        this.sentAt = sentAt;
        this.name = 'RmqTimeoutError';
    }
}
exports.RmqTimeoutError = RmqTimeoutError;
//# sourceMappingURL=rmq-timeout-error.helper.js.map