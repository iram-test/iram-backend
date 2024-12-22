import { FastifyInstance } from "fastify";
import {
  addAssociation as addOrganizationUserAssociation,
  getAllAssociations as getAllOrganizationUserAssociations,
  getAssociationById as getOrganizationUserAssociationById,
  updateAssociation as updateOrganizationUserAssociation,
  deleteAssociation as deleteOrganizationUserAssociation,
} from "../controllers/organization-user-association-controller";
import { authorize } from "../middlewares/authorization-middleware";

export async function organizationUserAssociationRoutes(
  fastify: FastifyInstance,
) {
  fastify.post(
    "/organization-user-associations",
    { preHandler: [authorize()] },
    addOrganizationUserAssociation,
  );
  fastify.get(
    "/organization-user-associations",
    { preHandler: [authorize()] },
    getAllOrganizationUserAssociations,
  );
  fastify.get(
    "/organization-user-associations/:associationId",
    { preHandler: [authorize()] },
    getOrganizationUserAssociationById,
  );
  fastify.put(
    "/organization-user-associations/:associationId",
    { preHandler: [authorize()] },
    updateOrganizationUserAssociation,
  );
  fastify.delete(
    "/organization-user-associations/:associationId",
    { preHandler: [authorize()] },
    deleteOrganizationUserAssociation,
  );
}
