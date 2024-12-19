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
    public lastLoginAt: Date,
  ) {}
}
