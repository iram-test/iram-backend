import { FastifyInstance } from "fastify";
import {
  addTestRunStep,
  getAllTestRunSteps,
  getTestRunStepById,
  updateTestRunStep,
  deleteTestRunStep,
} from "../controllers/test-run-step-controller";
import { authorize } from "../middlewares/authorization-middleware";

export async function testRunStepRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/test-run-steps",
    { preHandler: [authorize()] },
    addTestRunStep,
  );
  fastify.get(
    "/test-run-steps",
    { preHandler: [authorize()] },
    getAllTestRunSteps,
  );
  fastify.get(
    "/test-run-steps/:testRunStepId",
    { preHandler: [authorize()] },
    getTestRunStepById,
  );
  fastify.put(
    "/test-run-steps/:testRunStepId",
    { preHandler: [authorize()] },
    updateTestRunStep,
  );
  fastify.delete(
    "/test-run-steps/:testRunStepId",
    { preHandler: [authorize()] },
    deleteTestRunStep,
  );
}
