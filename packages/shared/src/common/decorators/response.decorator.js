"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = exports.STATUS_CODES = exports.RESPONSE_MESSAGE = void 0;
const common_1 = require("@nestjs/common");
exports.RESPONSE_MESSAGE = 'response_message';
exports.STATUS_CODES = 'status_code';
const ApiResponse = (message, status) => {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(exports.RESPONSE_MESSAGE, message), (0, common_1.SetMetadata)(exports.STATUS_CODES, status ?? 200));
};
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=response.decorator.js.map