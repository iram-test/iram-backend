import { User } from "../../../domain/entities/user-entity";
import { UserEntity } from "../entities/user-entity";
import { UserRepository } from "../../../domain/repositories/user-repository";
import {
  CreateUserDTO,
  UpdateUserDTO,
} from "../../../application/dtos/user-dto";
import { PostgresDataSource } from "../../../tools/db-connection";
import { hashPassword } from "../../../tools/password-utils";
import { config } from "../../../configs";
import { UserRole } from "../../../domain/entities/enums/user-role";
import { UserPermission } from "../../../domain/entities/enums/user-permission";
import { FindOneOptions } from "typeorm";

export class UserPostgresRepository implements UserRepository {
  private repository = PostgresDataSource.getRepository(UserEntity);

  async addUser(user: CreateUserDTO): Promise<User> {
    const { email, username, password, firstName, lastName } = user;
    const hashedPassword = password
      ? await hashPassword(password, config.hash.salt)
      : undefined;
    const newUser = this.repository.create({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: UserRole.USER,
      permissions: [UserPermission.READ],
    });
    return this.mapDbEntityToUser(await this.repository.save(newUser));
  }

  async getAll(): Promise<User[]> {
    return (await this.repository.find()).map(this.mapDbEntityToUser);
  }

  async getUserById(userId: string): Promise<User | null> {
    const options: FindOneOptions<UserEntity> = {
      where: { userId },
    };
    const user = await this.repository.findOne(options);
    return user ? this.mapDbEntityToUser(user) : null;
  }

  async getByUsername(username: string): Promise<User | null> {
    const options: FindOneOptions<UserEntity> = {
      where: { username },
    };
    const user = await this.repository.findOne(options);
    return user ? this.mapDbEntityToUser(user) : null;
  }

  async getByEmail(email: string): Promise<User | null> {
    const options: FindOneOptions<UserEntity> = {
      where: { email },
    };
    const user = await this.repository.findOne(options);
    return user ? this.mapDbEntityToUser(user) : null;
  }

  async updateUser(user: UpdateUserDTO & { userId: string }): Promise<User> {
    const { userId, username, email, password, firstName, lastName } = user;
    const hashedPassword = password
      ? await hashPassword(password, config.hash.salt)
      : undefined;
    const existingUser = await this.repository.findOneBy({ userId });

    if (!existingUser) {
      throw new Error("User not found");
    }
    existingUser.username = username || "";
    existingUser.email = email || "";
    existingUser.password = hashedPassword!;
    existingUser.firstName = firstName || "";
    existingUser.lastName = lastName || "";
    return this.mapDbEntityToUser(await this.repository.save(existingUser));
  }

  async deleteUser(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const existingUser = await this.repository.findOneBy({ userId });
    if (!existingUser) {
      throw new Error("User not found");
    }
    existingUser.refreshToken = refreshToken;
    await this.repository.save(existingUser);
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    const existingUser = await this.repository.findOneBy({ userId });
    return existingUser?.refreshToken || null;
  }

  async deleteRefreshToken(userId: string): Promise<void> {
    const existingUser = await this.repository.findOneBy({ userId });
    if (!existingUser) {
      throw new Error("User not found");
    }
    existingUser.refreshToken = null;
    await this.repository.save(existingUser);
  }

  async save(user: User): Promise<User> {
    const existingUser = await this.repository.findOneBy({
      userId: user.userId,
    });
    if (!existingUser) {
      throw new Error("User not found");
    }
    existingUser.username = user.username;
    existingUser.email = user.email;
    existingUser.password = user.password!;
    existingUser.firstName = user.firstName;
    existingUser.lastName = user.lastName;
    existingUser.role = user.role;
    existingUser.permissions = user.permissions;
    return this.mapDbEntityToUser(await this.repository.save(existingUser));
  }

  private mapDbEntityToUser(userEntity: UserEntity): User {
    return new User(
      userEntity.userId,
      userEntity.firstName,
      userEntity.lastName,
      userEntity.username,
      userEntity.email,
      userEntity.password,
      userEntity.isVerified,
      userEntity.createdAt,
      userEntity.updatedAt,
      userEntity.lastLoginAt,
      userEntity.refreshToken,
      userEntity.role as UserRole,
      userEntity.permissions as UserPermission[],
    );
  }
}
