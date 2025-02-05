import { FastifyInstance } from "fastify";
import {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";

export async function projectRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/projects",
    { preHandler: [authorize([UserRole.MANAGER])] },
    addProject,
  );
  fastify.get(
    "/projects",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    getAllProjects,
  );
  fastify.get(
    "/projects/:projectId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    getProjectById,
  );
  fastify.put(
    "/projects/:projectId",
    { preHandler: [authorize([UserRole.MANAGER])] },
    updateProject,
  );
  fastify.delete(
    "/projects/:projectId",
    { preHandler: [authorize([UserRole.MANAGER])] },
    deleteProject,
  );
}
