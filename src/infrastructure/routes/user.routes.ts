import { FastifyInstance } from "fastify";
import {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser, getUsersByTestRunId,
} from "../controllers/user-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { isAdmin } from "../middlewares/admin-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/users",
    { preHandler: [authorize([UserRole.ADMIN]), isAdmin()] },
    addUser,
  );

  fastify.get(
    "/users",
    { preHandler: [authorize([UserRole.ADMIN]), isAdmin()] },
    getAllUsers,
  );

  fastify.get(
    "/users/:userId",
    {
      preHandler: [
        authorize([UserRole.USER, UserRole.MANAGER, UserRole.ADMIN], "userId"),
      ],
    },
    getUserById,
  );

  fastify.put(
    "/users/:userId",
    {
      preHandler: [
        authorize([UserRole.USER, UserRole.MANAGER, UserRole.ADMIN], "userId"),
      ],
    },
    updateUser,
  );

  fastify.get(
    "/test-runs/:testRunId/users",
    {
      preHandler: [authorize([UserRole.ADMIN, UserRole.MANAGER])],
    },
    getUsersByTestRunId,
  );

  fastify.delete(
    "/users/:userId",
    {
      preHandler: [
        authorize([UserRole.USER, UserRole.MANAGER, UserRole.ADMIN], "userId"),
      ],
    },
    deleteUser,
  );

  fastify.get(
    "/admin/users/:userId",
    {
      preHandler: [authorize([UserRole.ADMIN])],
    },
    getUserById,
  );

  fastify.put(
    "/admin/users/:userId",
    {
      preHandler: [authorize([UserRole.ADMIN])],
    },
    updateUser,
  );

  fastify.delete(
    "/admin/users/:userId",
    {
      preHandler: [authorize([UserRole.ADMIN])],
    },
    deleteUser,
  );
}
