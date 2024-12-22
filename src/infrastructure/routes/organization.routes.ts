import { FastifyInstance } from "fastify";
import {
  addOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from "../controllers/organization-controller";
import { authorize } from "../middlewares/authorization-middleware";

export async function organizationRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/organizations",
    { preHandler: [authorize()] },
    addOrganization,
  );
  fastify.get(
    "/organizations",
    { preHandler: [authorize()] },
    getAllOrganizations,
  );
  fastify.get(
    "/organizations/:organizationId",
    { preHandler: [authorize()] },
    getOrganizationById,
  );
  fastify.put(
    "/organizations/:organizationId",
    { preHandler: [authorize()] },
    updateOrganization,
  );
  fastify.delete(
    "/organizations/:organizationId",
    { preHandler: [authorize()] },
    deleteOrganization,
  );
}
