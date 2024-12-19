export interface UserDTO {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
}
export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  isVerified: boolean;
  lastLoginAt: Date;
  activationLink?: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
}
