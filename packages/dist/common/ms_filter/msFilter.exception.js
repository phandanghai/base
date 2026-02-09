"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MsExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const zod_1 = require("zod");
const rxjs_1 = require("rxjs");
const rabbitmq_token_1 = require("../../infra/rabbitmq/rabbitmq.token");
let MsExceptionFilter = MsExceptionFilter_1 = class MsExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(MsExceptionFilter_1.name);
    }
    hasRpcErrorPayload(exception) {
        return (typeof exception === 'object' &&
            exception !== null &&
            'error' in exception &&
            typeof exception.error === 'object' &&
            exception.error !== null);
    }
    catch(exception, host) {
        let pattern = 'unknown-pattern';
        this.logger.error('ms exception : ', exception);
        try {
            const ctx = host.switchToRpc();
            const context = ctx.getContext();
            if (context &&
                typeof context === 'object' &&
                'getPattern' in context &&
                typeof context.getPattern === 'function') {
                const getPatternFn = context.getPattern;
                const patternResult = getPatternFn();
                pattern =
                    typeof patternResult === 'string'
                        ? patternResult
                        : JSON.stringify(patternResult);
            }
        }
        catch (error) {
            (0, rxjs_1.throwError)(() => error);
        }
        if (exception instanceof microservices_1.RpcException) {
            return (0, rxjs_1.throwError)(() => exception);
        }
        if (exception instanceof zod_1.ZodError) {
            this.logger.error('zod exception :', exception);
            return (0, rxjs_1.throwError)(() => new microservices_1.RpcException({
                statusCode: 400,
                message: exception.issues,
                errorType: 'ZOD_VALIDATION',
                stack: exception.stack,
                source: rabbitmq_token_1.RMQ_SERVICE.AUTH,
            }));
        }
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            const response = exception.getResponse();
            this.logger.error(`🚨 HTTP Exception on pattern with status: ${status}`);
            return (0, rxjs_1.throwError)(() => {
                let message;
                let details = undefined;
                if (typeof response === 'string') {
                    message = response;
                }
                else if (response && typeof response === 'object') {
                    if ('message' in response && typeof response.message === 'string') {
                        message = response.message;
                    }
                    else {
                        message = exception.message;
                    }
                    if ('errors' in response ||
                        'details' in response ||
                        'exceptionType' in response) {
                        details = response;
                    }
                }
                else {
                    message = exception.message;
                }
                const rpcExceptionPayload = {
                    statusCode: status,
                    message,
                    stack: exception.stack,
                    errorType: 'HTTP_EXCEPTION',
                    source: rabbitmq_token_1.RMQ_SERVICE.AUTH,
                };
                if (details && typeof details === 'object') {
                    Object.assign(rpcExceptionPayload, { details });
                }
                return new microservices_1.RpcException(rpcExceptionPayload);
            });
        }
        if (exception instanceof Error) {
            this.logger.error(`💥 General Error on pattern ${pattern}`);
            return (0, rxjs_1.throwError)(() => new microservices_1.RpcException({
                statusCode: 500,
                stack: exception.stack,
                message: exception.message,
                errorType: 'INTERNAL_ERROR',
                source: rabbitmq_token_1.RMQ_SERVICE.AUTH,
            }));
        }
        if (this.hasRpcErrorPayload(exception)) {
            const { error } = exception;
            return (0, rxjs_1.throwError)(() => new microservices_1.RpcException({
                statusCode: error.statusCode ?? 500,
                message: error.message ?? 'Unknown error',
                errorType: error.type ?? 'UNKNOWN',
                source: error.source ?? rabbitmq_token_1.RMQ_SERVICE.USER,
                stack: exception instanceof Error ? exception.stack : undefined,
            }));
        }
        this.logger.error(`❓ Unknown exception on pattern ${pattern}`, exception);
        return (0, rxjs_1.throwError)(() => new microservices_1.RpcException({
            statusCode: 500,
            message: 'Unknown microservice error',
            errorType: 'UNKNOWN',
            source: rabbitmq_token_1.RMQ_SERVICE.AUTH,
            stack: exception instanceof Error ? exception.stack : undefined,
        }));
    }
};
exports.MsExceptionFilter = MsExceptionFilter;
exports.MsExceptionFilter = MsExceptionFilter = MsExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], MsExceptionFilter);
//# sourceMappingURL=msFilter.exception.js.map