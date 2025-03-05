import { FastifyReply, FastifyRequest } from "fastify";
import authService from "../services/auth-service";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";
import {
  LoginWithEmailDTOSchema,
  LoginWithUsernameDTOSchema,
  RegisterDTOSchema,
} from "../../application/validation/dto-validation/register-dto-schema";
import { z } from "zod";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const registerDto = RegisterDTOSchema.parse(request.body);
    const data = await authService.registration(registerDto);
    reply.code(201).send({
      message: "User registered successfully",
      userId: data.userId,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
        .code(400)
        .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(`Error during registration: ${error}`);
      reply.code(500).send({ message: "Error during registration" });
    }
  }
};

export const loginWithUsername = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const loginDto = LoginWithUsernameDTOSchema.parse(request.body);
    const tokens = await authService.login(loginDto);
    reply.code(200).send(tokens);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
        .code(400)
        .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(`Error during login: ${error}`);
      reply.code(401).send({ message: "Invalid username or password" });
    }
  }
};

export const loginWithEmail = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const loginDto = LoginWithEmailDTOSchema.parse(request.body);
    const tokens = await authService.login(loginDto);
    reply.code(200).send(tokens);
  } catch (error) {
    if (error instanceof z.ZodError) {
      reply
        .code(400)
        .send({ message: "Validation error", errors: error.errors });
    } else {
      logger.error(`Error during login: ${error}`);
      reply.code(401).send({ message: "Invalid email or password" });
    }
  }
};

export const logout = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const refreshToken = request.headers["x-refresh-token"] as string;
    await authService.logout(refreshToken);
    reply.code(200).send({ message: "Logged out successfully" });
  } catch (error) {
    logger.error(`Error during logout: ${error}`);
    reply.code(500).send({ message: "Error during logout" });
  }
};

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const refreshToken = request.headers["x-refresh-token"] as string;
    const tokens = await authService.refresh(refreshToken);
    reply.code(200).send(tokens);
  } catch (error) {
    logger.error(`Error during refresh: ${error}`);
    reply.code(401).send({ message: "Invalid refresh token" });
  }
};

export const activate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { userId } = request.params as { userId: string };
    await authService.activate(userId);
    reply.code(200).send({ message: "Account activated successfully" });
  } catch (error) {
    logger.error(`Error during account activation: ${error}`);
    reply.code(500).send({ message: "Error during account activation" });

    if (error instanceof CustomError) {
      reply.code(error.statusCode).send({ message: error.message });
    } else {
      reply.code(500).send({ message: "Error during account activation" });
    }
  }
};
