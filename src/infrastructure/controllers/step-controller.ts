import { FastifyReply, FastifyRequest } from "fastify";
import StepService from "../services/step-service";
import { CreateStepDTO, UpdateStepDTO } from "../../application/dtos/step-dto";
import logger from "../../tools/logger";

export const addStep = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const stepDto = request.body as CreateStepDTO;
    const newStep = await StepService.addStep(stepDto);
    reply.code(201).send(newStep);
  } catch (error) {
    logger.error(`Error creating step: ${error}`);
    reply.code(500).send({ message: "Error creating step" });
  }
};

export const getAllSteps = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const steps = await StepService.getAllSteps();
    reply.code(200).send(steps);
  } catch (error) {
    logger.error(`Error during getting all steps: ${error}`);
    reply.code(500).send({ message: "Error getting steps" });
  }
};

export const getStepById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { stepId } = request.params as { stepId: string };
    const step = await StepService.getStepById(stepId);
    reply.code(200).send(step);
  } catch (error) {
    logger.error(`Error during getting step by ID: ${error}`);
    if (error instanceof Error && error.message === "Step not found") {
      reply.code(404).send({ message: "Step not found" });
    } else {
      reply.code(500).send({ message: "Error getting step" });
    }
  }
};
export const updateStep = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { stepId } = request.params as { stepId: string };
    const stepDto = request.body as UpdateStepDTO;
    const updatedStep = await StepService.updateStep(stepId, stepDto);
    reply.code(200).send(updatedStep);
  } catch (error) {
    logger.error(
      `Error during update step with id ${request.params}: ${error}`,
    );
    if (error instanceof Error && error.message === "Step not found") {
      reply.code(404).send({ message: "Step not found" });
    } else {
      reply.code(500).send({ message: "Error updating step" });
    }
  }
};
export const deleteStep = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { stepId } = request.params as { stepId: string };
    await StepService.deleteStep(stepId);
    reply.code(204).send();
  } catch (error) {
    logger.error(`Error deleting step with id: ${request.params}: ${error}`);
    if (error instanceof Error && error.message === "Step not found") {
      reply.code(404).send({ message: "Step not found" });
    } else {
      reply.code(500).send({ message: "Error deleting step" });
    }
  }
};
