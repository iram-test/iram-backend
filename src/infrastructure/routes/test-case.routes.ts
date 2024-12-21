import { FastifyInstance } from "fastify";
import {
  addTestCase,
  getAllTestCases,
  getTestCaseById,
  updateTestCase,
  deleteTestCase,
} from "../controllers/test-case-controller";

export async function testCaseRoutes(fastify: FastifyInstance) {
  fastify.post("/test-cases", addTestCase);
  fastify.get("/test-cases", getAllTestCases);
  fastify.get("/test-cases/:testCaseId", getTestCaseById);
  fastify.put("/test-cases/:testCaseId", updateTestCase);
  fastify.delete("/test-cases/:testCaseId", deleteTestCase);
}
