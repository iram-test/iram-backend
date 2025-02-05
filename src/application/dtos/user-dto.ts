import { UserRole } from "../../domain/entities/enums/user-role";

export interface UserDTO {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isVerified: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  lastLoginAt: string | null; // ISO string
  role: UserRole;
}

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  isVerified: boolean;
  lastLoginAt?: string | null; // ISO string
  role: UserRole;
  refreshToken?: string | null;
}

export interface UpdateUserDTO {
  userId: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
