"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = retry;
async function retry(fn, retries = 3, delayMs = 300) {
    try {
        return await fn();
    }
    catch (error) {
        if (retries <= 0)
            throw error;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        return retry(fn, retries - 1, delayMs);
    }
}
//# sourceMappingURL=retry.helper.js.map