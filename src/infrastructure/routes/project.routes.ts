import { FastifyInstance } from "fastify";
import {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  addUserToProject,
  removeUserFromProject,
  getAllUsersFromProject,
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
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    getAllProjects,
  );
  fastify.get(
    "/projects/:projectId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.ADMIN, UserRole.USER]),
      ],
    },
    getProjectById,
  );
  fastify.get(
    "/projects/:projectId/users",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.ADMIN, UserRole.USER]),
      ],
    },
    getAllUsersFromProject,
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
  fastify.post(
    "/projects/:projectId/users",
    { preHandler: [authorize([UserRole.MANAGER])] },
    addUserToProject,
  );

  fastify.delete(
    "/projects/:projectId/users",
    { preHandler: [authorize([UserRole.MANAGER])] },
    removeUserFromProject,
  );
}
