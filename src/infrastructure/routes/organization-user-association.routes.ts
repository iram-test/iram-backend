import { FastifyInstance } from "fastify";
import {
  addAssociation,
  getAllAssociations,
  getAssociationById,
  updateAssociation,
  deleteAssociation,
  getOrganizationsByUserId,
  getOrganizationsByProjectId,
} from "../controllers/organization-user-association-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";

export async function organizationUserAssociationRoutes(
  fastify: FastifyInstance,
) {
  fastify.post(
    "/organization-user-associations",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    addAssociation,
  );
  fastify.get(
    "/organization-user-associations",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    getAllAssociations,
  );
  fastify.get(
    "/organization-user-associations/:associationId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    getAssociationById,
  );
  fastify.put(
    "/organization-user-associations/:associationId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    updateAssociation,
  );
  fastify.delete(
    "/organization-user-associations/:associationId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    deleteAssociation,
  );
  fastify.get(
    "/organizations/user/:userId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.ADMIN, UserRole.USER]),
      ],
    },
    getOrganizationsByUserId,
  );
  fastify.get(
    "/organizations/project/:projectId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.ADMIN, UserRole.USER]),
      ],
    },
    getOrganizationsByProjectId,
  );
}
