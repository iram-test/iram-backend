import { FastifyInstance } from "fastify";
import {
  addAssociation as addProjectUserAssociation,
  getAllAssociations as getAllProjectUserAssociations,
  getAssociationById as getProjectUserAssociationById,
  updateAssociation as updateProjectUserAssociation,
  deleteAssociation as deleteProjectUserAssociation,
} from "../controllers/project-user-association-controller";
import { authorize } from "../middlewares/authorization-middleware";

export async function projectUserAssociationRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/project-user-associations",
    { preHandler: [authorize()] },
    addProjectUserAssociation,
  );
  fastify.get(
    "/project-user-associations",
    { preHandler: [authorize()] },
    getAllProjectUserAssociations,
  );
  fastify.get(
    "/project-user-associations/:associationId",
    { preHandler: [authorize()] },
    getProjectUserAssociationById,
  );
  fastify.put(
    "/project-user-associations/:associationId",
    { preHandler: [authorize()] },
    updateProjectUserAssociation,
  );
  fastify.delete(
    "/project-user-associations/:associationId",
    { preHandler: [authorize()] },
    deleteProjectUserAssociation,
  );
}
