"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeRpcException = void 0;
const microservices_1 = require("@nestjs/microservices");
const normalizeRpcException = (exception) => {
    if (exception && exception instanceof microservices_1.RpcException) {
        const error = exception.getError();
        if (error && typeof error === 'object') {
            const errorObj = error;
            return {
                ...errorObj,
                message: exception.message ?? (typeof errorObj.message === 'string' ? errorObj.message : 'Unknown error'),
            };
        }
    }
    return null;
};
exports.normalizeRpcException = normalizeRpcException;
//# sourceMappingURL=normalize_rpc_exception.helper.js.map