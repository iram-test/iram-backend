import { UserDomainService } from "../../domain/services/user-domain-service";
import { UserPostgresRepository } from "../db/repositories/user-postgres-repository";
import { CreateUserDTO, UpdateUserDTO } from "../../application/dtos/user-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import { User } from "../../domain/entities/user-entity";

const userRepository = new UserPostgresRepository();
const userService = new UserDomainService(userRepository);

class UserService {
  async addUser(userDto: CreateUserDTO): Promise<User> {
    const newUser = await userService.addUser(userDto);
    logger.info(`User created: ${newUser.username}`);
    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    logger.info(`Get all users`);
    return await userService.getAll();
  }

  async getUserById(userId: string): Promise<User> {
    const user = await userService.getUserById(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} was not found.`);
      throw new CustomError("User not found", 404);
    }
    logger.info(`User with ID ${userId} was found.`);
    return user;
  }

  async updateUser(userId: string, userDto: UpdateUserDTO): Promise<User> {
    const user = await userService.getUserById(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} was not found for update.`);
      throw new CustomError("User not found", 404);
    }
    const updatedUser = await userService.updateUser({ ...userDto, userId });
    logger.info(`User with ID ${userId} updated successfully.`);
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await userService.getUserById(userId);
    if (!user) {
      logger.warn(`User with ID ${userId} was not found for delete.`);
      throw new CustomError("User not found", 404);
    }
    await userService.deleteUser(userId);
    logger.info(`User with ID ${userId} was successfully deleted`);
  }
}

export default new UserService();
