import { FastifyInstance } from "fastify";
import {
  addStep,
  getStepById,
  updateStep,
  deleteStep,
  getStepsByTestCaseId,
  uploadImage,
  uploadExpectedImage,
  deleteImage,
  deleteExpectedImage
} from "../controllers/step-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";

export async function stepRoutes(fastify: FastifyInstance) {
  const roles = [UserRole.MANAGER, UserRole.USER, UserRole.ADMIN];
  fastify.post(
      "/test-cases/:testCaseId/steps",
      {
        preHandler: [authorize(roles)],
      },
      addStep,
  );

  fastify.post(
      "/test-cases/:testCaseId/steps/:stepId/upload-image",
      {
        preHandler: [authorize(roles)],
      },
      uploadImage,
  );

  fastify.post(
      "/test-cases/:testCaseId/steps/:stepId/upload-expected-image",
      {
        preHandler: [authorize(roles)],
      },
      uploadExpectedImage,
  );

  fastify.delete(
      "/steps/:stepId/image",
      {
        preHandler: [authorize(roles)],
      },
      deleteImage,
  );

  fastify.delete(
      "/steps/:stepId/expected-image",
      {
        preHandler: [authorize(roles)],
      },
      deleteExpectedImage,
  );

  fastify.get(
      "/test-cases/:testCaseId/steps",
      {
        preHandler: [authorize(roles)],
      },
      getStepsByTestCaseId,
  );

  fastify.get(
      "/steps/:stepId",
      {
        preHandler: [authorize(roles)],
      },
      getStepById,
  );

  fastify.put(
      "/steps/:stepId",
      {
        preHandler: [authorize(roles)],
      },
      updateStep,
  );

  fastify.delete(
      "/steps/:stepId",
      {
        preHandler: [authorize(roles)],
      },
      deleteStep,
  );
}