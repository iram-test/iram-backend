import { DataSource } from "typeorm";
import { UserEntity } from "../entities/user-entity";
import { UserRepository } from "../../../domain/repositories/user-repository";
import {
  CreateUserDTO,
  UpdateUserDTO,
} from "../../../application/dtos/user-dto";
import { User } from "../../../domain/entities/user-entity";
import { PostgresDataSource } from "../../../tools/db-connection";

export class UserPostgresRepository implements UserRepository {
  private repository;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }

  async getUsersByTestRunId(testRunId: string): Promise<User[]> {
    const users = await this.repository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.testRuns", "testRun")
        .where("testRun.testRunId = :testRunId", { testRunId })
        .getMany();

    return users.map((userEntity) => this.mapToDomain(userEntity));
  }

  async addUser(user: CreateUserDTO): Promise<User> {
    const userEntity = this.repository.create(user);
    const savedUser = await this.repository.save(userEntity);
    return this.mapToDomain(savedUser);
  }

  async getAll(): Promise<User[]> {
    const userEntities = await this.repository.find();
    return userEntities.map((userEntity) => this.mapToDomain(userEntity));
  }

  async getUserById(userId: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { userId },
    });
    if (!userEntity) {
      return null;
    }

    return this.mapToDomain(userEntity);
  }

  async updateUser(user: UpdateUserDTO): Promise<User> {
    await this.repository.update(user.userId, user);
    const updatedUser = await this.repository.findOne({
      where: { userId: user.userId },
    });

    if (!updatedUser) {
      throw new Error("User not found after update");
    }

    return this.mapToDomain(updatedUser);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.repository.delete(userId);
  }

  async getByEmail(email: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { email } });
    return userEntity ? this.mapToDomain(userEntity) : null;
  }

  async getByUsername(username: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({ where: { username } });
    return userEntity ? this.mapToDomain(userEntity) : null;
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.repository.update(userId, { refreshToken });
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    const user = await this.repository.findOne({
      where: { userId },
      select: ["refreshToken"],
    });
    return user ? user.refreshToken : null;
  }

  async deleteRefreshToken(userId: string): Promise<void> {
    await this.repository.update(userId, { refreshToken: null });
  }

  async updateLastLogin(userId: string, lastLogin: string): Promise<void> {
    await this.repository.update(userId, { lastLoginAt: lastLogin });
  }

  private mapToDomain(userEntity: UserEntity): User {
    return new User(
      userEntity.userId,
      userEntity.firstName,
      userEntity.lastName,
      userEntity.username,
      userEntity.email,
      userEntity.password,
      userEntity.isVerified,
      userEntity.createdAt.toISOString(),
      userEntity.updatedAt.toISOString(),
      userEntity.lastLoginAt,
      userEntity.refreshToken,
      userEntity.role,
    );
  }
}
