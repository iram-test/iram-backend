import { FastifyInstance } from "fastify";
import {
  addStep,
  getAllSteps,
  getStepById,
  updateStep,
  deleteStep,
} from "../controllers/step-controller";

export async function stepRoutes(fastify: FastifyInstance) {
  fastify.post("/steps", addStep);
  fastify.get("/steps", getAllSteps);
  fastify.get("/steps/:stepId", getStepById);
  fastify.put("/steps/:stepId", updateStep);
  fastify.delete("/steps/:stepId", deleteStep);
}
