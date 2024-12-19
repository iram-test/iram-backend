import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../../domain/services/auth-domain-service";
import { RegistrationDTO, LoginDTO } from "../../application/dtos/auth-dto";
import { User } from "../../domain/entities/user-entity";
import { UserPostgresRepository } from "../db/PostgresRepository/UserPostgresRepository";
import { AuthInfrastructureService } from "../services/AuthInfrastructureService";
import { RedisService } from "../services/OuterServices/RedisService";
class AuthController {
  constructor(
    readonly authService: AuthInfrastructureService = new AuthInfrastructureService(
      new UserPostgresRepository(),
      new RedisService(),
    ),
  ) {}

  async registration(
    request: FastifyRequest<{ Body: RegistrationDTO }>,
    reply: FastifyReply,
  ) {
    try {
      const userData = await this.authService.registration(request.body);
      return reply.status(201).send(userData);
    } catch (e) {
      reply.code(500).send(e);
    }
  }

  async login(
    request: FastifyRequest<{ Body: LoginDTO }>,
    reply: FastifyReply,
  ) {
    try {
      const user: User = request.user as User; // this relies on local strategy from passport and user property can have any user there
      const userData = await this.authService.login(user);
      reply.status(200).send(userData);
    } catch (error) {
      reply
        .code(500)
        .send({ message: `Something went wrong when logging user in`, error });
    }
  }

  async logout(
    request: FastifyRequest<{ Body: { email: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const { email } = request.body;
      await this.authService.logout(email);
      return reply.status(200).send({ message: "successfully logged out" });
    } catch (e) {
      reply
        .code(500)
        .send({ message: "Something went wrong during logout", error: e });
    }
  }

  async activate(
    request: FastifyRequest<{ Params: { link: string } }>,
    reply: FastifyReply,
  ) {
    try {
      const { link } = request.params;
      await this.authService.activate(link);
      return reply.redirect(process.env.CLIENT_URL || "");
    } catch (e) {
      reply.code(500).send({
        message: "Something went wrong during account activation",
        error: e,
      });
    }
  }

  async refresh(request: FastifyRequest, reply: FastifyReply) {
    try {
      // const {refreshToken} = req.cookies
      //   const userData = await this.authService.refresh(refreshToken)
      reply.code(200).send("This is temporary endpoint and need refactor");
    } catch (e) {
      reply.code(500).send({
        message: "Something went wrong during account refresh",
        error: e,
      });
    }
  }
}

export default new AuthController();
