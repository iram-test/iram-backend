import { FastifyInstance } from "fastify";
import {
  addMilestone,
  getAllMilestones,
  getMilestoneById,
  updateMilestone,
  deleteMilestone,
} from "../controllers/milestone-controller";

export async function milestoneRoutes(fastify: FastifyInstance) {
  fastify.post("/milestones", addMilestone);
  fastify.get("/milestones", getAllMilestones);
  fastify.get("/milestones/:milestoneID", getMilestoneById);
  fastify.put("/milestones/:milestoneID", updateMilestone);
  fastify.delete("/milestones/:milestoneID", deleteMilestone);
}
