import { FastifyInstance } from "fastify";
import {
  addAssociation as addOrganizationUserAssociation,
  getAllAssociations as getAllOrganizationUserAssociations,
  getAssociationById as getOrganizationUserAssociationById,
  updateAssociation as updateOrganizationUserAssociation,
  deleteAssociation as deleteOrganizationUserAssociation,
} from "../controllers/organization-user-association-controller";

export async function organizationUserAssociationRoutes(
  fastify: FastifyInstance,
) {
  fastify.post(
    "/organization-user-associations",
    addOrganizationUserAssociation,
  );
  fastify.get(
    "/organization-user-associations",
    getAllOrganizationUserAssociations,
  );
  fastify.get(
    "/organization-user-associations/:associationId",
    getOrganizationUserAssociationById,
  );
  fastify.put(
    "/organization-user-associations/:associationId",
    updateOrganizationUserAssociation,
  );
  fastify.delete(
    "/organization-user-associations/:associationId",
    deleteOrganizationUserAssociation,
  );
}
