"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const logger = new common_1.Logger('GetUser');
    const request = ctx.switchToHttp().getRequest();
    logger.log('=== GetUser Decorator Debug ===');
    logger.log('Request headers:', JSON.stringify(request.headers, null, 2));
    logger.log('Request user:', request.user);
    logger.log('User type:', typeof request.user);
    if (!request.user) {
        logger.error('❌ request.user is undefined - authentication failed');
        throw new Error('User not authenticated');
    }
    logger.log('✅ User found:', request.user);
    return request.user;
});
//# sourceMappingURL=user.decorator.js.map