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
  fastify.post(
    "/sections",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    addSection,
  );

  fastify.get(
    "/sections",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getAll,
  );

  fastify.get(
    "/sections/:sectionId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getById,
  );

  fastify.put(
    "/sections/:sectionId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    update,
  );

  fastify.delete(
    "/sections/:sectionId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    deleteSection,
  );

  fastify.get(
    "/projects/:projectId/sections",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getSectionsByProjectId,
  );
}
