import { FastifyInstance } from "fastify";
import {
  addSubsection,
  getAll,
  getById,
  update,
  deleteSubsection,
  getSubsectionsBySectionId,
} from "../controllers/subsection-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";

export async function subsectionRoutes(fastify: FastifyInstance) {
  const roles = [UserRole.MANAGER, UserRole.USER, UserRole.ADMIN];
  fastify.post(
    "/sections/:sectionId/subsections",
    {
      preHandler: [authorize(roles)],
    },
    addSubsection,
  );

  fastify.get(
    "/subsections",
    {
      preHandler: [authorize(roles)],
    },
    getAll,
  );

  fastify.get(
    "/subsections/:subsectionId",
    {
      preHandler: [authorize(roles)],
    },
    getById,
  );

  fastify.put(
    "/subsections/:subsectionId",
    {
      preHandler: [authorize(roles)],
    },
    update,
  );

  fastify.delete(
    "/subsections/:subsectionId",
    {
      preHandler: [authorize(roles)],
    },
    deleteSubsection,
  );

  fastify.get(
    "/sections/:sectionId/subsections",
    {
      preHandler: [authorize(roles)],
    },
    getSubsectionsBySectionId,
  );
}
