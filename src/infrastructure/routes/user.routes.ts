import { FastifyInstance } from "fastify";
import {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user-controller";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/users", addUser);
  fastify.get("/users", getAllUsers);
  fastify.get("/users/:userId", getUserById);
  fastify.put("/users/:userId", updateUser);
  fastify.delete("/users/:userId", deleteUser);
}
