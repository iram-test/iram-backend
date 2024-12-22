import { FastifyInstance } from "fastify";
import {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { isAdmin } from "../middlewares/admin-middleware";

export async function projectRoutes(fastify: FastifyInstance) {
  fastify.post("/projects", { preHandler: [authorize()] }, addProject);
  fastify.get("/projects", { preHandler: [authorize()] }, getAllProjects);
  fastify.get(
    "/projects/:projectId",
    { preHandler: [authorize()] },
    getProjectById,
  );
  fastify.put(
    "/projects/:projectId",
    { preHandler: [authorize()] },
    updateProject,
  );
  fastify.delete(
    "/projects/:projectId",
    { preHandler: [authorize()] },
    deleteProject,
  );
}
