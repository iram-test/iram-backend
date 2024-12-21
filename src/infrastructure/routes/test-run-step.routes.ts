import { FastifyInstance } from "fastify";
import {
  addTestRunStep,
  getAllTestRunSteps,
  getTestRunStepById,
  updateTestRunStep,
  deleteTestRunStep,
} from "../controllers/test-run-step-controller";

export async function testRunStepRoutes(fastify: FastifyInstance) {
  fastify.post("/test-run-steps", addTestRunStep);
  fastify.get("/test-run-steps", getAllTestRunSteps);
  fastify.get("/test-run-steps/:testRunStepId", getTestRunStepById);
  fastify.put("/test-run-steps/:testRunStepId", updateTestRunStep);
  fastify.delete("/test-run-steps/:testRunStepId", deleteTestRunStep);
}
