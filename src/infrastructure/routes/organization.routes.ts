import { FastifyInstance } from "fastify";
import {
  addOrganization,
  deleteOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
} from "../controllers/organization-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";

export async function organizationRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/organizations",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    addOrganization,
  );
  fastify.get(
    "/organizations",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    getAllOrganizations,
  );
  fastify.get(
    "/organizations/:organizationId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.ADMIN, UserRole.USER]),
      ],
    },
    getOrganizationById,
  );
  fastify.put(
    "/organizations/:organizationId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    updateOrganization,
  );
  fastify.delete(
    "/organizations/:organizationId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    deleteOrganization,
  );
}
