export interface User {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    avatar?: string;
    phone?: string;
    isActive: boolean;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR"
}
export declare function createUser(data: {
    id?: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    avatar?: string;
    phone?: string;
    isActive?: boolean;
    role?: UserRole;
}): User;
