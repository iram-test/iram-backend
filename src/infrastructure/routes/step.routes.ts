import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import {
    addStep,
    getStepById,
    updateStep,
    deleteStep,
    getStepsByTestCaseId, uploadImage,
} from "../controllers/step-controller";
import { authorize } from "../middlewares/authorization-middleware";
import { UserRole } from "../../domain/entities/enums/user-role";

export async function stepRoutes(fastify: FastifyInstance) {
    fastify.post(
        "/test-cases/:testCaseId/steps",
        {
            preHandler: [
                authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
            ],
        },
        addStep
    );

    fastify.post(
        "/test-cases/:testCaseId/steps/:stepId/upload-image",
        {
            preHandler: [
                authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
            ],
        },
        uploadImage
    );

    fastify.get(
        "/test-cases/:testCaseId/steps",
        {
            preHandler: [
                authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
            ],
        },
        getStepsByTestCaseId,
    );

    fastify.get(
        "/steps/:stepId",
        {
            preHandler: [
                authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
            ],
        },
        getStepById,
    );

    fastify.put(
        "/steps/:stepId",
        {
            preHandler: [
                authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
            ],
        },
        updateStep,
    );

    fastify.delete(
        "/steps/:stepId",
        {
            preHandler: [
                authorize([UserRole.MANAGER, UserRole.USER, UserRole.ADMIN]),
            ],
        },
        deleteStep,
    );
}