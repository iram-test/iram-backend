import { FastifyInstance } from "fastify";
import {
  addTestReport,
  getAllTestReports,
  getTestReportById,
  updateTestReport,
  deleteTestReport,
} from "../controllers/test-report-controller";

export async function testReportRoutes(fastify: FastifyInstance) {
  fastify.post("/test-reports", addTestReport);
  fastify.get("/test-reports", getAllTestReports);
  fastify.get("/test-reports/:testReportId", getTestReportById);
  fastify.put("/test-reports/:testReportId", updateTestReport);
  fastify.delete("/test-reports/:testReportId", deleteTestReport);
}
