import { FastifyInstance } from "fastify";
import {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
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

  fastify.delete(
    "/users/:userId",
    { preHandler: [authorize([UserRole.ADMIN]), isAdmin()] },
    deleteUser,
  );

  fastify.get(
    "/users/:userId",
    {
      preHandler: [
        authorize([UserRole.USER, UserRole.MANAGER], null, "userId"),
      ],
    },
    getUserById,
  );

  fastify.put(
    "/users/:userId",
    {
      preHandler: [
        authorize([UserRole.USER, UserRole.MANAGER], null, "userId"),
      ],
    },
    updateUser,
  );

  fastify.get(
    "/admin/users/:userId",
    {
      preHandler: [authorize([UserRole.ADMIN], null, null)],
    },
    getUserById,
  );

  fastify.put(
    "/admin/users/:userId",
    {
      preHandler: [authorize([UserRole.ADMIN], null, null)],
    },
    updateUser,
  );
}
