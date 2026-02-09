"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreaker = void 0;
class CircuitBreaker {
    constructor(failureThreshold = 5000, resetTimeout = 2000) {
        this.failureThreshold = failureThreshold;
        this.resetTimeout = resetTimeout;
        this.failureCount = 0;
        this.open = false;
    }
    async exec(fn) {
        if (this.open) {
            throw new Error('RabbitMQ circuit breaker is OPEN');
        }
        try {
            const result = await fn();
            this.failureCount = 0;
            return result;
        }
        catch (err) {
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
exports.CircuitBreaker = CircuitBreaker;
//# sourceMappingURL=circuit_breaker.helper.js.map