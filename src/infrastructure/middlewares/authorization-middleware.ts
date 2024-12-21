import { FastifyRequest, FastifyReply } from "fastify";
import { verifyAccessToken } from "../../tools/jwt";
import { CustomError } from "../../tools/custom-error";
import { UserRole } from "../../domain/entities/enums/user-role";
import { UserPermission } from "../../domain/entities/enums/user-permission";
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
  permissions: UserPermission[];
}
export const authorize = (
  roles: UserRole[] | null = null,
  permissions: UserPermission[] | null = null,
  projectRole: ProjectRole | null = null,
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new CustomError("No token provided", 401);
    }

    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = verifyAccessToken(token) as AccessTokenPayload;
      if (roles && !roles.includes(decodedToken.role)) {
        throw new CustomError("User does not have required role", 403);
      }
      if (permissions) {
        const hasRequiredPermission = permissions.every((permission) =>
          decodedToken.permissions.includes(permission),
        );
        if (!hasRequiredPermission) {
          throw new CustomError("User does not have required permission", 403);
        }
      }

      if (projectRole) {
        const { projectId } = request.params as { projectId: string };
        if (projectId) {
          const userProjectRole =
            await projectUserAssociationService.getAssociationByUserIdAndProjectId(
              decodedToken.userId,
              projectId,
            );
          if (userProjectRole?.role !== projectRole) {
            throw new CustomError(
              "User does not have required role in the project",
              403,
            );
          }
        }
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
