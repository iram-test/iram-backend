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

export const isAdmin = () => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new CustomError("No token provided", 401);
    }
    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = verifyAccessToken(token) as AccessTokenPayload;
      if (decodedToken.role !== UserRole.ADMIN) {
        throw new CustomError(
          "User does not have required role for this action",
          403,
        );
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
