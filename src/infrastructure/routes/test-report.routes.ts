import { FastifyInstance } from "fastify";
import {
  addTestReport,
  getAllTestReports,
  getTestReportById,
  updateTestReport,
  deleteTestReport,
} from "../controllers/test-report-controller";
import { authorize } from "../middlewares/authorization-middleware";

export async function testReportRoutes(fastify: FastifyInstance) {
  fastify.post("/test-reports", { preHandler: [authorize()] }, addTestReport);
  fastify.get(
    "/test-reports",
    { preHandler: [authorize()] },
    getAllTestReports,
  );
  fastify.get(
    "/test-reports/:testReportId",
    { preHandler: [authorize()] },
    getTestReportById,
  );
  fastify.put(
    "/test-reports/:testReportId",
    { preHandler: [authorize()] },
    updateTestReport,
  );
  fastify.delete(
    "/test-reports/:testReportId",
    { preHandler: [authorize()] },
    deleteTestReport,
  );
}
