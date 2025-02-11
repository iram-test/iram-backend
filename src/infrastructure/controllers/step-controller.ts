import { FastifyReply, FastifyRequest } from "fastify";
import StepService from "../services/step-service";
import { CreateStepDTO, UpdateStepDTO } from "../../application/dtos/step-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

export const addStep = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { testCaseId } = request.params as { testCaseId: string };
    const stepDto = request.body as CreateStepDTO;
    const newStep = await StepService.addStep(testCaseId, stepDto);
    reply.status(201).send(newStep);
  } catch (error) {
    logger.error(`Error creating step: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error creating step" });
    }
  }
};

export const getStepById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { stepId } = request.params as { stepId: string };
    const step = await StepService.getById(stepId);
    reply.status(200).send(step);
  } catch (error) {
    logger.error(`Error during getting step by ID: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting step" });
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
    const updatedStep = await StepService.update(stepId, stepDto);
    reply.status(200).send(updatedStep);
  } catch (error) {
    logger.error(
      `Error during update step with id ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error updating step" });
    }
  }
};

export const deleteStep = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { stepId } = request.params as { stepId: string };
    await StepService.delete(stepId);
    reply.status(204).send();
  } catch (error) {
    logger.error(`Error deleting step with id: ${request.params}: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error deleting step" });
    }
  }
};

export const getStepsByTestCaseId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testCaseId } = request.params as { testCaseId: string };
    const steps = await StepService.getStepsByTestCaseId(testCaseId);
    reply.status(200).send(steps);
  } catch (error) {
    logger.error(`Error getting steps by testCaseId: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting steps by testCaseId" });
    }
  }
};
