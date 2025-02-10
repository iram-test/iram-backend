import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entities/user-entity";
import { User } from "../../../domain/entities/user-entity";
import {
  CreateUserDTO,
  UpdateUserDTO,
} from "../../../application/dtos/user-dto";
import { UserRepository } from "../../../domain/repositories/user-repository";
import { PostgresDataSource } from "../../../tools/db-connection";

export class UserPostgresRepository implements UserRepository {
  private repository: Repository<UserEntity>;

  constructor(private readonly dataSource: DataSource = PostgresDataSource) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const userEntity = this.repository.create(createUserDTO);
    const savedUserEntity = await this.repository.save(userEntity);
    return this.toDomainEntity(savedUserEntity);
  }

  async getAll(): Promise<User[]> {
    const users = await this.repository.find({
      relations: ["testCases", "testReports", "testRuns"],
    });
    return users.map((userEntity) => this.toDomainEntity(userEntity));
  }

  async getUserById(userId: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { userId },
      relations: ["testCases", "testReports", "testRuns"],
    });
    return userEntity ? this.toDomainEntity(userEntity) : null;
  }

  async updateUser(updateUserDTO: UpdateUserDTO): Promise<User> {
    const { userId, ...updateData } = updateUserDTO;
    await this.repository.update(userId, updateData);
    const updatedUserEntity = await this.repository.findOneOrFail({
      where: { userId },
      relations: ["testCases", "testReports", "testRuns"],
    });
    return this.toDomainEntity(updatedUserEntity);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.repository.delete(userId);
  }

  async getByEmail(email: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { email },
      relations: ["testCases", "testReports", "testRuns"],
    });
    return userEntity ? this.toDomainEntity(userEntity) : null;
  }

  async getByUsername(username: string): Promise<User | null> {
    const userEntity = await this.repository.findOne({
      where: { username },
      relations: ["testCases", "testReports", "testRuns"],
    });
    return userEntity ? this.toDomainEntity(userEntity) : null;
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.repository.update(userId, { refreshToken });
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    const userEntity = await this.repository.findOne({ where: { userId } });
    return userEntity?.refreshToken ?? null;
  }

  async deleteRefreshToken(userId: string): Promise<void> {
    await this.repository.update(userId, { refreshToken: null });
  }

  async updateLastLogin(userId: string, lastLogin: string): Promise<void> {
    await this.repository.update(userId, { lastLoginAt: lastLogin });
  }

  private toDomainEntity(userEntity: UserEntity): User {
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
