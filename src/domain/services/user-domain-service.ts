import { User } from "../entities/user-entity";
import { CreateUserDTO, UpdateUserDTO } from "../../application/dtos/user-dto";
import { UserRepository } from "../repositories/user-repository";

export class UserDomainService {
  constructor(private userRepository: UserRepository) {}
  async addUser(user: CreateUserDTO): Promise<User> {
    return await this.userRepository.addUser(user);
  }
  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }
  async getUserById(userId: string): Promise<User | null> {
    return await this.userRepository.getUserById(userId);
  }
  async updateUser(user: UpdateUserDTO & { userId: string }): Promise<User> {
    return this.userRepository.updateUser(user);
  }
  async deleteUser(userId: string): Promise<void> {
    return await this.userRepository.deleteUser(userId);
  }
  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.getByEmail(email);
  }
  async getUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.getByUsername(username);
  }
  async deleteRefreshToken(userId: string): Promise<void> {
    return await this.userRepository.deleteRefreshToken(userId);
  }
}
