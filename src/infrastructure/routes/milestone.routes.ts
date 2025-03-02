import { FastifyInstance } from "fastify";
import {
  addMilestone,
  getAllMilestones,
  getMilestoneById,
  updateMilestone,
  deleteMilestone,
  getMilestonesByProjectId,
} from "../controllers/milestone-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";

export async function milestoneRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/projects/:projectId/milestones",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    addMilestone,
  );

  fastify.get(
    "/milestones",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.ADMIN, UserRole.USER]),
      ],
    },
    getAllMilestones,
  );

  fastify.get(
    "/milestones/:milestoneId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.ADMIN, UserRole.USER]),
      ],
    },
    getMilestoneById,
  );

  fastify.put(
    "/milestones/:milestoneId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    updateMilestone,
  );

  fastify.delete(
    "/milestones/:milestoneId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    deleteMilestone,
  );
  fastify.get(
    "/projects/:projectId/milestones",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getMilestonesByProjectId,
  );
}
