export declare class User {
  constructor(
    userId: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    country: string,
    isVerified: boolean,
    createdAt: Date,
    updatedAt: Date,
    lastLoginAt?: Date | null,
  );

  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  country: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
}
