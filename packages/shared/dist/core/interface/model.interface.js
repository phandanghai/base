"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
exports.createUser = createUser;
var UserRole;
(function (UserRole) {
    UserRole["USER"] = "USER";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["MODERATOR"] = "MODERATOR";
})(UserRole || (exports.UserRole = UserRole = {}));
function createUser(data) {
    return {
        id: data.id ?? 'mock-user-id-' + Date.now(),
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        avatar: data.avatar,
        phone: data.phone,
        isActive: data.isActive ?? true,
        role: data.role ?? UserRole.USER,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}
//# sourceMappingURL=model.interface.js.map