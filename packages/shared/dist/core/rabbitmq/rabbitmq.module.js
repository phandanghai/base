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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const rabbitmq_service_1 = require("./rabbitmq.service");
const rabbitmq_token_1 = require("./rabbitmq.token");
const rabbitmq_provider_1 = require("./rabbitmq.provider");
let RabbitMQModule = class RabbitMQModule {
    constructor(userClient, authClient, redisClient, mailerClient) {
        this.userClient = userClient;
        this.authClient = authClient;
        this.redisClient = redisClient;
        this.mailerClient = mailerClient;
    }
    async onModuleDestroy() {
        await Promise.all([
            this.userClient.close(),
            this.authClient.close(),
            this.redisClient.close(),
            this.mailerClient.close(),
        ]);
    }
};
exports.RabbitMQModule = RabbitMQModule;
exports.RabbitMQModule = RabbitMQModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [...rabbitmq_provider_1.rmqProviders, rabbitmq_service_1.RabbitMQService],
        exports: [
            rabbitmq_service_1.RabbitMQService,
            rabbitmq_token_1.RMQ_SERVICE.USER,
            rabbitmq_token_1.RMQ_SERVICE.AUTH,
            rabbitmq_token_1.RMQ_SERVICE.REDIS,
            rabbitmq_token_1.RMQ_SERVICE.MAILER,
        ],
    }),
    __param(0, (0, common_1.Inject)(rabbitmq_token_1.RMQ_SERVICE.USER)),
    __param(1, (0, common_1.Inject)(rabbitmq_token_1.RMQ_SERVICE.AUTH)),
    __param(2, (0, common_1.Inject)(rabbitmq_token_1.RMQ_SERVICE.REDIS)),
    __param(3, (0, common_1.Inject)(rabbitmq_token_1.RMQ_SERVICE.MAILER)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], RabbitMQModule);
//# sourceMappingURL=rabbitmq.module.js.map