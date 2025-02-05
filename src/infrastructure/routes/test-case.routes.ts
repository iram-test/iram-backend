import { FastifyInstance } from "fastify";
import {
  addTestCase,
  getAllTestCases,
  getTestCaseById,
  updateTestCase,
  deleteTestCase,
} from "../controllers/test-case-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";

export async function testCaseRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/test-cases",
    { preHandler: [authorize([UserRole.MANAGER])] },
    addTestCase,
  );
  fastify.get(
    "/test-cases",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    getAllTestCases,
  );
  fastify.get(
    "/test-cases/:testCaseId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    getTestCaseById,
  );
  fastify.put(
    "/test-cases/:testCaseId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.USER])] },
    updateTestCase,
  );
  fastify.delete(
    "/test-cases/:testCaseId",
    { preHandler: [authorize([UserRole.MANAGER])] },
    deleteTestCase,
  );
}
