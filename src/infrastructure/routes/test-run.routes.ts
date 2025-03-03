import { FastifyInstance } from "fastify";
import {
  addTestRun,
  getAllTestRuns,
  getTestRunById,
  updateTestRun,
  deleteTestRun,
  getTestRunsByProjectId,
} from "../controllers/test-run-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";
import {
  getTestRunsByTestReportId,
  getTestRunsByUserId,
} from "../controllers/test-run-controller";

export async function testRunRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/projects/:projectId/test-runs",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    addTestRun,
  );
  fastify.get(
    "/test-runs",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    getAllTestRuns,
  );
  fastify.get(
    "/test-runs/:testRunId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    getTestRunById,
  );
  fastify.put(
    "/test-runs/:testRunId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    updateTestRun,
  );
  fastify.delete(
    "/test-runs/:testRunId",
    { preHandler: [authorize([UserRole.MANAGER])] },
    deleteTestRun,
  );

  fastify.get(
    "/projects/:projectId/test-runs",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    getTestRunsByProjectId,
  );

  fastify.get(
    "/users/:userId/test-runs",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    getTestRunsByUserId,
  );

  fastify.get(
    "/test-reports/:testReportId/test-runs",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    getTestRunsByTestReportId,
  );
}
