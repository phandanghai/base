"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqContext = void 0;
const common_1 = require("@nestjs/common");
exports.ReqContext = (0, common_1.createParamDecorator)((_, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return {
        ip: request.headers['x-forwarded-for']?.toString() ??
            request.socket.remoteAddress ??
            '',
        userAgent: request.headers['user-agent'],
        method: request.method,
        url: request.originalUrl,
        requestId: request.headers['x-request-id'],
        deviceId: request.headers['deviceid'],
    };
});
//# sourceMappingURL=reqInfo.decorator.js.map