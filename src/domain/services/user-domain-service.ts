import { User } from "../entities/user-entity";
import { CreateUserDTO, UpdateUserDTO } from "../../application/dtos/user-dto";
import { UserRepository } from "../repositories/user-repository";
import { v4 } from "uuid";

export class UserDomainService {
  constructor(private userRepository: UserRepository) {}

  async addUser(userDto: CreateUserDTO): Promise<User> {
    const user: User = new User(
        v4(),
      userDto.firstName,
      userDto.lastName,
      userDto.username,
      userDto.email,
      userDto.password ?? "",
      userDto.isVerified,
      new Date().toISOString(),
      new Date().toISOString(),
      userDto.lastLoginAt ?? null,
      userDto.refreshToken ?? null,
      userDto.role,
    );
    return await this.userRepository.addUser(user);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async getUserById(userId: string): Promise<User | null> {
    return await this.userRepository.getUserById(userId);
  }

  async updateUser(userDto: UpdateUserDTO): Promise<User> {
    return this.userRepository.updateUser(userDto);
  }

  async deleteUser(userId: string): Promise<void> {
    return await this.userRepository.deleteUser(userId);
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
