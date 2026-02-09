"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RabbitMQService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const helper_1 = require("../../common/helper");
const rabbitmq_token_1 = require("./rabbitmq.token");
let RabbitMQService = RabbitMQService_1 = class RabbitMQService {
    constructor(userClient, authClient, redisClient, mailerClient) {
        this.userClient = userClient;
        this.authClient = authClient;
        this.redisClient = redisClient;
        this.mailerClient = mailerClient;
        this.logger = new common_1.Logger(RabbitMQService_1.name);
        this.breaker = new helper_1.CircuitBreaker(5, 60_000);
    }
    getClientByPattern(pattern) {
        const prefix = pattern.split('.')[0];
        const clientMap = {
            USER: this.userClient,
            AUTH: this.authClient,
            REDIS: this.redisClient,
            MAILER: this.mailerClient,
        };
        const client = Object.entries(clientMap).find(([key]) => key === prefix)?.[1];
        if (!client) {
            this.logger.warn(`Unknown service prefix: ${prefix}, defaulting to USER service`);
            return this.userClient;
        }
        return client;
    }
    async send(pattern, payload) {
        return this.breaker.exec(async () => {
            const client = this.getClientByPattern(pattern);
            this.logger.debug(`📤 RMQ send → ${pattern}`);
            const response$ = client.send(pattern, payload);
            const result = await (0, rxjs_1.firstValueFrom)(response$);
            this.logger.debug(`📥 RMQ response ← ${pattern}`);
            return result;
        });
    }
    emit(pattern, payload) {
        const client = this.getClientByPattern(pattern);
        this.logger.debug(`🔥 RMQ emit → ${pattern}`);
        client.emit(pattern, payload);
    }
};
exports.RabbitMQService = RabbitMQService;
exports.RabbitMQService = RabbitMQService = RabbitMQService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(rabbitmq_token_1.RMQ_SERVICE.USER)),
    __param(1, (0, common_1.Inject)(rabbitmq_token_1.RMQ_SERVICE.AUTH)),
    __param(2, (0, common_1.Inject)(rabbitmq_token_1.RMQ_SERVICE.REDIS)),
    __param(3, (0, common_1.Inject)(rabbitmq_token_1.RMQ_SERVICE.MAILER)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], RabbitMQService);
//# sourceMappingURL=rabbitmq.service.js.map