import { User } from "../../../domain/entities/user-entity";
import { PostgresDataSource } from "../../../tools/db-connection";
import { FindOptionsWhere, Repository } from "typeorm";
import { UserRepository } from "../../../domain/repositories/user-repository";
import {
  CreateUserDTO,
  UpdateUserDTO,
} from "../../../application/dtos/user-dto";
import { v4 } from "uuid";
export class UserPostgresRepository implements UserRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = PostgresDataSource.getRepository(User);
  }
  async addUser(user: CreateUserDTO): Promise<User> {
    const createdUser = this.repository.create({
      ...user,
      userId: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.repository.save(createdUser);
  }
  async getAll(): Promise<User[]> {
    return await this.repository.find();
  }
  async getUserById(userId: string): Promise<User | null> {
    return await this.repository.findOneBy({ userId });
  }

  async updateUser(user: UpdateUserDTO & { userId: string }): Promise<User> {
    const existingUser = await this.repository.findOneBy({
      userId: user.userId,
    });
    if (!existingUser) {
      throw new Error(`user with ${user.userId} does not exist`);
    }
    await this.repository.update(user.userId, {
      ...user,
      updatedAt: new Date(),
    });
    return (await this.repository.findOneBy({ userId: user.userId })) as User;
  }
  async deleteUser(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }
  async getBy(options: FindOptionsWhere<User>): Promise<User | null> {
    return await this.repository.findOneBy(options);
  }
}
