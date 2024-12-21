import { FastifyInstance } from "fastify";
import {
  addProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project-controller";

export async function projectRoutes(fastify: FastifyInstance) {
  fastify.post("/projects", addProject);
  fastify.get("/projects", getAllProjects);
  fastify.get("/projects/:projectId", getProjectById);
  fastify.put("/projects/:projectId", updateProject);
  fastify.delete("/projects/:projectId", deleteProject);
}
