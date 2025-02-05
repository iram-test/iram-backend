import { FastifyInstance } from "fastify";
import {
  addMilestone,
  getAllMilestones,
  getMilestoneById,
  updateMilestone,
  deleteMilestone,
} from "../controllers/milestone-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";

export async function milestoneRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/milestones",
    { preHandler: [authorize([UserRole.MANAGER])] },
    addMilestone,
  );
  fastify.get(
    "/milestones",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    getAllMilestones,
  );
  fastify.get(
    "/milestones/:milestoneID",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    getMilestoneById,
  );
  fastify.put(
    "/milestones/:milestoneID",
    { preHandler: [authorize([UserRole.MANAGER])] },
    updateMilestone,
  );
  fastify.delete(
    "/milestones/:milestoneID",
    { preHandler: [authorize([UserRole.MANAGER])] },
    deleteMilestone,
  );
}
