import { FastifyReply, FastifyRequest } from "fastify";
import TestRunService from "../services/test-run-service";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../application/dtos/test-run-dto";
import logger from "../../tools/logger";

export const addTestRun = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const testRunDto = request.body as CreateTestRunDTO;
    const newTestRun = await TestRunService.addTestRun(testRunDto);
    reply.code(201).send(newTestRun);
  } catch (error) {
    logger.error(`Error during creating test run: ${error}`);
    reply.code(500).send({ message: "Error creating test run" });
  }
};

export const getAllTestRuns = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const testRuns = await TestRunService.getAllTestRuns();
    reply.code(200).send(testRuns);
  } catch (error) {
    logger.error(`Error during getting all test runs: ${error}`);
    reply.code(500).send({ message: "Error getting test runs" });
  }
};

export const getTestRunById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testRunId } = request.params as { testRunId: string };
    const testRun = await TestRunService.getTestRunById(testRunId);
    reply.code(200).send(testRun);
  } catch (error) {
    logger.error(`Error during getting test run by id: ${error}`);
    if (error instanceof Error && error.message === "Test run not found") {
      reply.code(404).send({ message: "Test run not found" });
    } else {
      reply.code(500).send({ message: "Error getting test run" });
    }
  }
};

export const updateTestRun = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testRunId } = request.params as { testRunId: string };
    const testRunDto = request.body as UpdateTestRunDTO;
    const updatedTestRun = await TestRunService.updateTestRun(
      testRunId,
      testRunDto,
    );
    reply.code(200).send(updatedTestRun);
  } catch (error) {
    logger.error(
      `Error during updating test run with id: ${request.params}: ${error}`,
    );
    if (error instanceof Error && error.message === "Test run not found") {
      reply.code(404).send({ message: "Test run not found" });
    } else {
      reply.code(500).send({ message: "Error updating test run" });
    }
  }
};

export const deleteTestRun = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testRunId } = request.params as { testRunId: string };
    await TestRunService.deleteTestRun(testRunId);
    reply.code(204).send();
  } catch (error) {
    logger.error(`Error deleting test run with id ${request.params}: ${error}`);
    if (error instanceof Error && error.message === "Test run not found") {
      reply.code(404).send({ message: "Test run not found" });
    } else {
      reply.code(500).send({ message: "Error deleting test run" });
    }
  }
};
