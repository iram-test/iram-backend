import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "../services/user-service";
import { CreateUserDTO, UpdateUserDTO } from "../../application/dtos/user-dto";
import logger from "../../tools/logger";

export const addUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userDto = request.body as CreateUserDTO;
    const newUser = await UserService.addUser(userDto);
    reply.code(201).send(newUser);
  } catch (error) {
    logger.error(`Error creating user: ${error}`);
    reply.code(500).send({ message: "Error creating user" });
  }
};

export const getAllUsers = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await UserService.getAllUsers();
    reply.code(200).send(users);
  } catch (error) {
    logger.error(`Error getting all users: ${error}`);
    reply.code(500).send({ message: "Error during get all users" });
  }
};

export const getUserById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { userId } = request.params as { userId: string };
    const user = await UserService.getUserById(userId);
    reply.code(200).send(user);
  } catch (error) {
    logger.error(`Error getting user by ID: ${error}`);
    if (error instanceof Error && error.message === "User not found") {
      reply.code(404).send({ message: "User not found" });
    } else {
      reply.code(500).send({ message: "Error getting user" });
    }
  }
};

export const updateUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { userId } = request.params as { userId: string };
    const userDto = request.body as UpdateUserDTO;
    const updatedUser = await UserService.updateUser(userId, userDto);
    reply.code(200).send(updatedUser);
  } catch (error) {
    logger.error(
      `Error during updating user with ID ${request.params}: ${error}`,
    );
    if (error instanceof Error && error.message === "User not found") {
      reply.code(404).send({ message: "User not found" });
    } else {
      reply.code(500).send({ message: "Error during update user" });
    }
  }
};

export const deleteUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { userId } = request.params as { userId: string };
    await UserService.deleteUser(userId);
    reply.code(204).send();
  } catch (error) {
    logger.error(`Error deleting user: ${error}`);
    if (error instanceof Error && error.message === "User not found") {
      reply.code(404).send({ message: "User not found" });
    } else {
      reply.code(500).send({ message: "Error during delete user" });
    }
  }
};
