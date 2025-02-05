import { FastifyRequest, FastifyReply } from "fastify";
import { verifyAccessToken } from "../../tools/jwt";
import { CustomError } from "../../tools/custom-error";
import { UserRole } from "../../domain/entities/enums/user-role";
import { ProjectUserAssociationDomainService } from "../../domain/services/project-user-association-domain-service";
import { ProjectUserAssociationPostgresRepository } from "../db/repositories/project-user-association-postgres-repository";
import { ProjectRole } from "../../domain/entities/enums/project-role";

const projectUserAssociationRepository =
  new ProjectUserAssociationPostgresRepository();
const projectUserAssociationService = new ProjectUserAssociationDomainService(
  projectUserAssociationRepository,
);

declare module "fastify" {
  interface FastifyRequest {
    user?: AccessTokenPayload;
  }
}
interface AccessTokenPayload {
  userId: string;
  username: string;
  role: UserRole;
}

export const authorize = (
  roles: UserRole[] | null = null,
  projectRole: ProjectRole | null = null,
  userIdParam: string | null = null,
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new CustomError("No token provided", 401);
    }
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = verifyAccessToken(token) as AccessTokenPayload;
      // Check role
      if (roles && !roles.includes(decodedToken.role)) {
        throw new CustomError("User does not have required role", 403);
      }
      request.user = decodedToken;
    } catch (error) {
      if (error instanceof CustomError) {
        reply.code(error.statusCode).send({ message: error.message });
      } else {
        reply.code(401).send({ message: "Invalid token" });
      }
      throw error;
    }
  };
};
