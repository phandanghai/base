"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timeout = Timeout;
const common_1 = require("@nestjs/common");
const interceptor_1 = require("../interceptor");
function Timeout(timeoutMs = 5000) {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)(new interceptor_1.TimeoutInterceptor(timeoutMs)));
}
//# sourceMappingURL=timeout.decorator.js.map