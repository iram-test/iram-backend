import { FastifyReply, FastifyRequest } from "fastify";
import TestRunService from "../services/test-run-service";
import {
  CreateTestRunDTO,
  UpdateTestRunDTO,
} from "../../application/dtos/test-run-dto";
import logger from "../../tools/logger";
import { CustomError } from "../../tools/custom-error";

export const addTestRun = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const testRunDto = request.body as CreateTestRunDTO;
    const newTestRun = await TestRunService.addTestRun(projectId, testRunDto);
    reply.status(201).send(newTestRun);
  } catch (error) {
    logger.error(`Error creating test run: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error creating test run" });
    }
  }
};

export const getAllTestRuns = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const testRuns = await TestRunService.getAll();
    reply.status(200).send(testRuns);
  } catch (error) {
    logger.error(`Error getting all test runs: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test runs" });
    }
  }
};

export const getTestRunById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testRunId } = request.params as { testRunId: string };
    const testRun = await TestRunService.getById(testRunId);
    reply.status(200).send(testRun);
  } catch (error) {
    logger.error(`Error getting test run by id: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test run" });
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
    const updatedTestRun = await TestRunService.update(testRunId, testRunDto);
    reply.status(200).send(updatedTestRun);
  } catch (error) {
    logger.error(
      `Error updating test run with id: ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error updating test run" });
    }
  }
};

export const deleteTestRun = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testRunId } = request.params as { testRunId: string };
    await TestRunService.delete(testRunId);
    reply.status(204).send();
  } catch (error) {
    logger.error(`Error deleting test run with id ${request.params}: ${error}`);
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error deleting test run" });
    }
  }
};

export const getTestRunsByProjectId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { projectId } = request.params as { projectId: string };
    const testRuns = await TestRunService.getTestRunByProjectId(projectId);
    reply.status(200).send(testRuns);
  } catch (error) {
    logger.error(
      `Error getting TestRuns by project id: ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test runs" });
    }
  }
};

export const getTestRunsByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { userId } = request.params as { userId: string };
    const testRuns = await TestRunService.getTestRunByUserId(userId);
    reply.status(200).send(testRuns);
  } catch (error) {
    logger.error(
      `Error getting TestRuns by user id: ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test runs" });
    }
  }
};

export const getTestRunsByTestReportId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testReportId } = request.params as { testReportId: string };
    const testRuns =
      await TestRunService.getTestRunByTestReportId(testReportId);
    reply.status(200).send(testRuns);
  } catch (error) {
    logger.error(
      `Error getting TestRuns by test report id: ${request.params}: ${error}`,
    );
    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({ message: error.message });
    } else {
      reply.status(500).send({ message: "Error getting test runs" });
    }
  }
};
