import { FastifyInstance } from "fastify";
import {
  addTestRun,
  getAllTestRuns,
  getTestRunById,
  updateTestRun,
  deleteTestRun,
} from "../controllers/test-run-controller";

export async function testRunRoutes(fastify: FastifyInstance) {
  fastify.post("/test-runs", addTestRun);
  fastify.get("/test-runs", getAllTestRuns);
  fastify.get("/test-runs/:testRunId", getTestRunById);
  fastify.put("/test-runs/:testRunId", updateTestRun);
  fastify.delete("/test-runs/:testRunId", deleteTestRun);
}
