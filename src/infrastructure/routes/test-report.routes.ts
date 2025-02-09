import { FastifyInstance } from "fastify";
import {
  addTestReport,
  getAllTestReports,
  getTestReportById,
  updateTestReport,
  deleteTestReport,
  getTestReportsByAssignedUserId,
  getTestReportByName,
  getTestReportsByProjectId,
  getTestReportsByUserId,
} from "../controllers/test-report-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";

export async function testReportRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/test-reports",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    addTestReport,
  );
  fastify.get(
    "/test-reports",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getAllTestReports,
  );
  fastify.get(
    "/test-reports/:testReportId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getTestReportById,
  );
  fastify.put(
    "/test-reports/:testReportId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    updateTestReport,
  );
  fastify.delete(
    "/test-reports/:testReportId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    deleteTestReport,
  );

  fastify.get(
    "/users/:assignedUserId/test-reports",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getTestReportsByAssignedUserId,
  );

  fastify.get(
    "/test-reports/name/:reportName",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getTestReportByName,
  );

  fastify.get(
    "/projects/:projectId/test-reports",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getTestReportsByProjectId,
  );

  fastify.get(
    "/users/:userId/test-reports",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getTestReportsByUserId,
  );
}
