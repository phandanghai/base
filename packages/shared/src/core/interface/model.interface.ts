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

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}

// Helper function to create User object
export function createUser(data: {
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
}): User {
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
