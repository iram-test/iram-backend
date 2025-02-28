import { CreateUserDTO, UpdateUserDTO } from "../../application/dtos/user-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import { User } from "../../domain/entities/user-entity";
import {UserPostgresRepository} from "../db/repositories/user-postgres-repository";

const userRepository = new UserPostgresRepository();

class UserService {
  async addUser(userDto: CreateUserDTO): Promise<User> {
    try {
      const newUser = await userRepository.addUser(userDto);
      logger.info(`User created: ${newUser.username}`);
      return newUser;
    } catch (error) {
      logger.error(`Error creating user:`, error);
      throw new CustomError("Failed to create user", 500);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      logger.info(`Get all users`);
      return await userRepository.getAll();
    } catch (error) {
      logger.error(`Error getting all users:`, error);
      throw new CustomError("Failed to get users", 500);
    }
  }

  async getById(userId: string): Promise<User> {
    try {
      const user = await userRepository.getUserById(userId);
      if (!user) {
        logger.warn(`User with ID ${userId} was not found.`);
        throw new CustomError("User not found", 404);
      }
      logger.info(`User with ID ${userId} was found.`);
      return user;
    } catch (error) {
      logger.error(`Error getting user by id ${userId}:`, error);
      throw new CustomError("Failed to get user", 500);
    }
  }

  async updateUser(userId: string, userDto: UpdateUserDTO): Promise<User> {
    try {
      const user = await userRepository.getUserById(userId);
      if (!user) {
        logger.warn(`User with ID ${userId} was not found for update.`);
        throw new CustomError("User not found", 404);
      }
      const updatedUser = await userRepository.updateUser({
        ...userDto,
        userId,
      });
      logger.info(`User with ID ${userId} updated successfully.`);
      return updatedUser;
    } catch (error) {
      logger.error(`Error updating user with id ${userId}:`, error);
      throw new CustomError("Failed to update user", 500);
    }
  }

  async delete(userId: string): Promise<void> {
    try {
      const user = await userRepository.getUserById(userId);
      if (!user) {
        logger.warn(`User with ID ${userId} was not found for delete.`);
        throw new CustomError("User not found", 404);
      }
      await userRepository.deleteUser(userId);
      logger.info(`User with ID ${userId} was successfully deleted`);
    } catch (error) {
      logger.error(`Error deleting user with id ${userId}:`, error);
      throw new CustomError("Failed to delete user", 500);
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    try {
      logger.info(`Get User by email`);
      return await userRepository.getByEmail(email);
    } catch (error) {
      logger.error(`Error getting user by email:`, error);
      throw new CustomError("Failed to get user", 500);
    }
  }

  async getByUsername(username: string): Promise<User | null> {
    try {
      logger.info(`Get User by username`);
      return await userRepository.getByUsername(username);
    } catch (error) {
      logger.error(`Error getting user by username:`, error);
      throw new CustomError("Failed to get user", 500);
    }
  }

  async getUsersByTestRunId(testRunId: string): Promise<User[]> {
    try {
      logger.info(`Getting users for test run ID: ${testRunId}`);
      const users = await userRepository.getUsersByTestRunId(testRunId);
      return users;
    } catch (error) {
      logger.error(`Error getting users for test run ID ${testRunId}:`, error);
      throw new CustomError("Failed to get users for test run", 500);
    }
  }
}

export default new UserService();
