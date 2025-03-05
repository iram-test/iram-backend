import { FastifyInstance } from "fastify";
import {
  addSubsection,
  getAllSubsections,
  getSubsectionById,
  updateSubsection,
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
    getAllSubsections,
  );

  fastify.get(
    "/subsections/:subsectionId",
    {
      preHandler: [authorize(roles)],
    },
    getSubsectionById,
  );

  fastify.put(
    "/subsections/:subsectionId",
    {
      preHandler: [authorize(roles)],
    },
    updateSubsection,
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
