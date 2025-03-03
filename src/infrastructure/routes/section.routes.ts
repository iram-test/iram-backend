import { FastifyInstance } from "fastify";
import {
  addSection,
  getAll,
  getById,
  update,
  deleteSection,
  getSectionsByProjectId,
} from "../controllers/section-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";

export async function sectionRoutes(fastify: FastifyInstance) {
  const roles = [UserRole.MANAGER, UserRole.USER, UserRole.ADMIN];
  fastify.post(
    "/projects/:projectId/sections",
    {
      preHandler: [authorize(roles)],
    },
    addSection,
  );

  fastify.get(
    "/sections",
    {
      preHandler: [authorize(roles)],
    },
    getAll,
  );

  fastify.get(
    "/sections/:sectionId",
    {
      preHandler: [authorize(roles)],
    },
    getById,
  );

  fastify.put(
    "/sections/:sectionId",
    {
      preHandler: [authorize(roles)],
    },
    update,
  );

  fastify.delete(
    "/sections/:sectionId",
    {
      preHandler: [authorize(roles)],
    },
    deleteSection,
  );

  fastify.get(
    "/projects/:projectId/sections",
    {
      preHandler: [authorize(roles)],
    },
    getSectionsByProjectId,
  );
}
