import { FastifyInstance } from "fastify";
import {
  addAssociation as addProjectUserAssociation,
  getAllAssociations as getAllProjectUserAssociations,
  getAssociationById as getProjectUserAssociationById,
  updateAssociation as updateProjectUserAssociation,
  deleteAssociation as deleteProjectUserAssociation,
} from "../controllers/project-user-association-controller";

export async function projectUserAssociationRoutes(fastify: FastifyInstance) {
  fastify.post("/project-user-associations", addProjectUserAssociation);
  fastify.get("/project-user-associations", getAllProjectUserAssociations);
  fastify.get(
    "/project-user-associations/:associationId",
    getProjectUserAssociationById,
  );
  fastify.put(
    "/project-user-associations/:associationId",
    updateProjectUserAssociation,
  );
  fastify.delete(
    "/project-user-associations/:associationId",
    deleteProjectUserAssociation,
  );
}
