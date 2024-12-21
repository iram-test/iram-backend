import { FastifyInstance } from "fastify";
import {
  addOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from "../controllers/organization-controller";

export async function organizationRoutes(fastify: FastifyInstance) {
  fastify.post("/organizations", addOrganization);
  fastify.get("/organizations", getAllOrganizations);
  fastify.get("/organizations/:organizationId", getOrganizationById);
  fastify.put("/organizations/:organizationId", updateOrganization);
  fastify.delete("/organizations/:organizationId", deleteOrganization);
}
