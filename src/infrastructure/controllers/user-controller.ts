import { FastifyReply, FastifyRequest } from "fastify";
import UserService from "../services/user-service";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import {
  CreateUserDTOSchema,
  UpdateUserDTOSchema,
} from "../../application/validation/dto-validation/user-dto-schema";
import { z } from "zod";

export const addUser = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userDto = CreateUserDTOSchema.parse(request.body);
    const newUser = await UserService.addUser(userDto);
    reply.status(201).send(newUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
        .code(400)
        .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(`Error creating user: ${error}`);
      reply.status(500).send({ message: "Error creating user" });
    }
  }
};

export const getAllUsers = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await UserService.getAll();
    reply.status(200).send(users);
  } catch (error) {
    logger.error(`Error getting all users: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error during get all users" });
    }
  }
};

export const getUserById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { userId } = request.params as { userId: string };
    const user = await UserService.getById(userId);
    reply.status(200).send(user);
  } catch (error) {
    logger.error(`Error getting user by ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting user" });
    }
  }
};

export const updateUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { userId } = request.params as { userId: string };
    const userDto = UpdateUserDTOSchema.parse(request.body);
    if (userId !== userDto.userId) {
      return reply
        .status(400)
        .send({ message: "User ID in path and body do not match" });
    }
    const updatedUser = await UserService.updateUser(userId, userDto);
    reply.status(200).send(updatedUser);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
        .code(400)
        .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(
        `Error during updating user with ID ${request.params}: ${error}`,
      );
      reply.status(500).send({ message: "Error during update user" });
    }
  }
};

export const getUsersByTestRunId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testRunId } = request.params as { testRunId: string };
    const users = await UserService.getUsersByTestRunId(testRunId);
    reply.status(200).send(users);
  } catch (error) {
    logger.error(`Error getting users by test run ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting users by test run ID" });
    }
  }
};

export const deleteUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { userId } = request.params as { userId: string };
    await UserService.delete(userId);
    reply.status(204).send();
  } catch (error) {
    logger.error(`Error deleting user: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error during delete user" });
    }
  }
};
