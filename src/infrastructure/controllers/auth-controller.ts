import { FastifyReply, FastifyRequest } from "fastify";
import {
  RegisterDTO,
  LoginWithUsernameDTO,
  LoginWithEmailDTO,
} from "../../application/dtos/auth-dto";
import authService from "../services/auth-service";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const registerDto = request.body as RegisterDTO;
    const data = await authService.registration(registerDto);
    reply.code(201).send({
      message: "User registered successfully",
      userId: data.userId,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch (error) {
    logger.error(`Error during registration: ${error}`);
    reply.code(500).send({ message: "Error during registration" });
  }
};

export const loginWithUsername = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const loginDto = request.body as LoginWithUsernameDTO;
    const tokens = await authService.login(loginDto);
    reply.code(200).send(tokens);
  } catch (error) {
    logger.error(`Error during login: ${error}`);
    reply.code(401).send({ message: "Invalid username or password" });
  }
};

export const loginWithEmail = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const loginDto = request.body as LoginWithEmailDTO;
    const tokens = await authService.login(loginDto);
    reply.code(200).send(tokens);
  } catch (error) {
    logger.error(`Error during login: ${error}`);
    reply.code(401).send({ message: "Invalid email or password" });
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

// New activate controller
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
