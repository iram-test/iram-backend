import { FastifyInstance } from "fastify";
import {
  addTestCase,
  getAllTestCases,
  getTestCaseById,
  updateTestCase,
  deleteTestCase,
} from "../controllers/test-case-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserPermission } from "../../domain/entities/enums/user-permission";

export async function testCaseRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/test-cases",
    { preHandler: [authorize(null, [UserPermission.WRITE])] },
    addTestCase,
  );
  fastify.get(
    "/test-cases",
    { preHandler: [authorize(null, [UserPermission.READ])] },
    getAllTestCases,
  );
  fastify.get(
    "/test-cases/:testCaseId",
    { preHandler: [authorize(null, [UserPermission.READ])] },
    getTestCaseById,
  );
  fastify.put(
    "/test-cases/:testCaseId",
    { preHandler: [authorize(null, [UserPermission.WRITE])] },
    updateTestCase,
  );
  fastify.delete(
    "/test-cases/:testCaseId",
    { preHandler: [authorize(null, [UserPermission.DELETE])] },
    deleteTestCase,
  );
}
