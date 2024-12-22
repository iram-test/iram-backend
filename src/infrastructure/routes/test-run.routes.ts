import { FastifyInstance } from "fastify";
import {
  addTestRun,
  getAllTestRuns,
  getTestRunById,
  updateTestRun,
  deleteTestRun,
} from "../controllers/test-run-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserPermission } from "../../domain/entities/enums/user-permission";

export async function testRunRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/test-runs",
    { preHandler: [authorize(null, [UserPermission.WRITE])] },
    addTestRun,
  );
  fastify.get(
    "/test-runs",
    { preHandler: [authorize(null, [UserPermission.READ])] },
    getAllTestRuns,
  );
  fastify.get(
    "/test-runs/:testRunId",
    { preHandler: [authorize(null, [UserPermission.READ])] },
    getTestRunById,
  );
  fastify.put(
    "/test-runs/:testRunId",
    { preHandler: [authorize(null, [UserPermission.WRITE])] },
    updateTestRun,
  );
  fastify.delete(
    "/test-runs/:testRunId",
    { preHandler: [authorize(null, [UserPermission.DELETE])] },
    deleteTestRun,
  );
}
