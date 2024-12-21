import { FastifyReply, FastifyRequest } from "fastify";
import TestCaseService from "../services/test-case-service";
import {
  CreateTestCaseDTO,
  UpdateTestCaseDTO,
} from "../../application/dtos/test-case-dto";
import logger from "../../tools/logger";

export const addTestCase = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const testCaseDto = request.body as CreateTestCaseDTO;
    const newTestCase = await TestCaseService.addTestCase(testCaseDto);
    reply.code(201).send(newTestCase);
  } catch (error) {
    logger.error(`Error creating test case: ${error}`);
    reply.code(500).send({ message: "Error creating test case" });
  }
};

export const getAllTestCases = async (
  _: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const testCases = await TestCaseService.getAllTestCases();
    reply.code(200).send(testCases);
  } catch (error) {
    logger.error(`Error during getting all test cases: ${error}`);
    reply.code(500).send({ message: "Error getting test cases" });
  }
};

export const getTestCaseById = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testCaseId } = request.params as { testCaseId: string };
    const testCase = await TestCaseService.getTestCaseById(testCaseId);
    reply.code(200).send(testCase);
  } catch (error) {
    logger.error(`Error getting test case by id: ${error}`);
    if (error instanceof Error && error.message === "Test case not found") {
      reply.code(404).send({ message: "Test case not found" });
    } else {
      reply.code(500).send({ message: "Error getting test case" });
    }
  }
};

export const updateTestCase = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testCaseId } = request.params as { testCaseId: string };
    const testCaseDto = request.body as UpdateTestCaseDTO;
    const updatedTestCase = await TestCaseService.updateTestCase(
      testCaseId,
      testCaseDto,
    );
    reply.code(200).send(updatedTestCase);
  } catch (error) {
    logger.error(
      `Error during updating test case with id: ${request.params}: ${error}`,
    );
    if (error instanceof Error && error.message === "Test case not found") {
      reply.code(404).send({ message: "Test case not found" });
    } else {
      reply.code(500).send({ message: "Error updating test case" });
    }
  }
};

export const deleteTestCase = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { testCaseId } = request.params as { testCaseId: string };
    await TestCaseService.deleteTestCase(testCaseId);
    reply.code(204).send();
  } catch (error) {
    logger.error(
      `Error deleting test case with id: ${request.params}: ${error}`,
    );
    if (error instanceof Error && error.message === "Test case not found") {
      reply.code(404).send({ message: "Test case not found" });
    } else {
      reply.code(500).send({ message: "Error deleting test case" });
    }
  }
};
