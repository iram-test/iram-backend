import { FastifyInstance } from "fastify";
import {
  addTestCase,
  getAllTestCases,
  getTestCaseById,
  updateTestCase,
  deleteTestCase,
  getTestCasesByProjectId,
  getTestCasesBySectionId,
  getTestCasesByAssignedUserId,
  getTestCasesBySubSectionId,
    getTestCasesByIds,
} from "../controllers/test-case-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";

export async function testCaseRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/projects/:projectId/test-cases",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    addTestCase,
  );
  fastify.get(
    "/test-cases",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    getAllTestCases,
  );
  fastify.get(
    "/test-cases/:testCaseId",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getTestCaseById,
  );
  fastify.put(
    "/test-cases/:testCaseId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    updateTestCase,
  );
  fastify.delete(
    "/test-cases/:testCaseId",
    { preHandler: [authorize([UserRole.MANAGER, UserRole.ADMIN])] },
    deleteTestCase,
  );

  fastify.get(
    "/projects/:projectId/test-cases",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getTestCasesByProjectId,
  );

  fastify.get(
    "/sections/:sectionId/test-cases",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getTestCasesBySectionId,
  );

  fastify.get(
    "/subsections/:subsectionId/test-cases",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getTestCasesBySubSectionId,
  );

  fastify.get(
    "/users/:assignedUserId/test-cases",
    {
      preHandler: [
        authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
      ],
    },
    getTestCasesByAssignedUserId,
  );

    fastify.get(
        "/test-cases/by-ids",
        {
            preHandler: [
                authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
            ],
        },
        getTestCasesByIds
    );
}
