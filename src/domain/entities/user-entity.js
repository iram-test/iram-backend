export class User {
  constructor(
    userId,
    firstName,
    lastName,
    username,
    email,
    password,
    country,
    isVerified,
    createdAt,
    updatedAt,
    lastLoginAt = null,
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.country = country;
    this.isVerified = isVerified;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.lastLoginAt = lastLoginAt;
  }
}
