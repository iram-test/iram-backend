import { FastifyInstance } from "fastify";
import {
  register,
  loginWithUsername,
  loginWithEmail,
  logout,
  refresh,
} from "../controllers/auth-controller";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/auth/register", register);
  fastify.post("/auth/login/username", loginWithUsername);
  fastify.post("/auth/login/email", loginWithEmail);
  fastify.post("/auth/logout", logout);
  fastify.post("/auth/refresh", refresh);
}
