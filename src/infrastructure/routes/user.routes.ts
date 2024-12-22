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

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/users", { preHandler: [authorize(), isAdmin()] }, addUser);
  fastify.get("/users", { preHandler: [authorize(), isAdmin()] }, getAllUsers);
  fastify.get(
    "/users/:userId",
    { preHandler: [authorize(null, null, null, "userId")] },
    getUserById,
  );
  fastify.put(
    "/users/:userId",
    { preHandler: [authorize(null, null, null, "userId")] },
    updateUser,
  );
  fastify.delete(
    "/users/:userId",
    { preHandler: [authorize(null, null, null, "userId")] },
    deleteUser,
  );
}
