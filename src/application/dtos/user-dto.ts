import { UserRole } from "../../domain/entities/enums/user-role";

export interface UserDTO {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  isVerified: boolean;
  lastLoginAt: string | null;
  activationLink?: string;
  role: UserRole;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
