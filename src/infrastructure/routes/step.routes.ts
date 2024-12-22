import { FastifyInstance } from "fastify";
import {
  addStep,
  getAllSteps,
  getStepById,
  updateStep,
  deleteStep,
} from "../controllers/step-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserPermission } from "../../domain/entities/enums/user-permission";

export async function stepRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/steps",
    { preHandler: [authorize(null, [UserPermission.WRITE])] },
    addStep,
  );
  fastify.get(
    "/steps",
    { preHandler: [authorize(null, [UserPermission.READ])] },
    getAllSteps,
  );
  fastify.get(
    "/steps/:stepId",
    { preHandler: [authorize(null, [UserPermission.READ])] },
    getStepById,
  );
  fastify.put(
    "/steps/:stepId",
    { preHandler: [authorize(null, [UserPermission.WRITE])] },
    updateStep,
  );
  fastify.delete(
    "/steps/:stepId",
    { preHandler: [authorize(null, [UserPermission.DELETE])] },
    deleteStep,
  );
}
