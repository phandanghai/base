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
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const decorators_1 = require("../../common/decorators");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
        this.logger = new common_1.Logger(JwtAuthGuard_1.name);
    }
    canActivate(context) {
        this.logger.log('=== JwtAuthGuard canActivate ===');
        const isPublic = this.reflector.getAllAndOverride(decorators_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        this.logger.log(`Route is public: ${isPublic}`);
        if (isPublic) {
            this.logger.log('✅ Public route - skipping authentication');
            return true;
        }
        this.logger.log('🔒 Protected route - checking authentication');
        return super.canActivate(context);
    }
    handleRequest(err, user, info, context, status) {
        this.logger.log('=== JwtAuthGuard handleRequest ===');
        this.logger.log('Error:', err);
        this.logger.log('User:', user);
        this.logger.log('Info:', info);
        this.logger.log('Status:', status);
        if (err || !user) {
            this.logger.error('❌ Authentication failed:', err || 'No user found');
            throw err ?? new common_1.UnauthorizedException('Invalid or expired token');
        }
        this.logger.log('✅ Authentication successful:', user);
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map