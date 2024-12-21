import { FastifyReply, FastifyRequest } from "fastify";
import TestRunStepService from "../services/test-run-step-service";
import {
  CreateTestRunStepDTO,
  UpdateTestRunStepDTO,
} from "../../application/dtos/test-run-step-dto";
import logger from "../../tools/logger";

export const addTestRunStep = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const testRunStepDto = request.body as CreateTestRunStepDTO;
    const newTestRunStep =
      await TestRunStepService.addTestRunStep(testRunStepDto);
    reply.code(201).send(newTestRunStep);
  } catch (error) {
    logger.error(`Error creating test run step: ${error}`);
    reply.code(500).send({ message: "Error creating test run step" });
  }
};

export const getAllTestRunSteps = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const testRunSteps = await TestRunStepService.getAllTestRunSteps();
    reply.code(200).send(testRunSteps);
  } catch (error) {
    logger.error(`Error during getting all test run steps: ${error}`);
    reply.code(500).send({ message: "Error getting test run steps" });
  }
};
export const getTestRunStepById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testRunStepId } = request.params as { testRunStepId: string };
    const testRunStep =
      await TestRunStepService.getTestRunStepById(testRunStepId);
    reply.code(200).send(testRunStep);
  } catch (error) {
    logger.error(`Error getting test run step by ID: ${error}`);
    if (error instanceof Error && error.message === "Test run step not found") {
      reply.code(404).send({ message: "Test run step not found" });
    } else {
      reply.code(500).send({ message: "Error getting test run step" });
    }
  }
};
export const updateTestRunStep = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testRunStepId } = request.params as { testRunStepId: string };
    const testRunStepDto = request.body as UpdateTestRunStepDTO;
    const updatedTestRunStep = await TestRunStepService.updateTestRunStep(
      testRunStepId,
      testRunStepDto,
    );
    reply.code(200).send(updatedTestRunStep);
  } catch (error) {
    logger.error(
      `Error during update test run step ${request.params}: ${error}`,
    );
    if (error instanceof Error && error.message === "Test run step not found") {
      reply.code(404).send({ message: "Test run step not found" });
    } else {
      reply.code(500).send({ message: "Error updating test run step" });
    }
  }
};

export const deleteTestRunStep = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testRunStepId } = request.params as { testRunStepId: string };
    await TestRunStepService.deleteTestRunStep(testRunStepId);
    reply.code(204).send();
  } catch (error) {
    logger.error(
      `Error during delete test run step with id: ${request.params}: ${error}`,
    );
    if (error instanceof Error && error.message === "Test run step not found") {
      reply.code(404).send({ message: "Test run step not found" });
    } else {
      reply.code(500).send({ message: "Error deleting test run step" });
    }
  }
};
