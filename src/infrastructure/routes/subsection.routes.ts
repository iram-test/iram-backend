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
  fastify.post(
    "/subsections",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    addSubsection,
  );

  fastify.get(
    "/subsections",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getAll,
  );

  fastify.get(
    "/subsections/:subsectionId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getById,
  );

  fastify.put(
    "/subsections/:subsectionId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    update,
  );

  fastify.delete(
    "/subsections/:subsectionId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    deleteSubsection,
  );

  fastify.get(
    "/sections/:sectionId/subsections",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getSubsectionsBySectionId,
  );
}
