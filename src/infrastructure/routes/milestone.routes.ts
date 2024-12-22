import { FastifyInstance } from "fastify";
import {
  addMilestone,
  getAllMilestones,
  getMilestoneById,
  updateMilestone,
  deleteMilestone,
} from "../controllers/milestone-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserPermission } from "../../domain/entities/enums/user-permission";

export async function milestoneRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/milestones",
    { preHandler: [authorize(null, [UserPermission.WRITE])] },
    addMilestone,
  );
  fastify.get(
    "/milestones",
    { preHandler: [authorize(null, [UserPermission.READ])] },
    getAllMilestones,
  );
  fastify.get(
    "/milestones/:milestoneID",
    { preHandler: [authorize(null, [UserPermission.READ])] },
    getMilestoneById,
  );
  fastify.put(
    "/milestones/:milestoneID",
    { preHandler: [authorize(null, [UserPermission.WRITE])] },
    updateMilestone,
  );
  fastify.delete(
    "/milestones/:milestoneID",
    { preHandler: [authorize(null, [UserPermission.DELETE])] },
    deleteMilestone,
  );
}
