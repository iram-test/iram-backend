export interface UserDTO {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  country: string;
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
  country: string;
}

export interface UpdateUserDTO {
  userId: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  country?: string;
}
