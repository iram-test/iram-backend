import { FastifyInstance } from "fastify";
import {
  addTestReport,
  getAllTestReports,
  getTestReportById,
  updateTestReport,
  deleteTestReport,
} from "../controllers/test-report-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserPermission } from "../../domain/entities/enums/user-permission";

export async function testReportRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/test-reports",
    { preHandler: [authorize(null, [UserPermission.WRITE])] },
    addTestReport,
  );
  fastify.get(
    "/test-reports",
    { preHandler: [authorize(null, [UserPermission.READ])] },
    getAllTestReports,
  );
  fastify.get(
    "/test-reports/:testReportId",
    { preHandler: [authorize(null, [UserPermission.READ])] },
    getTestReportById,
  );
  fastify.put(
    "/test-reports/:testReportId",
    { preHandler: [authorize(null, [UserPermission.WRITE])] },
    updateTestReport,
  );
  fastify.delete(
    "/test-reports/:testReportId",
    { preHandler: [authorize(null, [UserPermission.DELETE])] },
    deleteTestReport,
  );
}
