import { FastifyInstance } from "fastify";
import {
  addStep,
  getAllSteps,
  getStepById,
  updateStep,
  deleteStep,
} from "../controllers/step-controller";
import { authorize } from "../middlewares/authorization-middleware";

export async function stepRoutes(fastify: FastifyInstance) {
  fastify.post("/steps", { preHandler: [authorize()] }, addStep);
  fastify.get("/steps", { preHandler: [authorize()] }, getAllSteps);
  fastify.get("/steps/:stepId", { preHandler: [authorize()] }, getStepById);
  fastify.put("/steps/:stepId", { preHandler: [authorize()] }, updateStep);
  fastify.delete("/steps/:stepId", { preHandler: [authorize()] }, deleteStep);
}
