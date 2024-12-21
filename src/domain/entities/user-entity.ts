import { UserPermission } from "./enums/user-permission";
import { UserRole } from "./enums/user-role";

export class User {
  constructor(
    public userId: string,
    public firstName: string,
    public lastName: string,
    public username: string,
    public email: string,
    public password: string,
    public isVerified: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public lastLoginAt: Date | null,
    public refreshToken: string | null,
    public role: UserRole,
    public permissions: UserPermission[],
  ) {}
}
