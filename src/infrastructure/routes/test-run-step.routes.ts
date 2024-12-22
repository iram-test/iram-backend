import { FastifyInstance } from "fastify";
import {
  addTestRunStep,
  getAllTestRunSteps,
  getTestRunStepById,
  updateTestRunStep,
  deleteTestRunStep,
} from "../controllers/test-run-step-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserPermission } from "../../domain/entities/enums/user-permission";

export async function testRunStepRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/test-run-steps",
    { preHandler: [authorize(null, [UserPermission.WRITE])] },
    addTestRunStep,
  );
  fastify.get(
    "/test-run-steps",
    { preHandler: [authorize(null, [UserPermission.READ])] },
    getAllTestRunSteps,
  );
  fastify.get(
    "/test-run-steps/:testRunStepId",
    { preHandler: [authorize(null, [UserPermission.READ])] },
    getTestRunStepById,
  );
  fastify.put(
    "/test-run-steps/:testRunStepId",
    { preHandler: [authorize(null, [UserPermission.WRITE])] },
    updateTestRunStep,
  );
  fastify.delete(
    "/test-run-steps/:testRunStepId",
    { preHandler: [authorize(null, [UserPermission.DELETE])] },
    deleteTestRunStep,
  );
}
