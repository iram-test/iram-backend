import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../../domain/services/user-domain-service";
import { CreateUserDTO, UpdateUserDTO } from "../../application/dtos/user-dto";
import { User } from "../../domain/entities/user-entity";
import { UserPostgresRepository } from "../db/repositories/user-postgres-repository";

class UserController {
  constructor(
    private userService: UserService = new UserService(
      new UserPostgresRepository(),
    ),
  ) {}

  async createUser(
    request: FastifyRequest<{ Body: CreateUserDTO }>,
    reply: FastifyReply,
  ) {
    try {
      const user: User = await this.userService.addUser(request.body);
      reply.code(201).send(user);
    } catch (error) {
      reply
        .code(500)
        .send({ message: "Something went wrong when creating user", error });
    }
  }
  async getUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const users: User[] = await this.userService.getAll();
      reply.code(200).send(users);
    } catch (error) {
      reply.code(500).send({
        message: "Something went wrong when fetching all users",
        error,
      });
    }
  }
  async getUserById(
    request: FastifyRequest<{ Params: { userId: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const user: User | null = await this.userService.getUserById(
        request.params.userId,
      );
      if (!user) {
        reply.code(404).send({
          message: `User with id: ${request.params.userId} not found`,
        });
        return;
      }
      reply.code(200).send(user);
    } catch (error) {
      reply.code(500).send({
        message: `Something went wrong when fetching user with id: ${request.params.userId}`,
      });
    }
  }
  async updateUser(
    request: FastifyRequest<{
      Body: UpdateUserDTO;
      Params: { userId: string };
    }>,
    reply: FastifyReply,
  ) {
    try {
      const user: User = await this.userService.updateUser({
        ...request.body,
        userId: request.params.userId,
      });
      reply.code(200).send(user);
    } catch (error) {
      reply.code(500).send({
        message: `Something went wrong when updating user with id: ${request.params.userId}`,
        error,
      });
    }
  }
  async deleteUser(
    request: FastifyRequest<{ Params: { userId: string } }>,
    reply: FastifyReply,
  ) {
    try {
      await this.userService.deleteUser(request.params.userId);
      reply.code(204).send({
        message: `User with id: ${request.params.userId} was successfully deleted`,
      });
    } catch (error) {
      reply.code(500).send({
        message: `Something went wrong when deleting user with id: ${request.params.userId}`,
      });
    }
  }
}
