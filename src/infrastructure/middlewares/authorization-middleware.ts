import { FastifyRequest, FastifyReply } from "fastify";
import { verifyAccessToken } from "../../tools/jwt";
import { CustomError } from "../../tools/custom-error";
import { UserRole } from "../../domain/entities/enums/user-role";

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
      request.user = decodedToken;

      if (roles && !roles.includes(decodedToken.role)) {
        throw new CustomError("User does not have required role", 403);
      }

      if (userIdParam) {
        const requestedUserId = (request.params as Record<string, string>)[
          userIdParam
        ];
        if (
          decodedToken.role !== UserRole.ADMIN &&
          decodedToken.userId !== requestedUserId
        ) {
          throw new CustomError(
            "Forbidden: You can only modify your own account",
            403,
          );
        }
      }
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
